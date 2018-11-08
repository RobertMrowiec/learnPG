import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Project} from './Project'
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    surname: string;

    @ManyToMany(type => Project, project => project.users)
    projects: Project[]
}
