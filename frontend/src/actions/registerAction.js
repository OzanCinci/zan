import axios from 'axios'

export const registerAction=(name,email,password)=>async(dispatch)=>{
         dispatch({type:'REGISTER_REQUEST'})

            let configObject = {
           "url": "/api/users/register/",
           "method": "post",
           "headers": {
                'Content-Type': 'application/json'
                },
            "data":{
                    "name":name,
                    "email": email,
                    "password": password,}
            }

        axios.request(configObject ).then((res) => {
            dispatch({type:'REGISTER_SUCCES',payload:res.data})
        }).catch(error=>{
            dispatch({type:'REGISTER_FAIL',
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message})
            })
}