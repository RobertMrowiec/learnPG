import { Controller, Get, Post, Body, Param, Delete, Authorized, CurrentUser, Put, UploadedFile, Patch } from 'routing-controllers'
import { Project } from '../entity/Project'
import { fileUploadOptions } from '../common';
import { ProjectService } from '../services/projectService';

@Authorized()
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

    @Post('/')
    add(@Body() project: Project){
        return this.projectService.add(project)
    }

    @Put('/:id')
    update( 
        @Param('id') id: number,
        @Body() body: Project,
    ) {
        return this.projectService.update(id, body)
    }

    @Patch('/:id/upload')
    uploadPhoto( 
        @Param('id') id: number,
        @UploadedFile("file", { options: fileUploadOptions}) file: any,
    ) {
        return this.projectService.uploadPhoto(id, file)
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.projectService.delete(id)
    }
}