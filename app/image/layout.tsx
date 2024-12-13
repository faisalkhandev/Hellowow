import HeaderBar from '@/components/common/HeaderBar';
import React from 'react'

const ImageLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <HeaderBar
                title="Free. No Sign-Up Required. No Limits."
                showReadMore={true}
                showSubscribe={false}
            />
            {
                children
            }
        </>

    )
}

export default ImageLayout