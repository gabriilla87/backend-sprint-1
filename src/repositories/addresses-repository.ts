const addresses = [{id: 1, value: "Vasilkovaja 1"}, {id: 2, value: 'Shkolnaja 4B'}]

export const addressesRepository = {
    getAllAddresses() {
        return addresses
    },

    getAddressById(id: number) {
       return addresses.find(p => p.id === id)
    }
}