import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Project} from './Project'

const settlementEnum = ['B2B', 'UoP']
type settlementMethod = 'B2B' | 'UoP'

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

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true, type: 'enum', enum: settlementEnum })
    settlementMethod: settlementMethod

    @Column({ nullable: true, type: 'numeric', precision: 10, scale: 2})
    salaryNetto: string

    @Column({ nullable: true, type: 'numeric', precision: 10, scale: 2})
    salaryBrutto: string

    @ManyToMany(type => Project, project => project.users)
    projects: Project[]
}
