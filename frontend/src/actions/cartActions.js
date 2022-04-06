import axios from 'axios'
export const getCartItems = (array)=>async(dispatch)=>{
    try{
        let result = []
        dispatch({type:'LOADING'})
        const { data } = await axios.get('/api/products')
        array.forEach((item)=>{
            data.forEach(datum=>{
                if (item.id==datum._id){
                    result = [...result,{...datum,amount:item.amount}]

                }
            })
        })
        dispatch({type:'SUCCES',payload:result})

    }catch(err){
        dispatch({type:'ERROR',payload:err})
    }
}

export const handleINCactions = (item)=>(dispatch)=>{
    dispatch({type:"INC",payload:item._id})
    dispatch({type:"UPDATE+",payload:item._id})
}
export const handleDECactions = (item)=>(dispatch)=>{
    dispatch({type:"DEC",payload:item._id})
    dispatch({type:"UPDATE-",payload:item._id})
}
export const handleDeleteactions = (item) => (dispatch)=>{
    dispatch({type:"DELETE",payload:item._id})
    dispatch({type:"DEL",payload:item._id})
}
export const saveAdress = (adressObj)=>(dispatch)=>{
    dispatch({type:"ADDRESS",payload:adressObj})
    localStorage.setItem("address",JSON.stringify(adressObj))
}