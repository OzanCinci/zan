export const createProductReducer = (state={createdProduct:null,loading:false,error:false,success:null},action) =>{
    switch(action.type){
        case "CREATE_PRODUCT_REQUEST":
            return {createdProduct:null,loading:true,error:false,success:null}
        case "CREATE_PRODUCT_SUCCESS":
            return {createdProduct:action.payload,loading:false,error:false,success:true}
        case "CREATE_PRODUCT_FAIL":
            return {createdProduct:null,loading:false,error:action.payload,success:false}
        case "CREATE_PRODUCT_RESET":
            return {createdProduct:null,loading:false,error:false,success:false}
        default:
            return state
    }
}

export const getProductAdminReducer = (state={product:null,loading:false,error:false},action) =>{
    switch(action.type){
        case "GET_PRODUCT_DETAIL_ADMIN_REQUEST":
            return {product:null,loading:true,error:null}
        case "GET_PRODUCT_DETAIL_ADMIN_SUCCESS":
            return {product:action.payload,loading:false,error:null}
        case "GET_PRODUCT_DETAIL_ADMIN_FAIL":
            return {product:null,loading:false,error:action.payload}
        default:
            return state
    }
}