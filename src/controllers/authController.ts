import { AuthService } from './../services/authService';
import {  getConnectionManager } from 'typeorm';
import { Controller, Body, Post, UnauthorizedError } from "routing-controllers";
import { User } from '../entity/User';

@Controller('/auth')

export class AuthController {


    constructor(private authService: AuthService) {}
    
    @Post('/login')
    async check(@Body() login: User) {
        return this.authService.login(login)
    }
}