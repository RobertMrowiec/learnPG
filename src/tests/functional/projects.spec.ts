import appPromise from "../../app"
import * as request from 'supertest'
import * as dotenv from 'dotenv'
import getToken from '../token'

let appCallback
let tempProject
let tempProjectId

beforeAll(async () => {
    
    dotenv.config()

    await appPromise.then(({ app }) => {
        appCallback = app.callback()
    })

    tempProject = await request(appCallback)
        .post('/projects')
        .send({
            name: 'Test Project' 
        })
        .set('Authorization', `Bearer ${getToken()}`)
        .expect(201)
        .then(({ body }) => {
            return body
        })

    tempProjectId = tempProject.id
})

afterAll(() => request(appCallback).delete(`/projects/${tempProjectId}`).set('Authorization', `Bearer ${getToken()}`))

describe('Projects', async () => {

    test('Get Projects', () => {
        return request(appCallback)
            .get('/projects')
            .expect(200)
            .expect(({ body }) => {
                expect(Array.isArray(body)).toEqual(true)
            })
    })

    test('Get Project by specific ID', () => {
        return request(appCallback)
            .get(`/projects/${tempProject.id}`)
            .expect(200)
            .expect(({ body }) => {
                expect(body.name).toBe('Test Project')
            })
    })

    test('Update Project by specific ID', () => {
        return request(appCallback)
            .patch(`/projects/${tempProject.id}`)
            .send({ name: 'Another project test name' })
            .set('Authorization', `Bearer ${getToken()}`)
            .expect(200)
            .expect(({ body }) => {
                expect(body.name).toBe('Another project test name')
            })

    })

    test('Throw BadRequestError if token is wrong', () => {
        return request(appCallback)
            .post('/projects')
            .send({
                name: 'Wrong Token Test Project'
            })
            .set('Authorization', `Bearer ${getToken()}32131231`)
            .expect(400)
    })

    test('Throw 400 if unique key is duplicated', () => {
        return request(appCallback)
            .post('/projects')
            .send({
                name: 'TEST'
            })
            .set('Authorization', `Bearer ${getToken()}`)
            .expect(400)
    })
    
    test('Add project logo', () => {
        return request(appCallback)
            .put(`/projects/${tempProject.id}/upload`)
            .set('Authorization', `Bearer ${getToken()}`)
            .timeout(10000)
            .attach('file', __dirname + '/testLogo.png')
            .expect(200)
            .expect(({ body }) => {
                expect(body.photo).not.toBe('http://www.bigfish.pk/images/company/defaultLogo.jpg')
            })
    })
})