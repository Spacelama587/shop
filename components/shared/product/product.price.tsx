import React from 'react'
import { cn } from '@/lib/utils';
function ProductPrice({value, className} : {value: number; className?: string}) {
      //ensure 2 decimal places
      const stringValue = value.toFixed(2)
      //get int fload
     const [intValue, floatValue] =  stringValue.split('.')
  return (
  
    <p className={cn('text-2xl', className)}> 
        <span className="text-xs align-super">$</span>
        {intValue}
        <span className="text-xs align-super">.{floatValue}</span>
    </p>
  )
}

export default ProductPrice