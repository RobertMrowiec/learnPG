import appPromise from "../../app"
import * as request from 'supertest'
import * as dotenv from 'dotenv'
import getToken from '../token'
import { User } from "../../entity/User";

let appCallback
let tempUser: User
let tempUserId

beforeAll( async () => {
    dotenv.config()

    await appPromise.then(({ app }) => {
        appCallback = app.callback()
    })

    tempUser = await request(appCallback)
        .post('/users')
        .send({
            email:'qwe123@gmail.com',
            name: 'Test',
            surname: 'qwe'
        })
        .set('Authorization', `Bearer ${getToken()}`)
        .timeout(10000)
        .expect(201)
        .then(({ body }) => body.user)
        
    tempUserId = tempUser.id
})

afterAll(() => {
    return request(appCallback)
        .delete(`/users/${tempUserId}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .expect(200)
    })

describe('Users', () => {

    test('Get Users', () => {
        return request(appCallback)
            .get('/users')
            .expect(200)
            .expect(({ body }) => {
                expect(Array.isArray(body)).toEqual(true)
            })
    })

    test('Get User by specific ID', () => {
        return request(appCallback)
            .get(`/users/${tempUserId}`)
            .expect(200)
            .expect(({ body }) => {
                expect(body.email).toBe('qwe123@gmail.com')
                expect(body.name).toBe('Test')
            })
    })

    test('Update User by specific ID', () => {
        return request(appCallback)
            .put(`/users/${tempUserId}`)
            .send({ name: 'Another test name' })
            .set('Authorization', `Bearer ${getToken()}`)
            .expect(200)
            .expect(({ body }) => {
                expect(body.email).toBe('qwe123@gmail.com')
                expect(body.name).toBe('Another test name')
            })
    })

    test('Set User password', () => {
        return request(appCallback)
            .put(`/users/setPassword/${tempUserId}`)
            .send({ password: 'secret password' })
            .set('Authorization', `Bearer ${getToken()}`)
            .expect(200)
            .expect(({ body }) => {
                expect(body.status).toBe('Password saved succesfully')
                expect(body).not.toEqual(tempUser)
            })
    })

})