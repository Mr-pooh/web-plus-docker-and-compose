import { IsUrl, Length, MaxLength } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(1, 250)
    name: string;

    @Column({
        default: '',
    })
    @MaxLength(1500)
    description: string;

    @Column()
    @IsUrl()
    image: string;

    @ManyToMany(() => Wish)
    @JoinTable()
    items: Wish[];

    @ManyToOne(() => User, (user) => user.wishlists)
    owner: User;
}
