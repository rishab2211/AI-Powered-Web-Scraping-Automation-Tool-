
'use client'

import animationData from "../../public/not-found-lottie.json"

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });



const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ height: 500, width: 500 }}
        onClick={() => {}} // This disables click to pause
      />
    </div>
  )
}

export default NotFound