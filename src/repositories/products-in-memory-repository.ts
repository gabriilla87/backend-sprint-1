import {Product} from "../types/types";

const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    async findProductsByTitle(partOfTitle: string | null): Promise<Product[]> {
        if (partOfTitle) {
            return products.filter(p => p.title.indexOf(partOfTitle) > -1)
        } else {
            return products
        }
    },

    async getProductById(id: number): Promise<Product | undefined> {
        return products.find(p => p.id === id)
    },

    async deleteProductById(id: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }

        return false
    },

    async createNewProduct(title: string): Promise<Product> {
        const newProduct: Product = {
            id: +new Date(),
            title
        }
        products.push(newProduct)
        return newProduct
    },

    async updateProductById(id: number, title: string): Promise<boolean> {
        const product = await this.getProductById(id)

        if (product && title) {
            product.title = title
            return true
        } else {
            return false
        }
    }
}