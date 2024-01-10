import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus,CiCircleMinus  } from "react-icons/ci";
import { toast } from 'react-toastify';
import { decrementReducder, deleteItemReducer, incrementReducer } from '../../redux/slice/Cart.slice';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
const Sidebar = ({state:{isSIdebarOpen,setIsSIdebar}}:any) => {

  const [price,setPrice] = useState(0)

  
 const state = useSelector((store:any)=>store.cartSlice.cart)


 const CartCard = ({c})=>{

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




  return <div  className="w-full px-4 border border-white flex justify-between gap-x-2 py-3 items-center">
              <img src={c.image} alt="" className='w-24 rounded-full' />
            <div className="items">
              <h1 className='text-xl text-white font-semibold'>{c.title}</h1>
                  <div className="flex text-3xl items-center gap-x-3 mx-auto text-white cursor-pointer">
            <CiCirclePlus onClick={()=>incrementhandler(c.id)} />
            <h1>{c.qty}</h1>
            <CiCircleMinus onClick={()=>decrementhandler(c.id)}  />
                  </div>
            </div>
            <div className="icon">
          <FaRegTrashCan onClick={()=>deletehandler(c.id)} className="text-2xl text-white cursor-pointer" />
            </div>

                    </div>
 }


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
  return (
    <>
            <div className={` ${isSIdebarOpen?'-translate-x-0':'translate-x-[100%]'} transition-all top-0 duration-500 fixed h-screen w-full md:w-1/3 bg-indigo-500 right-0 z-[10]`}>
                <div className="py-4 mx-10 flex justify-between items-center">
                    <h1 className='font-semibold text-white text-2xl'>My Cart</h1>
            <IoIosCloseCircleOutline onClick={(()=>setIsSIdebar(!isSIdebarOpen))} className="text-4xl text-white" />
                </div>
                   {
                state.length<1 && <div className='text-white w-full flex justify-center flex-col'>

                      <AiOutlineShoppingCart className="text-9xl mx-auto"/>
                      <h1 className="mx-auto">Empty Cart !!</h1>
                </div>
              }

              <div id='cart-div' className="h-[60%] overflow-y-auto w-full">

                    {
                     state && state.length>0 && state.map((c,i)=>{
                        return  <CartCard key={i} c={c} />
                      })
                    }

              </div>

           

             {state.length>0 && <div className="my-3 px-3 mx-5 gap-y-5 flex flex-col">
                        <h1 className='text-4xl text-white'>Total Price: &#8377; {price}/-</h1>
                        <Link to={'/checkout'} className="w-full  text-center bg-indigo-700 py-3 text-white">Checkout</Link>
              </div>}

            </div>
    </>
  )
}

export default Sidebar