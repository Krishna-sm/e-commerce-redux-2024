import { Link } from 'react-router-dom'
import { useGetProductsQuery } from '../redux/queries/ProductApi'

const ProductCard = ({image,title,category,price,id}:{image:string,title:string,category:string,price:number,id:number})=>{
  return  <Link to={`/product/${id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image} />
        </a>
        <div className="mt-4 flex justify-between items-center">
          <div className="">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{title}</h2>
          <p className="mt-1">&#8377;{price}</p>
          </div>
          <div className="">
            <button className="py-2 px-5 bg-indigo-500 rounded-lg text-white">Cart</button>
          </div>
        </div>
      </Link>
}

const Home = () => {

  const {data,isLoading,isError } = useGetProductsQuery({})


  if(isLoading){
    return<div>loading....</div>
  }

  

  if(isError){
    return<div>Something went wrong</div>
  }
  return (
    <>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
     
        {
         data.length>1 && data.map((c:any,i:number)=>{
               return <ProductCard  title={c.title}  image={c.images[0]} price={c.price}  category={c.category.name} key={i} id={c.id} />
          }) 
        }
  
    </div>
  </div>
</section>

    </>
  )
}

export default Home