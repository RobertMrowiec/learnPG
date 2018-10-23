import { Controller, Get, Post, Body, Param, Delete } from 'routing-controllers'
import { User } from '../entity/User';
import { Repository, getConnectionManager } from 'typeorm';

@Controller('/users')
export class UserController {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getConnectionManager().get().getRepository(User);
    }

    @Get('/')
    async get(){
        return this.userRepository.find()
    }
    
    @Get('/:id')
    getById( @Param('id') id: number ){
        return this.userRepository.findOne({ id: id })
    }

    @Post('/')
    add( @Body() user: User ){  
        return this.userRepository.save(user)
    }

    @Delete('/:id')
    delete( @Param('id') id: number ){
        return this.userRepository.delete(id)
    }

}