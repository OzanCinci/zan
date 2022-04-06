export const CartReducer = (state={},action) =>{
    switch(action.type){
        case "ADD":
            for(let i=0;i<state.itemIDs.length;i++){
                if (state.itemIDs[i].id==action.payload.productID){
                    let result = {...state}
                    result.itemIDs[i].amount+=action.payload.amount
                    localStorage.setItem("itemIDs",JSON.stringify(result.itemIDs))
                    return result
                }
            }
            let result = {...state}
            result.itemIDs.push({id:action.payload.productID,amount:action.payload.amount})
            localStorage.setItem("itemIDs",JSON.stringify(result.itemIDs))
            return result
        case "DELETE":
            let result2 = {itemIDs:state.itemIDs.filter(item=>item.id!=action.payload)}
            localStorage.setItem("itemIDs",JSON.stringify(result2.itemIDs))
            return result2
        case "UPDATE+":
            let newItems = state.itemIDs.map(item=>{
                if (item.id==action.payload){
                    item.amount+=1
                    return item
                } else {
                    return item
                }
            })
            localStorage.setItem("itemIDs",JSON.stringify(newItems))
            return {itemIDs:newItems}
        case "UPDATE-":
            let new2Items = state.itemIDs.map(item=>{
                if (item.id==action.payload){
                    item.amount-=1
                    return item
                } else {
                    return item
                }
            })
            localStorage.setItem("itemIDs",JSON.stringify(new2Items))
            return {itemIDs:new2Items}
        case "RESET_ID":
            localStorage.removeItem("itemIDs")
            return {itemIDs:[]}
        default:
            return {...state}
    }
}
export const CartItemsReducer = (state={CartItemsArray:[],shippingAdress:{},paymentMethod:null,TotalCost:0,error:null,loading:false},action)=>{
    let result = null
    switch(action.type){
        case 'LOADING':
            return {...state,error:null,loading:true}
        case 'SUCCES':
            result = {...state,CartItemsArray:action.payload,error:null,loading:false,TotalCost:state.TotalCost}
            localStorage.setItem("CartItemsArray",JSON.stringify(result.CartItemsArray))
            return result
        case 'ERROR':
            result = {...state,error:action.payload,loading:false,TotalCost:state.TotalCost}
            return result
        case "DEC":
            let newCartItemsArray = state.CartItemsArray.map(item=>{
                if ( item._id==action.payload ){
                    let newItem = item
                    newItem.amount-=1
                    state.TotalCost-=item.price
                    return newItem
                }
                else{
                    return item
                }
            })
            result = {...state,CartItemsArray:newCartItemsArray,error:null,loading:false,TotalCost:state.TotalCost}
            localStorage.setItem("CartItemsArray",JSON.stringify(result.CartItemsArray))
            return result
        case "INC":
            let new2CartItemsArray = state.CartItemsArray.map(item=>{
                if ( item._id==action.payload ){
                    let newItem = item
                    newItem.amount+=1
                    state.TotalCost+=item.price
                    return newItem
                }
                else{
                    return item
                }
            })
            result = {...state,CartItemsArray:new2CartItemsArray,error:null,loading:false,TotalCost:state.TotalCost}
            localStorage.setItem("CartItemsArray",JSON.stringify(result.CartItemsArray))
            return result
        case "DEL":
            result = {...state,CartItemsArray:state.CartItemsArray.filter(item=>item._id!=action.payload) ,error:null,loading:false,TotalCost:state.TotalCost}
            localStorage.setItem("CartItemsArray",JSON.stringify(result.CartItemsArray))
            return result
        case "ADDRESS":
            result = {...state,shippingAdress:action.payload,CartItemsArray:state.CartItemsArray,TotalCost:state.TotalCost}
            return result
        case "PaymentMethod":
            result = {...state,shippingAdress:state.shippingAdress,CartItemsArray:state.CartItemsArray,paymentMethod:action.payload,TotalCost:state.TotalCost}
            return result
        case "COST":
            result = {...state,TotalCost:action.payload}
            localStorage.setItem("TotalCost",JSON.stringify(result.TotalCost))
            return result
        case "RESET_CART_ITEMS":
            localStorage.removeItem("CartItemsArray")
            localStorage.removeItem("TotalCost")

            return {CartItemsArray:[],shippingAdress:state.shippingAdress,paymentMethod:state.paymentMethod,TotalCost:0,error:null,loading:false}
        default:
            return {...state}
    }
}