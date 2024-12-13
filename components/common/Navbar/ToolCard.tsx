import React from 'react'

interface ToolCardProps {
  bgColor: string;
  iconColor: string;
  Icon: React.ElementType
  title: string;
  description: string;
  isdescription:boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ bgColor, iconColor, Icon, title, description,isdescription }) => {
  return (
   <div className='flex items-center p-1 md:p-2 '>
  <div className="rounded-lg font-bold w-[3.5rem] h-[3.5rem] flex justify-center items-center flex-shrink-0" style={{ backgroundColor: bgColor }}>
                <Icon size={22} color={iconColor} strokeWidth={2}/>
            </div>
    <div className='flex flex-col justify-start ml-3'>
      <h1 className='text-[0.9rem] md:text-[1rem] font-poppin font-[600] max-w-[15ch] overflow-hidden whitespace-nowrap overflow-ellipsis'>{title}</h1>
      {
  isdescription ?
  <p className='text-[0.8rem] text-heading font-[400] font-poppin ' >{description}</p> :
  null
}
     
    </div>
   </div>
  )
}

export default ToolCard