import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        cart: JSON.parse(localStorage.getItem("cart") as string) || []
    },
    reducers:{      

        addToCart:(state,action)=>{
            const exist = state.cart.find((cur:any)=>cur.id === action.payload.id);

            
                
            if(exist){
                   const newArray = state.cart.map((cur:any)=>{
                    if(cur.id === action.payload.id){
                        cur.qty= cur.qty+1
                    }
                    return cur
                   })    
                   
                   state.cart = newArray;
                   localStorage.setItem("cart",JSON.stringify(newArray))
                   return 
            }


            // cart me item nhi hai

             state.cart = [...state.cart,action.payload];
                   localStorage.setItem("cart",JSON.stringify(state.cart))

        },
        incrementReducer:(state,action)=>{
              const newArray = state.cart.map((cur:any)=>{
                    if(cur.id === action.payload){
                        cur.qty= cur.qty+1
                    }
                    return cur
                   })    
                   
                   state.cart = newArray;
                   localStorage.setItem("cart",JSON.stringify(newArray))
                   return 
        },
        decrementReducder:(state,action)=>{

            const exist = state.cart.find((cur:any)=>cur.id === action.payload);
                    
                        
            
                
            if(exist){
                        // console.log(exist);
                        
                        const copy = JSON.parse(JSON.stringify(exist))
                            

                    if(  copy.qty ===1){
                        
                   const newArray = state.cart.filter((cur:any)=>cur.id !==action.payload)    
                   
                   state.cart = newArray;
                   localStorage.setItem("cart",JSON.stringify(newArray))
                   return 
                    }

                   const newArray = state.cart.map((cur:any)=>{
                    if(cur.id === action.payload){
                        cur.qty= cur.qty-1
                    }
                    return cur
                   })    
                   
                   state.cart = newArray;
                   localStorage.setItem("cart",JSON.stringify(newArray))
                   return 
            }

            
        },
        deleteItemReducer:(state,action)=>{

          const newArray = state.cart.filter((cur:any)=>cur.id !==action.payload)    
                   
                   state.cart = newArray;
                   localStorage.setItem("cart",JSON.stringify(newArray))
                   return 

            
        }
    }
})

export const {addToCart,incrementReducer,decrementReducder,deleteItemReducer} = CartSlice.actions