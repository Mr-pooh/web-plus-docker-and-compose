/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Wish])],
    controllers: [WishesController],
    providers: [WishesService],
    exports: [WishesService],
})
export class WishesModule {}
