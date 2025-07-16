import { Link, Route, Routes } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductDetails from './pages/productDetails'
import Cart from './pages/Cart'
import './App.css'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={ <ProductsList/> } />
      <Route path='/products/:pid' element={ <ProductDetails /> } />
      <Route path='/cart' element={ <Cart /> } />
    </Routes>
    </>
  )
}

export default App
