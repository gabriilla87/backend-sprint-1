import {Request, Response, Router} from 'express'

const addresses = [{id: 1, value: "Vasilkovaja 1"}, {id: 2, value: 'Shkolnaja 4B'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (_, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addresses.find(p => p.id === +req.params.id)
    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})