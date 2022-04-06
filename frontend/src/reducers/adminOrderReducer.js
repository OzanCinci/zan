export const adminOrderReducer = (state={orders:[]},action)=>{
    switch(action.type){
        case "GET_ORDERS_ADMIN_REQUEST":
            return {...state,loading:true,error:null}
        case "GET_ORDERS_ADMIN_SUCCESS":
            return {...state,orders:action.payload,loading:false,error:null}
        case "GET_ORDERS_ADMIN_FAIL":
            return {...state,orders:[],loading:false,error:action.payload}
        default:
            return state
    }
}