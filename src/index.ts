import express, {Response} from 'express'
import {addressesRouter} from "./routers/addresses-router";
import {productsRouter} from "./routers/products-router";
import {runDb} from "./repositories/db";

const app = express()

const PORT = process.env.PORT || 3000

// const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if(req.query.token === "1234") {
//         next()
//     } else {
//         res.sendStatus(401)
//     }
// }

app.use(express.json())
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)

app.get('/', (_, res: Response) => {
    res.send('Hello World! ')
})


const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

startApp()