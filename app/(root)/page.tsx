
import React from 'react'
// import sampleData from '@/db/sample-data'
import { getLatestProduct } from '@/lib/actions/product.actions'
import ProductList from '@/components/shared/header/product/product-list'
 async function  Homepage() {
  const latestProduct = await getLatestProduct()
  return (
    <>
    <ProductList data={latestProduct} title='Newest Arrival' limit ={4}/>
    
    </>
  )
}

export default Homepage