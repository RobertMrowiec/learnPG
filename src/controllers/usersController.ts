import { Controller, Get, Post, Body, Param, Delete, Put, Authorized } from 'routing-controllers'
import { User } from '../entity/User';
import { UserService } from '../services/userService';

@Controller('/users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/')
    get(){
        return this.userService.get()
    }

    @Get('/:id')
    getById(@Param('id') id: number){
        return this.userService.getById(id)
    }

    @Post('/')
    add(@Body() user: User){
        return this.userService.add(user)
    }

    @Authorized()
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.userService.delete(id)
    }

    @Authorized()
    @Put('/:id')
    update(@Param('id') id: number, @Body() body: User){
        return this.userService.update(id, body)
    }

    @Put('/activate/:id')
    activate(@Param('id') id: number, @Body() body: any){
        return this.userService.activate(id, body) 
    }
}