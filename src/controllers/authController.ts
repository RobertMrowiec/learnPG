import { Repository, getConnectionManager } from 'typeorm';
import { Controller, Body, Post, UnauthorizedError } from "routing-controllers";
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import secret from '../secret'

@Controller('/auth')

export class AuthController {

    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getConnectionManager().get().getRepository(User)
    }
    
    @Post('/login')
    async check(@Body() login: User ){
        const tempUser: any = await this.userRepository.findOne({email: login.email})
        if (!tempUser) throw new UnauthorizedError('Wrong credentials')

        const response = await bcrypt.compareSync(login.password, tempUser.password)
        if (!response) throw new UnauthorizedError('Wrong credentials')

        return {
            user: tempUser,
            token: jwt.sign({...tempUser}, secret, { expiresIn: 60*15*100 })
        }
    }
}