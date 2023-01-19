export const favoriteModule = {
    state: () => ({
        favorite: JSON.parse(localStorage.getItem('favorite')) || []
    }),
    mutations: {
        addRemoveToFavorite(state, id: string) {
            if(state.favorite.includes(id)) {
                const idIndex = state.favorite.findIndex((item: string) => item === id)
                state.favorite.splice(idIndex, 1)
            }
            else {
                state.favorite.push(id)
            }

            localStorage.setItem('favorite', JSON.stringify(state.favorite))
        }
    }
}