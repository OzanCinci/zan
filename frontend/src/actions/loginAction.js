import axios from 'axios'


export const loginAction = (email,password)=>async(dispatch)=>{
    
        dispatch({type:'LOGIN_REQUEST'})

            let configObject = {
           "url": "/api/users/login/",
           "method": "post",
           "headers": {
                'Content-Type': 'application/json'
                },
            "data":{
                     "username": email,
                     "password": password,}
           
            }

        axios.request(configObject ).then((res) => {
            dispatch({type:'LOGIN_SUCCES',payload:res.data})
            localStorage.setItem("userInfo",JSON.stringify(res.data))
        }).catch(error=>{
            console.log("err",error)
            dispatch({type:'LOGIN_FAIL',
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message})
            })
}

export const logoutAction = ()=>(dispatch)=>{
    dispatch({type:"LOGOUT"})
}
