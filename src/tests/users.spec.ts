import { UserService } from "../services/userService"
import { UserController } from "../controllers/usersController"

let controller: UserController
let userService: UserService

beforeAll(() => {
    userService = <any> {
        get: jest.fn(() => Promise.resolve()),
        getById: jest.fn(() => Promise.resolve()),
        add: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        setPassword: jest.fn(() => Promise.resolve())
    }
    controller = new UserController(<any>userService)
})

describe('User Controller', () => {

    test('Should get Users array', async () => {
        await controller.get()
        expect(userService.get).toBeCalled()
    })

    test('Should get User by specific ID', async () => {
        await controller.getById(11)
        expect(userService.getById).toBeCalledWith(11)
    })

    test('Should add new User', async () => {
        await controller.add(<any> { email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
        expect(userService.add).toBeCalledWith({ email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
    })
    
    test('Should delete User by specific ID', async () => {
        await controller.delete(5)
        expect(userService.delete).toBeCalledWith(5)
    })
    
    test('Should update User by specific ID', async () => {
        await controller.update(3, <any> {name: 'John'})
        expect(userService.update).toBeCalledWith(3, {name: 'John'})
    })

    test('Should add password to User', async () => {
        await controller.setPassword(3, <any> {password: 'test'})
        expect(userService.setPassword).toBeCalledWith(3, {password: 'test'})
    })
})

describe('User Controller', () => {
        test('Should get Users array', async () => {
            await controller.get()
            expect(userService.get).toBeCalled()
        })

    test('Should get Users array', async () => {
        await controller.get()
        expect(userService.get).toBeCalled()
    })

    test('Should get User by specific ID', async () => {
        await controller.getById(11)
        expect(userService.getById).toBeCalledWith(11)
    })

    test('Should add new User', async () => {
        await controller.add(<any> { email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
        expect(userService.add).toBeCalledWith({ email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
    })
    
    test('Should delete User by specific ID', async () => {
        await controller.delete(5)
        expect(userService.delete).toBeCalledWith(5)
    })
    
    test('Should update User by specific ID', async () => {
        await controller.update(3, <any> {name: 'John'})
        expect(userService.update).toBeCalledWith(3, {name: 'John'})
    })

})