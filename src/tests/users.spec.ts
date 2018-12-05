import { UserController } from '../controllers/usersController';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { expect } from 'chai';
import appPromise from "../app";
import 'mocha'

const hello = () => 'Hello world!'; 

describe('user Controller', () => {
    let controller: UserController
    let appCallback
    beforeEach(async () => {
        return appPromise.then(({ app }) => {
            appCallback = app.callback()
            controller = new UserController()
        })
    })

    it('Get users array', async () => {
        const res = await controller.get().catch(x => x)
        expect(res).to.be.an('array')
    })
})