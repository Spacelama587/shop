'use client'
import { Button } from "@/components/ui/button"
import { Cart, CartItem } from "@/types"
import { toast } from "sonner"
import { addItemTocart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { useRouter } from "next/navigation"
import { Loader, Minus, Plus } from "lucide-react"
import { useTransition } from "react"

function AddToCart({cart, item } : {cart?: Cart, item:CartItem}) {

  const router = useRouter()

  const [isPending, starTransition] = useTransition()
  
  const handleAddToCart = async () => {
    starTransition(async () =>{
      const res = await addItemTocart(item)

      if (!res.success) {
  
        toast.error(res.message); // Changed to use toast.error (dot notation)
  
        return;
  
      }
  
      //handle success add to cart
      toast.success(`${item.name} added to cart`, { // Changed to use toast.success (dot notation)
  
        action: {
  
          label: "Go to Cart",
  
          onClick: () => router.push("/cart"),
  
        },
  
      });
    })
 
  }

  const handleRemoveFromCart = async () => {
    starTransition(async() => {
      const res = await removeItemFromCart(item.productId)
    
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      
      return;
    })
  }

  //check if item is in cart
  const existItem = cart && cart.items.find((x) => x.productId === item.productId)
  return existItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
      Add To Cart
    </Button>
  );
}

export default AddToCart