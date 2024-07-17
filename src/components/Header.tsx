import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const initialState = {
    ingredient: '',
    category: ''
}

export default function Header() {
    const [search,setSearch] = useState(initialState)
    const location = useLocation()
    const isHome = useMemo(() => location.pathname === '/',[location.pathname])
    const {categories,fetchCategories,searchRecipes,showNotification} =useAppStore()
    useEffect(() =>{
        fetchCategories()
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,[e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            showNotification({text: 'Todos los campos deben ser llenados', error: true})
            return
        }
        searchRecipes(search)
        setSearch(initialState)

    }
    return (
        <header className="bg-slate-800">
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="">
                        <img className="w-28" src="/cocktail.png" alt="Logo"/>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to='/' className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                        <NavLink to='/favorites' className={({isActive}) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="bold text-white uppercase font-extrabold text-lg">Nombre o Ingredientes</label>
                            <input id="ingredient" type="text" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none" placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila" value={search.ingredient} onChange={handleChange}/>
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="category" className="bold text-white uppercase font-extrabold text-lg">Categoria</label>
                            <select id="category" name="category" className="p-3 w-full rounded-lg focus:outline-none" value={search.category} onChange={handleChange}>
                                <option value=''>--- Seleccione ---</option>
                                {categories.drinks.map((item) => (
                                    <option key={item.strCategory} value={item.strCategory}>{item.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input type="submit" value='Buscar Receta' className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"></input>
                    </form>
                )}
            </div>
        </header>
    )
}
