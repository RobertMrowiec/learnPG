import { UserService } from "../services/userService"
import { UserController } from "../controllers/usersController"

let controller: UserController
let userService: UserService

beforeAll(() => {
    userService = <any> {
        get: jest.fn(() => Promise.resolve()),
        getById: jest.fn(() => Promise.resolve()),
        add: jest.fn(() => Promise.resolve())
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

        test('Should add new user', async () => {
            await controller.add(<any> { email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
            expect(userService.add).toBeCalledWith({ email: 'qwe@gmail.com', name:'Test', surname: 'qwe'})
        })
        
})