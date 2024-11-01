/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OffersController } from './offers.controller';
import { WishesService } from 'src/wishes/wishes.service';
import { OffersService } from './offers.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Offer, Wish])],
    controllers: [OffersController],
    providers: [OffersService, WishesService],
})
export class OffersModule {}
