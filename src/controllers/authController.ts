import { Repository, getConnectionManager } from 'typeorm';
import { Controller, Body, Post } from "routing-controllers";
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
@Controller('/auth')

export class AuthController {

    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getConnectionManager().get().getRepository(User)
    }
    
    @Post('/checkPassword')
    async check(@Body() login: User ){
        const tempUser: any = await this.userRepository.findOne({email: login.email})
        const response = await bcrypt.compareSync(login.password, tempUser.password)
        if (response) {
            return jwt.sign({...tempUser}, process.env.secret)
        }
    }
}