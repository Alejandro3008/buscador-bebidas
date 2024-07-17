import {z} from 'zod'
import { CategoriesAPIResponseSchema, RecipeAPIResponseSchema, SearchRecipeSchema, recipeSchema, recipesSchema } from '../utils/recipies-schema'

//* Se crean todos los types en base a los esquemas declaros en utils/recipies-schema.ts
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchRecipe = z.infer<typeof SearchRecipeSchema>
export type DrinksType = z.infer<typeof recipesSchema>
export type DrinkType = z.infer<typeof recipeSchema>
export type RecipeType = z.infer<typeof RecipeAPIResponseSchema>