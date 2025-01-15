import {MongoClient} from "mongodb";
import {Product} from "../types/types";

const mongoURI = process.env.mongoURI || "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoURI)
const db = client.db('shop')
export const productsCollection = db.collection<Product>('products')

export const runDb = async () => {
    try {
        await client.connect()
        await client.db("products").command({ ping: 1 })
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}