import { Service } from "typedi"
import { Connection, Repository } from "typeorm"
import { InjectConnection } from "typeorm-typedi-extensions"
import { User } from "../entity/User";
import { UnauthorizedError } from 'routing-controllers';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import secret from '../secret'

@Service()
export class AuthService {

    private repository: Repository<User>
    constructor(@InjectConnection() connection: Connection) {
        this.repository = connection.getRepository(User)
    }

    async login(login: User){
        const tempUser = await this.repository.findOne({email: login.email})
        if (!tempUser) throw new UnauthorizedError('Wrong credentials')

        const response = await bcrypt.compareSync(login.password, tempUser.password)
        if (!response) throw new UnauthorizedError('Wrong credentials')

        return {
            user: tempUser,
            token: jwt.sign({...tempUser}, secret, { expiresIn: '1h' })
        }
    }
l}