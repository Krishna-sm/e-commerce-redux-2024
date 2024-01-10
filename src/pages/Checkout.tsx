import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementReducder, deleteItemReducer, incrementReducer } from '../redux/slice/Cart.slice'
import { toast } from 'react-toastify'

const Checkout = () => {
  const state = useSelector((store:any)=>store.cartSlice.cart)
  const [price,setPrice] = useState(0)
   useEffect(()=>{
    
          if(state.length>0){
            let totalPrice = 0  
            state.forEach((cur:any)=>{
                totalPrice += cur.price*cur.qty
              })
            setPrice(totalPrice)
          }
          else{
            setPrice(0)
          }
          
  },[state])
  const dispatch = useDispatch()

  const incrementhandler = (id:number)=>{
    try {
      // toast.success("incrment"+id)
      dispatch(incrementReducer(id));
      toast.success("Item Quantity increased")
    } catch (error:any) {
      toast.error(error.message)
    }
  }
  const decrementhandler = (id:number)=>{
     try {
          // toast.success("incrment"+id)
      dispatch(decrementReducder(id));
      toast.success("Item Reduced")
    } catch (error:any) {
      toast.error(error.message)
    }
  }
  const deletehandler = (id:number)=>{
     try {
      dispatch(deleteItemReducer(id));
      toast.success("Item Deleted")

    } catch (error:any) {
      toast.error(error.message)
    }
  }
  return (
    <>    
        <div className="bg-gray-100 h-screen py-8">
  <div className="container mx-auto px-4">
    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-semibold">Product</th>
                <th className="text-left font-semibold">Price</th>
                <th className="text-left font-semibold">Quantity</th>
                <th className="text-left font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
             {
                    state.map((cur:any,i)=>{
                      return  <tr key={i}>
                <td className="py-4">
                  <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={cur.image} alt="Product image" />
                    <span className="font-semibold">{cur.title}</span>
                  </div>
                </td>
                <td className="py-4">${cur.price}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <button onClick={()=>decrementhandler(cur.id)} className="border rounded-md py-2 px-4 mr-2">-</button>
                    <span className="text-center w-8">{cur.qty}</span>
                    <button  onClick={()=>incrementhandler(cur.id)} className="border rounded-md py-2 px-4 ml-2">+</button>
                  </div>
                </td>
                <td className="py-4">${cur.price*cur.qty}</td>
              </tr>
                    })
             }
              {/* More product rows */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>$1.99</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${price}</span>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</div>

    
          </>
  )
}

export default Checkout