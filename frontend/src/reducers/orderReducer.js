export const orderReducer = (state={},action)=>{
    switch(action.type){
        case "ORDER_REQUEST":
            return {...state,loading:true}
        case "ORDER_SUCCES":
            return {...state,loading:false,error:false,order:action.payload}
        case "ORDER_FAIL":
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export const getOrderReducer = (state={orders:[]},action)=>{
    switch(action.type){
        case "GET_ORDER_REQUEST":
            return {loading:true,orders:state.orders}
        case "GET_ORDER_SUCCES":
            return {loading:false,error:false,orders:action.payload}
        case "GET_ORDER_FAIL":
            return {loading:false,error:action.payload,orders:state.orders}
        default:
            return state
    }
}

export const getOrderDetailAdmin = (state={order:[]},action)=>{
    switch(action.type){
        case "GET_ORDER_ADMIN_REQUEST":
            return {loading:true,order:state.order}
        case "GET_ORDER_ADMIN_SUCCES":
            return {loading:false,error:false,order:action.payload}
        case "GET_ORDER_ADMIN_FAIL":
            return {loading:false,error:action.payload,order:state.order}
        default:
            return state
    }
}