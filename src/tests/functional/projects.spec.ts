import appPromise from "../../app"
import * as request from 'supertest'
import * as dotenv from 'dotenv'
let appCallback
let tempProject

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
        .expect(201)
        .then(({ body }) => {
            return body
        })
})

afterAll(() => {
    return request(appCallback)
        .delete(`/projects/${tempProject.id}`)
})

describe('Projects', async () => {

    test('Get Projects', async () => {
        await request(appCallback).get('/projects')

        expect(200)
        expect(({ body }) => {
            expect(Array.isArray(body)).toEqual(true)
        })
    })

    test('Get Project by specific ID', async () => {
        await request(appCallback).get(`/projects/${tempProject.id}`)

        expect(200)
        expect(({ body }) => {
            expect(body.name).toBe('Test Project')
        })
    })

    test('Update Project by specific ID', async () => {
        await request(appCallback)
            .patch(`/projects/${tempProject.id}`)
            .send({ name: 'Another project test name' })
            .then(({ body }) => tempProject = body )

        expect(200)
        expect(({ body }) => {
            expect(body.name).toBe('Another project test name')
        })
    })

    test('Add project logo', async () => {
        
        await request(appCallback)
            .put(`/projects/${tempProject.id}/upload`)
            .attach('file', __dirname + '/testLogo.png')
            .then(({ body }) => tempProject = body )

        expect(200)
        expect(({ body }) => {
            expect(body.photo).not.toBe('http://www.bigfish.pk/images/company/defaultLogo.jpg')
        })
    })
})