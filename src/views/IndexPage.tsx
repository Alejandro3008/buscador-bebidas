import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
export default function IndexPage() {
    //* Extrae el arreglo con todas las bebidas seleccionadas
    const {drinks} = useAppStore()
    //*Funcion que verifica que el parametro drinks contenga informacion este se revisa cada que el parametro drinks cambia
    const hasDrinks = useMemo(() => drinks.drinks.length,[drinks])
    return (
        <>
            <h1 className="text-6xl font-extrabold">Recetas</h1>
            {hasDrinks ? (
                <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-4 my-10 gap-10">
                {drinks.drinks.map(drink => (
                    <DrinkCard key={drink.idDrink} drink={drink}/>
                ))}
                </div>
            ): (
                <p className="my-10 text-center text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas</p>
            )}
        </>
    )
}
