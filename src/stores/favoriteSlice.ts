import {StateCreator} from 'zustand'
import { RecipeType } from '../types'
import { NotifiactionsSliceType, createNotifiactionsSlice } from './notificationsSlice'

//* Se declaran los types de los parametros y funciones de este store. Para ello se importan los types declarados en types/index.ts
export type FavoritesSliceType = {
    favorites: RecipeType[]
    handleFavorite: (recipe:RecipeType) => void
    favoriteExist: (id:RecipeType['idDrink']) => boolean
    loadFromStorage: () => void
}

//* Se crea el store y se le asigna el type que fue declarado arriba
//* Para este store vamos a usar funciones de otro store por eso cambia la sinxtaxis, se agrega el type del otro store y dos arreglos vacios y por ultimo se cierra con el type para este store
//* Tambien es necesario añadir las 3 funciones (set,get,api)
export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotifiactionsSliceType, [], [], FavoritesSliceType> = (set,get,api) => ({
    //*Se inicializan todos los parametros en base a los types.
    favorites:[],
    handleFavorite: (recipe) => {
        //* Con la funcion some puedes compara la informacion que buscas dentro de un arreglo, retorna un boolean
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            set((state) => ({
                //* Se usa la funcion filter para obtener todos los que no coincidan con el id.
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            //* Se llama la funcion de otro store
            createNotifiactionsSlice(set, get, api).showNotification({text: 'Se elimino de favoritos', error:false})
        }else{
            set((state) => ({
                favorites: [...state.favorites,recipe]
            }))
            createNotifiactionsSlice(set, get, api).showNotification({text: 'Se agrego a favoritos', error:false})
        }
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    //* Funcion para buscar en el local storage informacion y añadirla al estado.
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set(() => ({
                favorites: JSON.parse(storedFavorites)
            }))
        }
    }
})