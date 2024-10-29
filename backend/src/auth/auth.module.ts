/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HashModule } from '../utils/hash/hash.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategi/local.strategy';
import { JwtStrategy } from './strategi/jwt.strategy';
import { JwtConfigFactory } from '../utils/config/configurate';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        HashModule,
        JwtModule.registerAsync({
            useClass: JwtConfigFactory,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtConfigFactory, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
