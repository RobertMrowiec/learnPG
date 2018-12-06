import { createConnection, useContainer as typeormUseContainer } from "typeorm"
import { createKoaServer, useContainer as routingUserContainer } from "routing-controllers"
import { authFunction, currentUserFunction } from "./auth";
import { Container } from "typedi"
import * as dbConfiguration from '../ormconfig_dev'
import * as awsConfiguration from '../ormconfig'
import "reflect-metadata";

let dbConf = process.env.HOME == '/Users/robert' ? dbConfiguration : awsConfiguration

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
