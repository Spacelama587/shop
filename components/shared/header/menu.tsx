import React from 'react'
import ModeToggle from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlignRight, CircleUserRound, ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

function Menu() {
  return (
    <div className='flex justify-end gap-3'>
        <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href='/sign-icon'>
            <CircleUserRound /> Sign In
          </Link>
        </Button>
        </nav>
        <nav className='md:hidden'>
            <Sheet>
                <SheetTrigger className='align-middle'>
                    <AlignRight />
                </SheetTrigger>
                <SheetContent className='flex flex-col items-start'>
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant='ghost'>
                            <Link href='/cart'>
                            <ShoppingCart /> Cart
                            </Link>
                        </Button>
                        <Button asChild >
                            <Link href='/sign-in'>
                            <CircleUserRound /> Sign In
                            </Link>
                        </Button>
                        <SheetDescription></SheetDescription>
                </SheetContent>
            </Sheet>
        </nav>
    </div>
  )
}

export default Menu