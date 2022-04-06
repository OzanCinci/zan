export const profileReducer = (state={currentUser:[]},action)=>{
    switch(action.type){
        case "LOAD_PROFILE":
            return {...state,currentUser:action.payload,error:null}
            case "FAIL_PROFILE":
                return {...state,currentUser:[],error:action.payload}
        default:
            return state
    }
}