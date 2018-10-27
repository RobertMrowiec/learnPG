import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date

    @Column()
    description: string;

    @Column()
    userId: string;

    @OneToMany(type => Comment, comment => comment.lesson)
    comments: Comment[]

}
