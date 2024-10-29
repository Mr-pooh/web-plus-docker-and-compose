import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
    ValueTransformer,
} from 'typeorm';
import { IsString, IsUrl, Length, IsInt, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

export class DecimalColumnTransformer implements ValueTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string): number {
        return parseFloat(data);
    }
}

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({
        length: 250,
    })
    @IsString()
    name: string;

    @Column()
    @IsString()
    @IsUrl()
    link: string;

    @Column()
    @IsString()
    @IsUrl()
    image: string;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        transformer: new DecimalColumnTransformer(),
    })
    @IsNumber()
    price: number;

    @Column('decimal', {
        default: 0,
        precision: 10,
        scale: 2,
        nullable: true,
        transformer: new DecimalColumnTransformer(),
    })
    @IsNumber()
    raised?: number;

    @ManyToOne(() => User, (user) => user.wishes, { onDelete: 'CASCADE' })
    owner: User;

    @Column()
    @Length(1, 1024)
    description: string;

    @OneToMany(() => Offer, (offer) => offer.item)
    offers: Offer[];

    @Column({ default: 0 })
    @IsInt()
    copied: number;
}
