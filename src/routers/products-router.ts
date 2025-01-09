import {Request, Response, Router} from "express";

type Product = {
    id: number
    title: string
}

const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    if(req.query.title) {
        res.send(products.filter(p => p.title.indexOf(`${req.query.title}`) > -1))
    } else {
        res.send(products)
    }
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }

    res.send(404)
})
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct: Product = {
        id: +new Date(),
        title: req.body.title
    }
    products.unshift(newProduct)
    res.status(201).send(newProduct)
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if(product) {
        if(req.body.title) {
            product.title = req.body.title
            res.status(200).send(product)
        } else {
            res.send(400)
        }
    } else {
        res.send(404)
    }
})