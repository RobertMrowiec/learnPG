import { Controller, Get, Post, Body, Param, Delete, Authorized, Put, UploadedFile, Patch } from 'routing-controllers'
import { Project } from '../entity/Project'
import { fileUploadOptions } from '../common';
import { ProjectService } from '../services/projectService';

@Controller('/projects')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get('/')
    async get(){
        return this.projectService.get()
    }

    @Get('/:id')
    async getById(@Param('id') id: number){
        return this.projectService.getById(id)
    }

    // @Authorized()
    @Post('/')
    add(@Body() project: Project){
        return this.projectService.add(project)
    }

    // @Authorized()
    @Patch('/:id')
    update( 
        @Param('id') id: number,
        @Body() body: Project,
    ) {
        return this.projectService.update(id, body)
    }

    // @Authorized()
    @Put('/:id/upload')
    uploadPhoto( 
        @Param('id') id: number,
        @UploadedFile("file", { options: fileUploadOptions}) file: any,
    ) {
        return this.projectService.uploadPhoto(id, file)
    }

    // @Authorized()
    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.projectService.delete(id)
    }
}