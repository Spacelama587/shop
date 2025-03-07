'use server'
import {prisma} from '@/db/prisma'
import { convertToPlainObject } from "../utils"
import { LATEST_PRODUCT_LIMIT } from "../constants"
//Get latest products

export async function getLatestProduct(){
     const data = await prisma.product.findMany({
        take: LATEST_PRODUCT_LIMIT,
        orderBy:{createdAt: 'desc'}
     })

     return convertToPlainObject(data)
}

//Gety single product by its slug

export async function getProductBySlug(slug: string){
   return await prisma.product.findFirst({
      where: {slug: slug}
   })
}