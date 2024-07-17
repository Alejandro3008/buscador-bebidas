import axios from "axios";
import { CategoriesAPIResponseSchema, RecipeAPIResponseSchema, recipesSchema } from "../utils/recipies-schema";
import { DrinkType, SearchRecipe } from "../types";

//* Dentro de este archivo estan todas las llamadas al API
export async function getCategories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success){
        return result.data
    }
} 

export async function getRecipes(searchRecipes:SearchRecipe) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchRecipes.category}&i=${searchRecipes.ingredient}`
    const {data} = await axios(url)
    const result = recipesSchema.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getRecipeByID(id: DrinkType['idDrink']){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success){
        return result.data
    }
}