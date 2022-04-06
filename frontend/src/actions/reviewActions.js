import axios from 'axios'

export const AddReviewAction = (token,dataObj,id)=>async(dispatch)=>{
    dispatch({type:'REVIEW_ADD_REQUEST'})
    
    let configObject = {
    "url": `/api/product/addReview/${id}/`,
   "method": "post",
   "headers": {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    "data":dataObj
    }

axios.request(configObject ).then((res) => {
    dispatch({type:'REVIEW_ADD_SUCCESS'})
}).catch(error=>{
    dispatch({type:'REVIEW_ADD_FAIL',
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message})
    })
}