import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser, Put } from 'routing-controllers'
import { User } from '../entity/User';
import { Repository, getConnectionManager, Server } from 'typeorm';
import * as bcrypt from 'bcrypt'
import sendMail from '../email'
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

    // @Put('/setpassword/:id')
    // async setPassword(@Param('id') id: number, @Body() body: any){
    //     body.password = bcrypt.hashSync(body.password, 5)
    //     const user = await this.userService.update(id, {password: body.password, activated: true})
    //     return {
    //         status: 'Password saved succesfully',
    //         user: await this.userService.findOne({id: id})
    //     }
    // }
}