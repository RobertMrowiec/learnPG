import { UserService } from './../services/usersService';
import { Controller, Get, Post, Body, Param, Delete } from 'routing-controllers'
import { User } from '../entity/User';

@Controller('/users')
export class UserController {

    constructor( private userService: UserService ) {}

    @Get('/')
    async get(){
        return this.userService.get()
    }
    
    @Get('/:id')
    getById( @Param('id') id: number ){
        return this.userService.getById(id)
    }

    @Post('/')
    add( @Body() user: User ){  
        return this.userService.add(user)
    }

    @Delete('/:id')
    delete( @Param('id') id: number ){
        return this.userService.delete(id)
    }

}