import { useAppStore } from "../stores/useAppStore"
import { DrinkType } from "../types"

type DrinkCardProps = {
    drink: DrinkType
}
export default function DrinkCard({drink}:DrinkCardProps) {
    const {selectRecipe} = useAppStore()
    return (
        <div className="border shadow-lg hover:scale-105">
            <div>
                <img src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`}/>
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg" onClick={() => selectRecipe(drink.idDrink)}>Ver Receta</button>
            </div>
        </div>
    )
}
