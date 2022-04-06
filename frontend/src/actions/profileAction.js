import axios from 'axios'
const url= "/api/users/profile/"

export const profileAction = (token)=> async(dispatch)=>{

    let configObject = {
   "url": url,
   "method": "get",
   "headers": {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }

axios.request(configObject ).then((res) => {
    dispatch({type:'LOAD_PROFILE',payload:res.data})
}).catch(error=>{
    console.log("err",error)
    dispatch({type:'FAIL_PROFILE',
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message})
    })
}