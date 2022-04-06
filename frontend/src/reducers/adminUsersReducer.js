export const adminUsersReducer = (state={Users:[],succes:false},action)=>{
    switch(action.type){
        case "ADMIN_USERS_REQUEST":
            return {...state,loading:true,Users:state.Users,succes:false}
        case "ADMIN_USERS_SUCCESS":
            return {...state,loading:false,error:false,Users:action.payload,succes:false}
        case "ADMIN_USERS_FAIL":
            return {...state,loading:false,error:action.payload,succes:false}
        case "ADMIN_USERS_DELETE":
            return {...state,loading:false,succes:true}
        default:
            return state
    }
}
export const adminUserReducer = (state={User:null,succes:false},action)=>{
    switch(action.type){
        case "ADMIN_USER_REQUEST":
            return {...state,loading:true,User:state.User,succes:false}
        case "ADMIN_USER_SUCCESS":
            return {...state,loading:false,error:false,User:action.payload,succes:true}
        case "ADMIN_USER_FAIL":
            return {...state,loading:false,error:action.payload,succes:false}
        case "ADMIN_UPDATE_SUCCESS":
            return {...state,loading:false,error:false,User:action.payload,succes:true}
        case "ADMIN_UPDATE_FAIL":
            return {...state,error:action.payload}
        default:
            return state
    }
}