import './preloader.scss'
import { useState, useEffect, useRef } from 'react'

const PreLoader = ({ loading }: { loading: any }) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  console.log("🚀 ~ file: index.tsx ~ line 5 ~ PreLoader ~ loading", loading)

  useEffect(() => {
    if (!loading) {
      (loaderRef.current as any).classList.add('animate')
      setTimeout(() => {
        (loaderRef.current as any).classList.remove('page-loader');
        (loaderRef.current as any).style.display = 'none'
      }, 700)
    }
    // if(!)

  }, [loading])

  return (
    <div className={`page-loader`}
      ref={loaderRef}
    >
      <svg
        className="loader-arrow"
        width="76"
        height="38"
        viewBox="0 0 76 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.7264 -2.90887e-06L58.8433 16.355L17.204 16.355L33.2736 -3.73526e-06L18.7164 -5.00789e-06L1.66315e-06 18.9757L18.7164 38L33.2736 38L17.204 21.5964L58.8433 21.5964L42.7264 38L57.3308 38L76 18.9757L57.3308 -1.63211e-06L42.7264 -2.90887e-06Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default PreLoader
