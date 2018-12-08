import { InjectConnection } from 'typeorm-typedi-extensions';
import { Connection, Repository } from 'typeorm';
import { Project } from '../entity/Project';
import { Service } from "typedi";

@Service()
export class ProjectService {
    private repository: Repository <Project>
    constructor(@InjectConnection() connection: Connection) {
        this.repository = connection.getRepository(Project)
    }

    get() {
        return this.repository.find()
    }

    getById(id: number) {
        return this.repository.findOne({id})
    }

    add(body: Project) {
        return this.repository.save(body)
    }

    update(id: number, body: Project) {
        return this.repository.update(id, body).then(x => {
            return this.repository.findOne({id})
        })
    }

    uploadPhoto(id: number, file: any) {
        return this.repository.update(id, {photo: file.location}).then(x => {
            return this.repository.findOne({id})
        })
    }

    delete(id: number) {
        return this.repository.delete(id)
    }
}