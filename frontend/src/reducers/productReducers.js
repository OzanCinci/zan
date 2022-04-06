import { 
    PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_SUCCES,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants" 


export const productListReducer = (state = {products: [],isUpdated:false},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}
        case PRODUCT_LIST_SUCCES:
            return {loading:false,products:action.payload.products,page:action.payload.page,pages:action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
        case "PRODUCT_DETAIL_UPDATED_BY_ADMIN":
            return {...state,isUpdated:true}
        default:
            return state
    }
}


export const productDetailsReducer = (state = {product: {reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading:true,products:[]}
        case PRODUCT_DETAIL_SUCCES:
            return {loading:false,products:action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}