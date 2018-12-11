import { KoaMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers"

@Middleware({ type: "before" })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
    async use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
        try {
            if (ctx.method === 'POST') ctx.response.status = 201
            await next()
        } catch (err) {
            ctx.status = err.httpCode || 500
            
            if (err.code === "23505" || err.code === "22P02" || err.code === "23502") {
                // duplicate && entity unique : true ||       from ENUM      || entity nullable: false
                ctx.status = 400
            }
            ctx.body = err

            // if (ctx.response.status === 401) ctx.body = new UnauthorizedError('You must provide correct token')
        }
    }
}
