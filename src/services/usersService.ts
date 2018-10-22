import { Service } from "typedi"
import { Connection, Repository } from "typeorm"
import { InjectConnection } from "typeorm-typedi-extensions"
import { User } from "../entity/User";

@Service()
export class UserService { 
    private repository: Repository<User>
    constructor(@InjectConnection() connection: Connection) {
        this.repository = connection.getRepository(User)
    }

    get() {
        return this.repository.find()
    }

    add(user: User) {
        return this.repository.save(user)
    }

    delete(userId: number) {
        return this.repository.delete(userId)
    }
}