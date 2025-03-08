import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'
const currency =  z
.string()
.refine((value)=> /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), 'Price must have exactly two decimal places')
//Schmea for inserting products 

export const insertProductSchema = z.object({
    name : z.string().min(3, 'Name must be arleast 3 charecters'),
    slug: z.string().min(3, 'Slug must be atleast 3 charecters long'),
    category: z.string().min(3, 'Category must be atleast 3 charecters long'),
    brand: z.string().min(3, 'Brand must be atleast 3 charecters long'),
    description: z.string().min(3, 'Description must be atleast 3 charecters long'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have atleast one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price:currency,
})

//Scehma for signing user isn

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 charecters')
})


//Scehma for signUPuser 

export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters' ),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 charecters'),
    confirmPassword: z.string().min(6, 'passwords dont match')
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ['confirmPassword']
})

//cart schema 

export const cartItemSchema = z.object({
    productId: z.string().min(1, "product is required"),
    name: z.string().min(1, "product name is required"),
    slug: z.string().min(1, "slug is required"),
    qty: z.number().int().nonnegative("quantity must be a positive number"),
    image: z.string().min(1, 'Imagw is required'),
    price: currency

})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required' ),
    userId: z.string().optional().nullable()
})