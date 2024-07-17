import { create } from "zustand";
import { RecipiesSliceType, createRecipeSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoriteSlice";
import {createNotifiactionsSlice, NotifiactionsSliceType} from "./notificationsSlice"

//* Se crea el store principal que es donde vamos a llamar a los demas stores.
export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotifiactionsSliceType >((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotifiactionsSlice(...a),
}))