import axios from 'axios'
export const getCartItems = (array)=>async(dispatch)=>{
    try{
        let result = []
        dispatch({type:'LOADING'})
        const { data } = await axios.get('/api/products')
        console.log("karta eklerken: no1 ")
        array.forEach((item)=>{
            console.log("karta eklerken: no2 ")
            data.forEach(datum=>{
                console.log("karta eklerken: no3 ")
                if (item.id==datum._id){
                    result = [...result,{...datum,amount:item.amount}]
                    console.log("karta eklerken: no err ")

                }
            })
        })
        dispatch({type:'SUCCES',payload:result})

    }catch(err){
        console.log("karta eklerken: ",err)
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