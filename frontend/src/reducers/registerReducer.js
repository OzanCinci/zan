export const registerReducer = (state={registerInfo:[],loading:false,error:null},action)=>{
    switch(action.type){
        case "REGISTER_REQUEST":
            return {...state,loading:true,error:null}
        case "REGISTER_SUCCES":
            return {...state,loading:false,error:null,userInfo:action.payload}
        case "REGISTER_FAIL":
            return {...state,loading:false,error:action.payload,userInfo:null}
        default:
            return state
    }
}