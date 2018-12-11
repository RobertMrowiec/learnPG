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
    
    await request(appCallback)
        .put(`/users/setPassword/${tempUser.id}`)
        .send({ password: 'qwe' })
        .set('Authorization', `Bearer ${getToken()}`)
})

afterAll(() => request(appCallback).delete(`/users/${tempUser.id}`).set('Authorization', `Bearer ${getToken()}`))

describe('Auth', () => {
    test('Throw unauthorizedError if email is not valid', async () => {
        return request(appCallback)
            .post('/auth/login')
            .send({
                email:'qwe',
                password: '123'
            }).expect(401)
    })

    test('Throw unauthorizedError if password is not valid', async () => {
        return request(appCallback)
            .post('/auth/login')
            .send({
                email: 'testEmail@gmail.com',
                password: '123'
            }).expect(401)
    })

    test('Return object with user and token', async () => {
        return request(appCallback)
            .post('/auth/login')
            .send({email: tempUser.email, password: 'qwe'})
            .expect(201)
            .expect(({ body }) => {
                expect(body.token).not.toBeNull()
            })
        })
})
