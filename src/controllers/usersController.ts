import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser } from 'routing-controllers'
import { User } from '../entity/User';
import { Repository, getConnectionManager } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Controller('/users')
export class UserController {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getConnectionManager().get().getRepository(User);
    }

    @Get('/')
    get(){
        return this.userRepository.find()
    }

    @Get('/:id')
    getById(@Param('id') id: number){
        return this.userRepository.findOne({ id: id })
    }

    @Authorized()
    @Post('/')
    add(@Body() user: User){
        user.password = bcrypt.hashSync(user.password, 5)
        return this.userRepository.save(user)
    }

    @Authorized()
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.userRepository.delete(id)
    }
}