import HeaderBar from '@/components/common/HeaderBar';
import React from 'react'

const videoLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
     <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={false}
        showSubscribe={true}
      />
      {
        children
      }
    </>
    
  )
}

export default videoLayout