import { KoaMiddlewareInterface, Middleware } from "routing-controllers"

@Middleware({ type: "before" })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
    async use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
        try {
            await next()
        } catch (err) {
            
            ctx.status = err.httpCode || 500
            
            if (err.code === "23505" || err.code === "22P02" || err.code === "23502") {
// duplicate && entity unique : true ||       from ENUM      || entity nullable: false
                ctx.status = 400
            }
            ctx.body = err
        }
    }
}
