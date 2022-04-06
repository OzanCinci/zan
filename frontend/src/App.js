import './App.css';

import {Container} from 'react-bootstrap'
import {BrowserRouter,HashRouter, Route, Routes} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductPage from './screens/ProductPage';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Users from './adminScreens/Users';
import EditUser from './adminScreens/EditUser';
import ProductsAdmin from './adminScreens/ProductsAdmin';
import EditProduct from './adminScreens/EditProduct';
import Orders from './adminScreens/Orders';
import OrderDetail from './adminScreens/OrderDetail';

function App() {

  return (
    <div className="App" style={{minWidth:'400px'}}>
        <HashRouter>
          <Header style={{minWidth:'465px'}}></Header>
        
          <div className='p-4'>
            <Container>
                <Routes>
                  <Route exact path="/" element={<HomeScreen/>}></Route>

                  <Route  path="/products/:id" element={<ProductPage/>}></Route>
                  <Route  path="/cart" element={<Cart/>}></Route>
                  <Route  path="/login" element={<Login/>}></Route>
                  <Route  path="/register" element={<Register/>}></Route>
                  <Route  path="/profile" element={<Profile/>}></Route>
                  <Route  path="/shipping" element={<Shipping/>}></Route>
                  <Route  path="/payment" element={<Payment/>}></Route>
                  <Route  path="/placeorder" element={<PlaceOrder/>}></Route>

                  
                  <Route  path="/admin/users" element={<Users/>}></Route>
                  <Route  path="/editUser/:pk" element={<EditUser/>}></Route>
                  <Route  path="/admin/products" element={<ProductsAdmin/>}></Route>
                  <Route  path="/admin/product/:pk" element={<EditProduct/>}></Route>
                  <Route  path="/admin/orders" element={<Orders/>}></Route>
                  <Route  path="/OrderDetail/:id" element={<OrderDetail/>}></Route>
                </Routes>
                <Footer></Footer>
              </Container>
          </div>

        </HashRouter>
      </div>
  );
}

export default App;
