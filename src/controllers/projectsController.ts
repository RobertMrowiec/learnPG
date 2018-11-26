import { getConnectionManager } from 'typeorm';
import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser, Put, UploadedFile } from 'routing-controllers'
import { Project } from '../entity/Project'
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { fileUploadOptions } from '../common';

@Authorized()
@Controller('/projects')
export class ProjectController {
    private projectRepository: Repository<Project>

    constructor() {
        this.projectRepository = getConnectionManager().get().getRepository(Project)
    }

    @Get('/')
    async get(){
        return this.projectRepository.find()
    }

    @Get('/:id')
    async getById(@Param('id') id: number){
        return this.projectRepository.findOne({id})
    }

    @Post('/')
    add(@Body() project: Project){
        return this.projectRepository.save(project)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.projectRepository.delete(id)
    }
    
    @Put('/:id')
    update( 
        @Body() body: object,
        @Param('id') id: number,
        @UploadedFile("file", { options: fileUploadOptions}) file: any,
    ) {
        return this.projectRepository.update(id, {...body, photo: file.location})
    }    
}