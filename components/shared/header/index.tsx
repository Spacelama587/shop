import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'
function Header() {
  return (
    <header className='w-full border-b wrapper flex-between'>
      <div className="flex-start">
        <Link href='/' className='flex-start'>
          <Image src='/images/next-shop-logo.svg' alt={`${APP_NAME}`} height={48} width={48} priority = {true} />
          <span className='hidden lg:block font-bold text-2xl ml-3'>{APP_NAME}</span>
          
        </Link>
      </div>

     <Menu />
    </header>
  )
}

export default Header