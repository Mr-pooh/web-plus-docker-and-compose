/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from '../utils/guards/jwt.guard';
import { AuthUser } from '../utils/decorator/user.decorator';
import { User } from '../users/entities/user.entity';
import { PasswordInterceptor } from '../utils/interceptor/password.interceptor';

@UseInterceptors(PasswordInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) {}

    @Post()
    create(@Body() createOfferDto: CreateOfferDto, @AuthUser() user: User) {
        return this.offersService.create(createOfferDto, user);
    }

    @Get()
    findAll() {
        return this.offersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.offersService.findOne(id);
    }
}
