import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const ProductApi = createApi({
    reducerPath:'ProductAPi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1' }),
    endpoints:(builder)=>({
    getProducts: builder.query({
      query: () => `products`,
    }),
     getProductBySlug: builder.query({
      query: (id:number) => `products/${id}`,
    })
    })
})

export const {useGetProductsQuery,useGetProductBySlugQuery} = ProductApi