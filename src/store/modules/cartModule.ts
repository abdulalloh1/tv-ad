export const cartModule = {
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart')) || []
    }),
    mutations: {
        toggleCart(state, id: string) {
            if(state.cart.includes(id)) {
                const idIndex = state.cart.findIndex((item: string) => item === id)
                state.cart.splice(idIndex, 1)
            }
            else {
                state.cart.push(id)
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    }
}