export interface Product {
    "id": string,
    "name": string,
    "code": string,
    "price": {
        "old_price": number,
        "current_price": number
    },
    "image": {
        "url": string
    },
    "material": number
}