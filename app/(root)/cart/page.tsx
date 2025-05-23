import CartTable from "./cart-table"
import { getMyCart } from "@/lib/actions/cart.actions"
export const metadata = {
    title: 'Shopping Cart'
}

async function Cartpage() {
    const cart = await getMyCart()
  return (
    <>
    <CartTable cart={cart}/>
    </>
    )
}

export default Cartpage