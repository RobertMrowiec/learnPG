import appPromise from "../../app"
import * as request from 'supertest'

describe('Users', () => {
    let appCallback
    beforeAll(() => {
        return appPromise.then(({ app }) => {
            appCallback = app.callback()
        })
    })
    
    test('Get users', async () => {
        const res = await request(appCallback).get('/users')
        expect (res.status).toBe(200)
    })
})