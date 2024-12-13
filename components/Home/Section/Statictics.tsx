import { statistics } from '@/constants/Home/Home'
import React from 'react'

const Statictics = () => {
  return (
<div className="max-container">
        <div className="p-2 flex justify-around items-center bg-[#EFF7FD] dark:bg-[#273744] rounded-xl md:mt-6">
          {statistics.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start sm:items-center md:gap-8 justify-between relative">
              <h1 className="text-[1.5rem] md:text-[2.28rem] font-poppin font-[600] text-[#1A8FE3]">{stat.value}</h1>
              <p className="text-paragraph text-[0.8rem] md:text-[0.95rem] font-poppin font-[400]">{stat.label.split(' ').map(word => <>{word}<br/></>)}</p>
             
              {index !== statistics.length - 1 && (
                <div className=" w-px h-8 bg-gray-300 max-lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
  )
}

export default Statictics



