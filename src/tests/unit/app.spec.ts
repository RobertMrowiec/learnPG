import { request } from 'supertest';
import appPromise from "../../app"

describe('app', async () => {
    // app.listen = mockListen
    
    test('Server is running', async () => {
        const mockListen = jest.fn()
    
        const app = await appPromise.then(({ app }) => app.callback())
        app.listen = mockListen
    // console.log(123, await app);
    
        require('../../index')

        console.log(mockListen.mock);
        
        expect(mockListen.mock.calls.length).toBe(1)
        // let a = 4
        // expect(a).toBe(4)
    })
})
