import express, {Request, Response} from 'express'
import {addressesRouter} from "./routers/addresses-router";
import {productsRouter} from "./routers/products-router";

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! ')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})