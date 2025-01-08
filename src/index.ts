import express, {Response} from 'express'

const app = express()

const PORT = process.env.PORT || 3000

const products = [{title: 'tomato'}, {title: 'orange'}]
const addresses = [{value: "Vasilkovaja 1"}, {value: 'Shkolnaja 4B'}]

app.get('/products', (_, res: Response) => {
    res.send(products)
})
app.get('/addresses', (_, res: Response) => {
    res.send(addresses)
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})