import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import {productsRepository} from "../repositories/products-repository";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const productsRouter = Router({})

const titleValidation =
    body('title')
        .exists().withMessage('Property title should exists in request body')
        .bail()
        .trim()
        .isLength({min: 3, max: 10}).withMessage('Title length should be from 3 to 10')

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
    res.sendStatus(productsRepository.deleteProductById(+req.params.id) ? 204 : 404)
})

productsRouter.post(
    '/',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        res.status(201).send(productsRepository.createNewProduct(req.body.title))
    }
)

productsRouter.put(
    '/:id',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = productsRepository.updateProductById(+req.params.id, req.body.title)
        const product = productsRepository.getProductById(+req.params.id)

        if (isUpdated) {
            res.status(200).send(product)
            return;
        }

        res.sendStatus(404)
    }
)