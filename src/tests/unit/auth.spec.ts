import { AuthController } from '../../controllers/authController';
import { AuthService } from "../../services/authService";
import { UnauthorizedError } from 'routing-controllers';

let controller: AuthController
let authService: AuthService

beforeAll(() => {
    authService = <any> {
        login: jest.fn(() => Promise.resolve())
    }
    controller = new AuthController(<any>authService)
})

describe('Auth Controller', () => {

    test('Should login user', async () => {
        await controller.login(<any> { email: 'qwe@gmail.com', password: 'qwe'})
        expect(authService.login).toBeCalledWith({ email: 'qwe@gmail.com', password: 'qwe'})
    })
})