import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={460}
        viewBox='0 0 280 460'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}
    >
        <rect x='6' y='281' rx='3' ry='3' width='260' height='24' />
        <rect x='6' y='326' rx='3' ry='3' width='260' height='60' />
        <rect x='7' y='409' rx='3' ry='3' width='260' height='40' />
        <circle cx='130' cy='130' r='130' />
    </ContentLoader>
)

export default Skeleton
