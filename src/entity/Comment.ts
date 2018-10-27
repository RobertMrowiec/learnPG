import { Lesson } from './Lesson';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date

    @Column()
    description: string;

    @Column()
    userId: string;

    @ManyToOne(type => User, user => user.comments)
    user: User[]

    @ManyToOne(type => Lesson, lesson => lesson.comments)
    lesson: Lesson
}
