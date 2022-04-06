import axios from 'axios'

export const orderAction=({token,OrderItems,paymentMethod,taxPrice,shippingPrice,totalPrice,shippingAdress})=>async(dispatch)=>{
         dispatch({type:'ORDER_REQUEST'})

        let configObject = {
           "url": "/api/order/add/",
           "method": "post",
           "headers": {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            "data":{
                "OrderItems":OrderItems,
                "paymentMethod":paymentMethod,
                "taxPrice":taxPrice,
                "shippingPrice":shippingPrice,
                "totalPrice":totalPrice,
                "shippingAdress":shippingAdress,
                    }
            }

        axios.request(configObject ).then((res) => {
            dispatch({type:'ORDER_SUCCES',payload:res.data})
        }).catch(error=>{
            console.log("err",error)
            dispatch({type:'ORDER_FAIL',
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message})
            })
}

const url = '/api/getOrders/'
export const getOrdersAction=(token)=>async(dispatch)=>{
    dispatch({type:'GET_ORDER_REQUESTT'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'GET_ORDER_SUCCES',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'GET_ORDER_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}