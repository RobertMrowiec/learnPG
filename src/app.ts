import { authFunction, currentUserFunction } from "./auth";
import "reflect-metadata";
import { createConnection, useContainer as typeormUseContainer } from "typeorm"
import { createKoaServer, useContainer as routingUserContainer } from "routing-controllers"
import * as dbConfiguration from '../ormconfig'
import * as dotenv from 'dotenv'
import { Container } from "typedi"


dotenv.config()

let dbConf = dbConfiguration[0] // 0 is AWS, 1 is LOCALHOST

if (process.env.HOME === '/Users/robert'){
    dbConf = dbConfiguration[1]
}

routingUserContainer(Container)
typeormUseContainer(Container)

export default createConnection(<any> dbConf).then(connection => ({
    connection,
    app: createKoaServer({
        authorizationChecker: authFunction,
        currentUserChecker: currentUserFunction,
        controllers: [
            `${__dirname}/controllers/!(*.spec.js|*.spec.ts)`
        ],
        cors: true,
        middlewares: [`${__dirname}/middleware/!(*.spec.js|*.spec.ts)`],
        defaultErrorHandler: false
    })
}))
