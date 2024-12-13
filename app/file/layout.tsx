import HeaderBar from '@/components/common/HeaderBar';
import React from 'react'

const FileLayout = ({
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

export default FileLayout