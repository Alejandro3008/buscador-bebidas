import {z} from 'zod'

//*Se declaran todos las esquemas para los types que se van a usar
export const CategoriesAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})

export const SearchRecipeSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

//* Se crea un esquema para solo una bebida
export const recipeSchema = z.object({
    idDrink:z.string(),
    strDrink:z.string(),
    strDrinkThumb:z.string()
})

//* Se añade el esquema de una sola bebida al arreglo, declarando que drinks va a ser un arreglo de objetos del tipo recipeSchema 
export const recipesSchema = z.object({
    drinks: z.array(recipeSchema)
})

//*Usando nullable podemos definir que puede o no puede existir informacion sobre ese punto.
export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
});