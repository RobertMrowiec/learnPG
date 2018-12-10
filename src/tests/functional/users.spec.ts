import appPromise from "../../app"
import * as request from 'supertest'
import * as dotenv from 'dotenv'
import getToken from '../token'

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
            email:'qwe123@gmail.com',
            name: 'Test',
            surname: 'qwe'
        })
        .set('Authorization', `Bearer ${getToken()}`)
        .expect(201)
        .then(({ body }) => body.user)
})

afterAll(() => {
    return request(appCallback)
        .delete(`/users/${tempUser.id}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .expect(200)
    })

describe('Users', async () => {

    test('Get Users', async () => {
        await request(appCallback).get('/users')

        expect(200)
        expect(({ body }) => {
            expect(Array.isArray(body)).toEqual(true)
        })
    })

    test('Get User by specific ID', async () => {
        await request(appCallback).get(`/users/${tempUser.id}`)

        expect(200)
        expect(({ body }) => {
            expect(body.email).toBe('qwe123@gmail.com')
            expect(body.name).toBe('Test')
        })
    })

    test('Update User by specific ID', async () => {
        await request(appCallback)
            .put(`/users/${tempUser.id}`)
            .send({ name: 'Another test name' })
            .then(({ body }) => tempUser = body)

        expect(200)
        expect(({ body }) => {
            expect(body.email).toBe('qwe123@gmail.com')
            expect(body.name).toBe('Another test name')
        })
    })

    test('Set User password', async () => {
        const { password, ...noPassTemp } = tempUser
        noPassTemp.activated = true
        
        await request(appCallback)
            .put(`/users/setPassword/${tempUser.id}`)
            .send({ password: 'secret password' })
        
        expect(200)
        expect(({ body }) => {
            const { password, ...noPassBody } = body.user
            expect(body.status).toBe('Password saved succesfully')
            expect(body).not.toEqual(tempUser)
            expect(noPassBody).toEqual(noPassTemp)
        })
    })

})