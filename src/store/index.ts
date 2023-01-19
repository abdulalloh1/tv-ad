import { createStore } from "vuex";
import { cartModule } from "./modules/cartModule";
import { favoriteModule } from "./modules/favoriteModule";

export const store = createStore({
    modules: {
        cartModule,
        favoriteModule
    }
})