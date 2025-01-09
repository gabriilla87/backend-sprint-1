type Product = {
    id: number
    title: string
}

const products: Product[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProductsByTitle(partOfTitle: string | null) {
        if (partOfTitle) {
            return products.filter(p => p.title.indexOf(partOfTitle) > -1)
        } else {
            return products
        }
    },

    getProductById(id: number) {
        return products.find(p => p.id === id)
    },

    deleteProductById(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }

        return false
    },

    createNewProduct(title: string) {
        const newProduct: Product = {
            id: +new Date(),
            title
        }
        products.push(newProduct)
        return newProduct
    },

    updateProductById(id: number, title: string) {
        const product = this.getProductById(id)

        if (product && title) {
            product.title = title
            return true
        } else {
            return false
        }
    }
}