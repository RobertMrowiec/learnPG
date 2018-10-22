import { UserService } from './../services/usersService';
import { Controller, Get, Post, Body } from 'routing-controllers'
import { User } from '../entity/User';

@Controller('/users')
export class UserController {

    constructor( private userService: UserService ) {}

    @Get('/')
    get(){
        console.log(1)
        return this.userService.get()
    }

    @Post('/')
    add(
        @Body() user: User
    ){  
        return this.userService.add(user)
    }
}