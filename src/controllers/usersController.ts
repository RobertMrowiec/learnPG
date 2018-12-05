import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser, Put } from 'routing-controllers'
import { User } from '../entity/User';
import { Repository, getConnectionManager, Server } from 'typeorm';
import * as bcrypt from 'bcrypt'
import sendMail from '../email'

@Controller('/users')
export class UserController {

    private userRepository: Repository<User>
    
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
    async add(@Body() user: User){
        const savedUser = await this.userRepository.save(user)
        
        sendMail(user.email, 'Thank You for register in my app', `Here is a link to generate Your password: http://localhost:3000/login/password/${savedUser.id} `)
        
        return {
            status: 'Saved succesfully',
            user: savedUser
        }
    }

    @Authorized()
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.userRepository.delete(id)
    }

    @Put('/setpassword/:id')
    async setPassword(@Param('id') id: number, @Body() body: any){
        body.password = bcrypt.hashSync(body.password, 5)
        const user = await this.userRepository.update(id, {password: body.password, activated: true})
        return {
            status: 'Password saved succesfully',
            user: await this.userRepository.findOne({id: id})
        }
    }
}