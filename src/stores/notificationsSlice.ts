import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoriteSlice";

//* Este type lo pude haber creado en el archivo de types y despues importarlo pero al solo usarlo aqui no le vi sentido
type Notification = {
    text: string
    error: boolean
    show: boolean
}

//* Se declaran los types de los parametros y funciones de este store. Para ello se importan los types declarados en types/index.ts
export type NotifiactionsSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification,'text' | 'error'>) => void
    hiddeNotification: () => void
}

//* Se crea el store y se le asigna el type que fue declarado arriba
//* Para este store vamos a usar funciones en otro store por eso cambia la sinxtaxis, se agrega el type del otro store y dos arreglos vacios y por ultimo se cierra con el type para este store
//* Tambien es necesario añadir las 3 funciones (set,get,api)
export const createNotifiactionsSlice: StateCreator<NotifiactionsSliceType & FavoritesSliceType , [], [], NotifiactionsSliceType> = (set,get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        //* Con set timeout establecemos un temporizador para desaparecer la notifiacion
        setTimeout(() => {
            get().hiddeNotification()
        },3000)
    },
    hiddeNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})