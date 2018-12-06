import { Action, UnauthorizedError, BadRequestError } from "routing-controllers";
import { User } from "./entity/User";
import { getConnectionManager} from "typeorm";
import * as jwt from 'jsonwebtoken';
import secret from './secret';
import { promisify } from 'util';
const verify = promisify(jwt.verify)

export async function authFunction(action: Action) {

    let userRepository = getConnectionManager().get().getRepository(User);    

    const token = action.request.headers.authorization

    if (!token) throw new UnauthorizedError('You must provide correct token')
    
    const decoded: any = typeof token === 'string' && token.startsWith('Bearer ')
        ? await verify(token.split(' ')[1], secret).catch((err) => {
            throw new BadRequestError(err)
        })
        : undefined
        
    if (!decoded) throw new BadRequestError('Wrong token')
    
    let currentUser = await userRepository.findOne({ id: decoded.id});
    
    action.context.user = (<User> currentUser)
    
    return true
}

export async function currentUserFunction(action: Action) {
    return action.context.user
}
