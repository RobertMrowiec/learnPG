import { AuthService } from './../services/authService';
import { Controller, Body, Post } from "routing-controllers";
import { User } from '../entity/User';

@Controller('/auth')

export class AuthController {


    constructor(private authService: AuthService) {}
    
    @Post('/login')
    login(@Body() login: User) {
        return this.authService.login(login)
    }
}