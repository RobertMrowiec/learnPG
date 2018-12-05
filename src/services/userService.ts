import { Service } from "typedi"
import { Connection, Repository } from "typeorm"
import { InjectConnection } from "typeorm-typedi-extensions"
import { User } from "../entity/User";
import { Body, Param } from "routing-controllers";
import sendMail from "../email";
import * as bcrypt from 'bcrypt'

@Service()
export class UserService {

    private repository: Repository<User>
    constructor(@InjectConnection() connection: Connection) {
        this.repository = connection.getRepository(User)
    }

    get() {
        return this.repository.find()
    }

    getById(id: number){
        return this.repository.findOne({id})
    }

    async add(user: User){
        const savedUser = await this.repository.save(user)
        
        sendMail(user.email, 'Thank You for register in my app', `Here is a link to generate Your password: http://localhost:3000/login/password/${savedUser.id} `)
        
        return {
            status: 'Saved succesfully',
            user: savedUser
        }
    }

    delete(id: number){
        return this.repository.delete(id)
    }

    async update(id: number, body: any){
        body.password = bcrypt.hashSync(body.password, 5)
        await this.repository.update(id, {password: body.password, activated: true})
        return {
            status: 'Password saved succesfully',
            user: await this.repository.findOne({id: id})
        }
    }
}