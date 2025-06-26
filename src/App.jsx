import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import Contact from './components/Contact/Contact'
import NotFound from './components/NotFound/NotFound'
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer'

function App() {

    return (
        
        <CartProvider>
            <NavBar />
            <Routes>
                {/* Paging de inicio */}
                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* Todos los productos */}
                <Route
                    path="/products"
                    element={<ItemListContainer greeting={"Explora todos nuestros productos"} />}
                />

                {/* Filtro por categoría */}
                <Route
                    path="/category/:categoryId"
                    element={<ItemListContainer greeting={"Productos filtrados por categoría"} />}
                />

                {/* Detalle de producto */}
                <Route
                    path="/item/:id"
                    element={<ItemDetailContainer />}
                />

                {/* Carrito */}
                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* Checkout */}
                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                {/* Contacto */}
                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </CartProvider>
    )
}

export default App
