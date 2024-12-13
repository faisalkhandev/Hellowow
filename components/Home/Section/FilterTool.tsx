import { Button } from '@/components/ui/button'
import { filtertool } from '@/constants/Home/Home'
import React from 'react'

const FilterTool = () => {
  return (
    <div className='max-container'>
    <div className="w-full flex items-center max-lg:hidden">
<h1 className="text-heading text-[1rem] font-[500] font-poppin mr-2 ">Recent Tools:</h1>
<div className="flex items-center space-x-3 pl-2">
  {
    filtertool.map((tool)=>(
      <Button key={tool.id}  size="sm" variant="destructive" className="text-[0.85rem] font-[500] font-poppin rounded-lg border  border-[#1A8FE3] ">{tool.name}</Button>

    ))
  }
</div>
</div>
</div>
  )
}

export default FilterTool