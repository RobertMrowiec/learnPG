import { ProjectController } from "../../controllers/projectsController";
import { ProjectService } from "../../services/projectService";

let controller: ProjectController
let projectService: ProjectService

beforeAll(() => {
    projectService = <any> {
        get: jest.fn(() => Promise.resolve()),
        getById: jest.fn(() => Promise.resolve()),
        add: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        uploadPhoto: jest.fn(() => Promise.resolve())
    }
    controller = new ProjectController(<any>projectService)
})

describe('Project Controller', () => {

    test('Should get Projects array', async () => {
        await controller.get()
        expect(projectService.get).toBeCalled()
    })

    test('Should get Project by specific ID', async () => {
        await controller.getById(11)
        expect(projectService.getById).toBeCalledWith(11)
    })

    test('Should add new Project', async () => {
        await controller.add(<any> { name: 'TEST' } )
        expect(projectService.add).toBeCalledWith({ name: 'TEST' })
    })

    test('Should delete Project by specific ID', async () => {
        await controller.delete(5)
        expect(projectService.delete).toBeCalledWith(5)
    })

    test('Should update Project by specific ID', async () => {
        await controller.update(3, <any> {name: 'TEST2'})
        expect(projectService.update).toBeCalledWith(3, {name: 'TEST2'})
    })

    test('Should upload photo to S3', async () => {
        await controller.uploadPhoto(3, {location: 'https://somepng.png'})
        expect(projectService.uploadPhoto).toBeCalledWith(3, {location: 'https://somepng.png'})
    })

})