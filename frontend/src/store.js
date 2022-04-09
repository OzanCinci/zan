import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { CartReducer,CartItemsReducer } from './reducers/cardReducer'
import { loginReducer } from './reducers/loginReducer'
import { registerReducer } from './reducers/registerReducer'
import { profileReducer } from './reducers/profileReducer'
import { getOrderDetailAdmin, getOrderReducer, orderReducer } from './reducers/orderReducer'
import {adminUserReducer, adminUsersReducer} from './reducers/adminUsersReducer.js'
import { createProductReducer, getProductAdminReducer } from './reducers/adminProductReeducer'
import { adminOrderReducer } from './reducers/adminOrderReducer'
import { reviewReducerUser } from './reducers/reviewReducer'


const reducer = combineReducers({
    productList: productListReducer,
    producDetail:productDetailsReducer,
    Cart:CartReducer,
    CartItems:CartItemsReducer,
    login:loginReducer,
    register:registerReducer,
    profile:profileReducer,
    orderCreate:orderReducer,
    getOrder:getOrderReducer,
    adminUsers:adminUsersReducer,
    adminUser:adminUserReducer,
    createProduct:createProductReducer,
    getProductAdmin:getProductAdminReducer,
    getOrdersAdmin:adminOrderReducer,
    getOrderDetailAdmin:getOrderDetailAdmin,
    reviewReducer:reviewReducerUser,
})




const getCardItemIDs = localStorage.getItem("itemIDs")?JSON.parse(localStorage.getItem("itemIDs")):[]
const getCardItemsArray = localStorage.getItem("CartItemsArray")?JSON.parse(localStorage.getItem("CartItemsArray")):[]
const getUserInfo = localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
const getAdress = localStorage.getItem("address")?JSON.parse(localStorage.getItem("address")):null
const getTotalCost = localStorage.getItem("TotalCost")?JSON.parse(localStorage.getItem("TotalCost")):0

const initialState = {
    login:{userInfo:getUserInfo},
    CartItems:{shippingAdress:getAdress,CartItemsArray:getCardItemsArray,TotalCost:getTotalCost},
    Cart:{itemIDs:getCardItemIDs},
}

const middleware = [thunk]

const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store