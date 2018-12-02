import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {User} from './User'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true} )
    description: string;

    @Column({ nullable: true, type: "numeric", precision: 10, scale: 2 })
    priceNetto: string;

    @Column({ nullable: true, type: "numeric", precision: 10, scale: 2 })
    priceBrutto: string;

    @Column({ default: 'http://inteligenciamm.com.br/wp-content/uploads/2015/10/Logo-Default.png' })
    photo: string

    @ManyToMany(type => User, user => user.projects)
    users: User[]
}
