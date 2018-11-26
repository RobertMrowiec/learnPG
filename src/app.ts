import "reflect-metadata";
import { createConnection } from "typeorm"
import { createKoaServer } from "routing-controllers"
import { dbConfiguration } from '../ormconfig'
import * as dotenv from 'dotenv'
import { authFunction, currentUserFunction } from "./auth";

dotenv.config()
console.log(process.env);

const dbConf = dbConfiguration(process.env, 'prod')

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
