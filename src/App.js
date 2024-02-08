import logo from './logo.svg';
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SingleItem from './Pages/SingleItem';
import Category from './Pages/Category';
import Checkout from './Pages/Checkout';
import Checkin from './Pages/Checkin';
import Product from './Pages/Item';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Item from './Pages/Item';
import ProtectedRoutes from './Utils/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element ={<ProtectedRoutes/>}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleItem />} />
          <Route path='/update_products/:id' element={<Item />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkin" element={<Checkin />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
