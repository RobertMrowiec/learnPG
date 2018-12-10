import appPromise from "../../app"
import * as request from 'supertest'
import * as dotenv from 'dotenv'
import { UnauthorizedError } from "routing-controllers";
import getToken from "../token";
let appCallback
let tempUser

beforeAll(async () => {
    
    dotenv.config()

    await appPromise.then(({ app }) => {
        appCallback = app.callback()
    })

    tempUser = await request(appCallback)
        .post('/users')
        .send({
            email: 'testEmail@gmail.com',
            name: 'tempTEST',
            surname: 'tempTEST'
        })
        .set('Authorization', `Bearer ${getToken()}`)
        .then(({ body }) => body.user)
        .then(user => {
            return request(appCallback)
                .post(`/users/setPassword/${user.id}`)
                .send({ password: 'qwe' })
        })
        .catch(x => console.log(x))

})

afterAll(async () => {
    await request(appCallback)
        .delete(`/users/${tempUser.id}`)
})

describe('Auth', () => {
    test('Throw unauthorizedError if email is not valid', async () => {
        await request(appCallback)
            .post('/auth/login')
            .send({
                email:'qwe',
                password: '123'
            })
        expect(400)
        expect(({ body }) => {
            expect(body).toBeInstanceOf(UnauthorizedError)
        })
    })

    test('Throw unauthorizedError if password is not valid', async () => {
        await request(appCallback)
            .post('/auth/login')
            .send({
                email: process.env.Test_email,
                password: '123'
            })
        expect(400)
        expect(({ body }) => {
            expect(body).toBeInstanceOf(UnauthorizedError)
        })
    })

    test('Return object with user and token', async () => {
        await request(appCallback)
            .post('/users')
            .send(tempUser)
        expect(200)
        expect(({ body }) => {
            console.log(body);
            
            expect(body.token).toBeDefined()
            expect(body.user).toEqual(tempUser)
        })
    })
})
