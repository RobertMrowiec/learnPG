import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {User} from './User'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @Column({default: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjIxKyp8sTeAhUCmrQKHbZDBDwQjRx6BAgBEAU&url=http%3A%2F%2Fwww.uniqueserviceshub.com%2Fcareer_zone%2F&psig=AOvVaw0GGsop3_NUS8z0z4lX5LYu&ust=1541769805408220'})
    photo: string

    @ManyToMany(type => User, user => user.projects)
    users: User[]
}
