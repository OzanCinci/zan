export const reviewReducerUser = (state={success:false,loading:false,error:false},action)=>{
    switch(action.type){
        case "REVIEW_ADD_REQUEST":
            return {loading:true,error:null,success:null}
        case "REVIEW_ADD_SUCCESS":
            return {loading:false,error:null,success:true}
        case "REVIEW_ADD_FAIL":
            return {loading:false,error:action.payload,success:false}
        default:
            return state
    }
}