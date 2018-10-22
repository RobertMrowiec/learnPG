import "reflect-metadata";
import { createConnection, useContainer as typeormUseContainer } from "typeorm"
import { createKoaServer, useContainer as routingUserContainer } from "routing-controllers"
import * as dbConfiguration from '../ormconfig'
import { Container } from "typedi"

routingUserContainer(Container)
typeormUseContainer(Container)

export default createConnection(<any> dbConfiguration).then(connection => ({
    connection,
    app: createKoaServer({
        controllers: [
            `${__dirname}/controllers/!(*.spec.js|*.spec.ts)`
        ],
        middlewares: [`${__dirname}/middleware/!(*.spec.js|*.spec.ts)`],
        defaultErrorHandler: false
    })
}))
