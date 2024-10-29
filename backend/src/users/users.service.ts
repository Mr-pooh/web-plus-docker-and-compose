/*
https://docs.nestjs.com/providers#services
*/
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    FindOneOptions,
    FindOptionsWhere,
    Like,
    Not,
    Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HashService } from 'src/utils/hash/hash.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password } = createUserDto;

        const exists = await this.userRepository.exists({
            where: [{ username }, { email }],
        });
        if (exists) {
            throw new ConflictException(
                'Пользователь с таким email или username уже зарегистрирован',
            );
        }
        const hashedPassword = await this.hashService.getHash(password);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return await this.userRepository.save(user);
    }

    findOne(query: FindOneOptions<User>) {
        return this.userRepository.findOne(query);
    }

    findMany(query: FindUserDto) {
        return (
            this.userRepository.find({
                where: [
                    { username: Like(`%${query.query}%`) },
                    { email: Like(`%${query.query}%`) },
                ],
            }) || []
        );
    }

    async findById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { password, username, email } = updateUserDto;
        if (email || username) {
            const existingUser = await this.userRepository.findOne({
                where: [
                    { email, id: Not(id) },
                    { username, id: Not(id) },
                ],
            });
            if (existingUser) {
                throw new ConflictException(
                    'Пользователь с таким email или username уже зарегистрирован',
                );
            }
        }
        if (password) {
            updateUserDto.password = await this.hashService.getHash(password);
        }
        await this.userRepository.update(id, updateUserDto);
        return await this.findById(id);
    }

    async findOwnWishes(id: number) {
        const userWishes = await this.userRepository.findOne({
            where: { id },
            relations: [
                'wishes',
                'wishes.owner',
                'wishes.offers',
                'wishes.offers.user',
            ],
        });
        return userWishes.wishes || [];
    }

    async findWishes(username: string) {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: [
                'wishes',
                'wishes.offers',
                'wishes.offers.item',
                'wishes.offers.user',
                'wishes.offers.item.owner',
            ],
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.wishes || [];
    }
}
