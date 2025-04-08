
import React from 'react'
// import sampleData from '@/db/sample-data'
import { getLatestProduct, getFeaturedProducts } from '@/lib/actions/product.actions'
import ProductList from '@/components/shared/product/product-list'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProductsButton from '@/components/view-all-products-button'
 async function  Homepage() {
  const latestProduct = await getLatestProduct()
  const featuredProducts = await getFeaturedProducts()
  return (
    <>
     {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
    <ProductList data={latestProduct} title='Newest Arrival' limit ={4}/>
    <ViewAllProductsButton />
    </>
  )
}

export default Homepage