import { UserController } from '../controllers/usersController';
import { expect } from 'chai';
import appPromise from "../app";
import 'mocha'

describe('user Controller', () => {
    let controller: UserController
    beforeEach(() => appPromise.then(async () => {
        return controller = new UserController()
    }))

    it('Get users array', async () => {
        const res = await controller.get().catch(x => x)
        expect(res).to.be.an('array')
    })
})