import * as jwt from "jsonwebtoken"
import secret from "../secret"

export default function getToken(user: { id: number } = { id: 11},
    tokenSecret = secret): string {
    return jwt.sign({ ...user }, tokenSecret)
}
