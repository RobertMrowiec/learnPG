import { Controller, Get } from 'routing-controllers'

@Controller()

export class CarsController {
    @Get('/users')
    get(){
        return "Returned every users"
    }

}