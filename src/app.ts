import "reflect-metadata";
import { createConnection } from "typeorm"
import { createKoaServer } from "routing-controllers"
import * as dbConfiguration from '../ormconfig'
import * as dotenv from 'dotenv'
import { authFunction } from "./auth";

dotenv.config()

export default createConnection(<any> dbConfiguration).then(connection => ({
    connection,
    app: createKoaServer({
        authorizationChecker: authFunction,
        controllers: [
            `${__dirname}/controllers/!(*.spec.js|*.spec.ts)`
        ],
        middlewares: [`${__dirname}/middleware/!(*.spec.js|*.spec.ts)`],
        defaultErrorHandler: false
    })
}))
