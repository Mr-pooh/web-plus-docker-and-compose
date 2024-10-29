import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configurate, { DatabaseConfigFactory } from './utils/config/configurate';
import { OffersModule } from './offers/offers.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { HashModule } from './utils/hash/hash.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configurate] }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigFactory,
        }),
        UsersModule,
        AuthModule,
        WishesModule,
        OffersModule,
        WishlistsModule,
        HashModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
