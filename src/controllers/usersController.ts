import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser, Put } from 'routing-controllers'
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
    async getById(@Param('id') id: number){
        await this.userService.getById(id).catch(x => x)
    }

    // @Authorized()
    @Post('/')
    async add(@Body() user: User){
        return this.userService.add(user)
    }

    // @Authorized()
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.userService.delete(id)
    }

    @Put('/setpassword/:id')
    async setPassword(@Param('id') id: number, @Body() body: any){
        return this.userService.update(id, body)
    }

}