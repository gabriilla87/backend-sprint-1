import express, {Request, Response} from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World';
    res.send(helloMessage)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})