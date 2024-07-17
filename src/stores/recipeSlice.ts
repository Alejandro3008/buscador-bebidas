/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from "zustand"
import { getCategories, getRecipeByID, getRecipes } from "../services/RecipiesServices"
import type { Categories, DrinkType, DrinksType, RecipeType, SearchRecipe } from "../types"

//* Se declaran los types de los parametros y funciones de este store. Para ello se importan los types declarados en types/index.ts
export type RecipiesSliceType = {
    categories: Categories
    drinks: DrinksType
    drinkRecipe: RecipeType
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchRecipe: SearchRecipe) => Promise<void>
    selectRecipe: (id:DrinkType['idDrink']) => Promise<void>
    closeModal: () => void
}

//* Se crea el store y se le asigna el type que fue declarado arriba
export const createRecipeSlice: StateCreator<RecipiesSliceType> = (set) => ({
    //*Se inicializan todos los parametros en base a los types.
    categories:{drinks:[]},
    drinks:{drinks:[]},
    drinkRecipe: {} as RecipeType, //* Este type es grande por eso se usa "as", no es recomdable usarlo ya que la variable queda vacia.
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set(()=> ({
            categories //* Al llamarse igual el parametro y la variable con la respuesta no es necesario usar "categories:categories"
        }))
    },
    searchRecipes: async (searchRecipe) => {
        const recipes = await getRecipes(searchRecipe)
        set(() => ({
            drinks: recipes
        }))
    },
    selectRecipe: async (id) => {
        const recipe = await getRecipeByID(id)
        set(() => ({
            drinkRecipe: recipe,
            modal:true
        }))
    },
    closeModal: () => {
        set(() => ({
            modal: false,
            drinkRecipe: {} as RecipeType
        })) 
    }
})