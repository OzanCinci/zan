import axios from 'axios'
import { 
    PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAIL_SUCCES,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
} from "../constants/productConstants" 


export const listProducts = (q,pageNumber) =>async(dispatch)=> {
    dispatch({type:PRODUCT_LIST_REQUEST})
    console.log("burraaaa : ",pageNumber)
    if (!pageNumber){
        pageNumber=1
    }

    let configObject = {
        "url": '/api/products/',
        "method": "put",
        "headers": {
            'Content-Type': 'application/json'
        },
        "data":{
            'query':q,
            'pageNumber':pageNumber,
        }
    }
    console.log("asdasd: ",configObject.data)
    
     axios.request(configObject ).then((res) => {
        dispatch({type:PRODUCT_LIST_SUCCES,payload:res.data})
     }).catch(error=>{
         dispatch({type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message})
         })
}

export const  listProductDetails = (id) =>async(dispatch)=> {
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({type:PRODUCT_DETAIL_SUCCES,payload:data})

    } catch(error){
        dispatch({type:PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message})
    }
}