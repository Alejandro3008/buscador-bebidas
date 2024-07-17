import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"
//* Pagina para mostrar las bebidas favortidas
export default function FavoritesPage() {
    //* Al estar todos los stores dentro de uno principal solo es necesario llamar al principal para acceder a todos los estados y funciones.
    const {favorites} = useAppStore()
    const hasFavorites = useMemo(() => favorites.length,[favorites])
    return (
        <>
            <h1 className="text-6xl font-extrabold">Favoritos</h1>
            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-4 my-10 gap-10">
                    {favorites.map(drink => (
                        <DrinkCard key={drink.idDrink} drink={drink}/>
                    ))}
                </div>
            ): (
                <p className="my-10 text-center text-2xl font-bold">Los Favoritos se mostraran aqui.</p>
            )}
        </>
    )
}
