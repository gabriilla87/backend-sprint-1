import express, {Response, Request} from 'express'

type Product = {
    id: number
    title: string
}

const app = express()

const PORT = process.env.PORT || 3000

const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: "Vasilkovaja 1"}, {id: 2, value: 'Shkolnaja 4B'}]

app.use(express.json())

app.get('/products', (req: Request, res: Response) => {
    if(req.query.title) {
        res.send(products.filter(p => p.title.indexOf(`${req.query.title}`) > -1))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if(product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }

    res.send(404)
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct: Product = {
        id: +new Date(),
        title: req.body.title
    }
    products.unshift(newProduct)
    res.status(201).send(newProduct)
})
app.put('/products/:id', (req: Request, res: Response) => {
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


app.get('/addresses', (_, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(p => p.id === +req.params.id)
    if(address) {
        res.send(address)
    } else {
        res.send(404)
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})