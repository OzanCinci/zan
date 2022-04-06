export const loginReducer = (state={userInfo:null,loading:false,error:null},action) => {
    switch(action.type){
        case "LOGIN_REQUEST":
            return {...state,loading:true,error:null}
        case "LOGIN_SUCCES":
            return {...state,loading:false,error:null,userInfo:action.payload}
        case "LOGIN_FAIL":
            return {...state,loading:false,error:action.payload,userInfo:null}
        case "LOGOUT":
            return {...state,loading:false,error:null,userInfo:null}
        default:
            return state
    }
}