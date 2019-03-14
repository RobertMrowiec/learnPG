import { Service } from "typedi"
import { Connection, Repository } from "typeorm"
import { InjectConnection } from "typeorm-typedi-extensions"
import { User } from "../entity/User";
import sendMail from "../email";
import * as bcrypt from 'bcrypt'

@Service()
export class UserService {

    private repository: Repository <User>
    constructor(@InjectConnection() connection: Connection) {
        this.repository = connection.getRepository(User)
    }

    get() {
        return this.repository.find()
    }

    getById(id: number){
        return this.repository.findOne({id})
    }

    async add(user: User) {
        if (user.password) user.password = bcrypt.hashSync(user.password, 5)

        const savedUser = await this.repository.save(user)
        try {
            sendMail(user.email, 'Thank You for register in my app', `Activate Your account by log in via this link: http://localhost:3000/login/password/${savedUser.id} `)
        } finally {
            return {
                status: 'Saved succesfully',
                user: savedUser
            }
        }
    }

    delete(id: number){
        return this.repository.delete(id)
    }

    update(id: number, body: User){
        return this.repository.update(id, body).then(x => this.repository.findOne({id}))
    }
    
    async activate(id: number, body: any){
        const tempUser = await this.repository.findOne({id})
        if ( tempUser && await bcrypt.compareSync(body.password, tempUser.password)){
            await this.repository.update(id, {activated: true})
            return {
                status: 'Account activated',
                user: await this.repository.findOne({id: id})
            }
        }
        
        return {
            status: 'Account activation problem',
            user: await this.repository.findOne({id: id})
        }
    }
}