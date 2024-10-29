/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { AuthUser } from '../utils/decorator/user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../utils/guards/local.guard';
import { ValidationExceptionFilter } from '../utils/filters/validation.filter';
import { User } from 'src/users/entities/user.entity';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}
    @Post('signin')
    @UseGuards(LocalAuthGuard)
    signIn(@AuthUser() user: User) {
        return this.authService.signin(user);
    }

    @Post('signup')
    @UseFilters(ValidationExceptionFilter)
    signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
