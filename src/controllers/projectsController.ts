import { getConnectionManager } from 'typeorm';
import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser } from 'routing-controllers'
import { Project } from '../entity/Project'
import { User } from '../entity/User';
import { Repository } from 'typeorm';

@Authorized()
@Controller('/projects')
export class ProjectController {
    private projectRepository: Repository<Project>

    constructor() {
        this.projectRepository = getConnectionManager().get().getRepository(Project)
    }

    @Get('/')
    async get(@CurrentUser() currentUser: User){
        
    }
}