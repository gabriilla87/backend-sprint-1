import {Product} from "../types/types";
import {productsCollection} from "./db";

export const productsRepository = {
    async getProductsByTitle(partOfTitle: string | null): Promise<Product[]> {
        const filter: any = {}

        if(partOfTitle) {
            filter.title = { $regex: partOfTitle }
        }

        return productsCollection.find(filter).toArray()
    },

    async getProductById(id: number): Promise<Product | null> {
        return await productsCollection.findOne({id})
    },

    async deleteProductById(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({ id })
        return result.deletedCount === 1
    },

    async createNewProduct(title: string): Promise<Product> {
        const newProduct: Product = {
            id: +new Date(),
            title
        }
        await productsCollection.insertOne(newProduct)
        // @ts-ignore
        const { _id, ...newProductWithoutMongoId } = newProduct
        return newProductWithoutMongoId
    },

    async updateProductById(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({ id }, { $set: { title } })
        return result.matchedCount === 1
    }
}