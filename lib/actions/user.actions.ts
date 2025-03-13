'use server'

import { shippingAddressSchema, signInFormSchema, signUpFormSchema } from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError  } from "../utils";
import { shippingAddress } from "@/types";
//Sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData){
        try {
            const user = signInFormSchema.parse({
                email: formData.get('email'),
                password: formData.get('password')
            })
            await signIn('credentials', user)
            return { success : true, message : 'Signed in succesfully' }
        } catch(error){
            if(isRedirectError(error)){
                throw error
            }

            return {success: false, message: 'Invalid email or password'}
        }
}

//sign out

export async function signOutUser(){
    await signOut()
}

//signUp user

export async function SignupUser(prevState: unknown, formData: FormData) {
    try{
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        })

        const plainPassword = user.password
        user.password = hashSync(user.password, 10)

        await prisma.user.create({
            data:{
                name: user.name,
                email:user.email,
                password: user.password
            }

        })

        await signIn('credentials', {
            email: user.email,
            password: plainPassword
        })

        return { success: true, message: "User registered succesfully"}
    } catch (error){
        // console.log(error.name)
        // console.log(error.code)
        // console.log(error.errors)
        // console.log(error.meta?.target)
        if(isRedirectError(error)){
            throw error
        }

        return {success: false, message:  formatError(error)}
    }
}

//get user by the id

export async function getUserById(userId: string){
    const user = await prisma.user.findFirst({
        where: {id: userId}
    })
    if(!user) throw new Error ('User not found')
        return user;
}

//update user address

export async function updateUserAddress (data: shippingAddress) {
    try {
        const session = await auth();
        const currentUser = await prisma.user.findFirst({
            where: {id: session?.user?.id}
        })

        if(!currentUser) throw new Error('User not found')
            const address = shippingAddressSchema.parse(data)
        await prisma.user.update({
            where: {id: currentUser.id},
            data: {address}
        })
        return{
            success: true,
            message: 'User updated succesfully',
        }
    } catch (error) {
        return{
            success : false, message: formatError(error)
        }
    }
}