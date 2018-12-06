import { AuthService } from './../services/authService';
import {  getConnectionManager } from 'typeorm';
import { Controller, Body, Post, UnauthorizedError } from "routing-controllers";
import { User } from '../entity/User';

@Controller('/auth')

export class AuthController {


    constructor(private authService: AuthService) {}
    
    @Post('/login')
    login(@Body() login: User) {
        return this.authService.login(login)
    }
}