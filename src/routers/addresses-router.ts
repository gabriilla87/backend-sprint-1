import {Request, Response, Router} from 'express'
import {addressesRepository} from "../repositories/addresses-repository";

export const addressesRouter = Router({})

addressesRouter.get('/', (_, res: Response) => {
    res.send(addressesRepository.getAllAddresses())
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addressesRepository.getAddressById(+req.params.id)
    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})