/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../utils/hash/hash.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly hashService: HashService,
    ) {}
    async validatePassword(username: string, password: string) {
        try {
            const user = await this.usersService.findOne({
                select: { username: true, password: true, id: true },
                where: { username },
            });

            if (
                user &&
                (await this.hashService.verifyHash(password, user.password))
            ) {
                const { ...result } = user;

                return result;
            }
            return null;
        } catch (err) {
            throw new BadRequestException({
                message: 'Пользователя с таким именем не существует',
            });
        }
    }
    async signin(user: User) {
        const payload = { username: user.username, sub: user.id };

        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }
}
