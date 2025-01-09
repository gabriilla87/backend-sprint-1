import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";


export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    res.send(productsRepository.findProductsByTitle(req.query.title ? `${req.query.title}` : null))
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    res.send(productsRepository.deleteProductById(+req.params.id) ? 204 : 404)
})
productsRouter.post('/', (req: Request, res: Response) => {
    if (req.body.title) {
        res.status(201).send(productsRepository.createNewProduct(req.body.title))
    } else {
        res.send(400)
    }


})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id)
    const isUpdated = productsRepository.updateProductById(+req.params.id, req.body.title)

    if(product) {
        if(isUpdated) {
            res.status(200).send(product)
        } else {
            res.send(400)
        }
    } else {
        res.send(404)
    }
})