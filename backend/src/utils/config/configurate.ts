import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

export default () => ({
    server: { port: parseInt(process.env.PORT, 10) || 3000 },
    database: {
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.POSTGRES_HOST || 'db',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'student',
        password: process.env.POSTGRES_PASSWORD || 'student',
        database: process.env.POSTGRES_DB || 'kupipodariday',
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || true,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'super-strong-secret',
        exp: process.env.JWT_TTL || '30000s',
    },
});

@Injectable()
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get<any>('database.type'),
            host: this.configService.get<string>('database.host'),
            port: this.configService.get<number>('database.port'),
            username: this.configService.get<string>('database.username'),
            password: this.configService.get<string>('database.password'),
            database: this.configService.get<string>('database.database'),
            entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
            synchronize: true,
        };
    }
}

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
    constructor(private configService: ConfigService) {}

    createJwtOptions() {
        return { secret: this.configService.get<string>('jwt.secret') };
    }
}
