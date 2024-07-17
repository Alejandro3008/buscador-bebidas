import { lazy, Suspense } from "react"
import { BrowserRouter,Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
//* Evita que se decarguen todas las paginas cuando se carga la principal, se iran deacargando conforme se vaya abriendo.
const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritesPage = lazy(() => import("./layouts/FavoritesPage"))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                //*Aqui es donde se almacenan todas las rutas hacia las paginas.
                //*El element que se carga es el que siempre va a aparecer en todas las paginas (Ej. Header,Footer,etc)
                <Route element={<Layout/>}>
                    //*Dentro del suspense se carga el element que se va a descargar cuando se entra a esa url
                    <Route path="/" element={
                        <Suspense fallback="Cargando...">
                            <IndexPage/>
                        </Suspense>
                    } index/>
                    <Route path="/favorites" element={
                        <Suspense fallback='Cargando...'>
                            <FavoritesPage/>
                        </Suspense>
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
