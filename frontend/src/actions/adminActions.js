import axios from 'axios'

const url = '/api/users/'
export const adminUsersAction=(token)=>async(dispatch)=>{
    dispatch({type:'ADMIN_USERS_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'ADMIN_USERS_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'ADMIN_USERS_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const deleteUser=(token,id)=>async(dispatch)=>{
    const url2 = `/api/users/delete/${id}/`
    dispatch({type:'ADMIN_USERS_REQUEST'})

    let configObject = {
        "url": url2,
        "method": "delete",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then(() => {
         dispatch({type:'ADMIN_USERS_DELETE'})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'ADMIN_USERS_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}


export const adminUserAction=(token,pk)=>async(dispatch)=>{
    const url = `/api/users/detail/${pk}/`
    dispatch({type:'ADMIN_USER_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'ADMIN_USER_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'ADMIN_USER_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const adminUpdateUserAction=(token,pk,dataObj)=>async(dispatch)=>{
    const url = `/api/users/update/${pk}/`
    dispatch({type:'ADMIN_USER_REQUEST'})

    let configObject = {
        "url": url,
        "method": "put",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             },
        "data":dataObj
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'ADMIN_UPDATE_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'ADMIN_USER_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const deleteProduct=(token,id)=>async(dispatch)=>{
    const url = `/api/products/delete/${id}/`
    let configObject = {
        "url": url,
        "method": "delete",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then(() => {}).catch(error=>{console.log("err",error)})
}

export const createAdminProduct=(token)=>async(dispatch)=>{
    const url = `/api/products/create/`
    dispatch({type:'CREATE_PRODUCT_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'CREATE_PRODUCT_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'CREATE_PRODUCT_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const getProductAdminAction=(token,pk)=>async(dispatch)=>{
    const url = `/api/products/admin/${pk}/`
    
    
    dispatch({type:'GET_PRODUCT_DETAIL_ADMIN_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'GET_PRODUCT_DETAIL_ADMIN_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'GET_PRODUCT_DETAIL_ADMIN_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const adminUpdateProductAction=(token,pk,dataObj)=>async(dispatch)=>{
    const url = `/api/products/update/${pk}/`
    let configObject = {
        "url": url,
        "method": "put",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             },
        "data":dataObj
         }
     axios.request(configObject ).then((res) => {}).catch(error=>{console.log("err",error)})
}

export const getOrdersAdminAction=(token)=>async(dispatch)=>{
    const url = `/api/orders/admin/all/`
    
    
    dispatch({type:'GET_ORDERS_ADMIN_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'GET_ORDERS_ADMIN_SUCCESS',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'GET_ORDERS_ADMIN_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}

export const getOrderDetailAdminAction=(token,pk)=>async(dispatch)=>{
    const url = `/api/order/getOrderDetailByID/${pk}/`
    
    
    dispatch({type:'GET_ORDER_ADMIN_REQUEST'})

    let configObject = {
        "url": url,
        "method": "get",
        "headers": {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
             }
         }
     
     axios.request(configObject ).then((res) => {
         dispatch({type:'GET_ORDER_ADMIN_SUCCES',payload:res.data})
     }).catch(error=>{
         console.log("err",error)
         dispatch({type:'GET_ORDER_ADMIN_FAIL',
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message})
         })
}