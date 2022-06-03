import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = ({ headerContent }: { headerContent: any }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    console.log(pathname)
    if (!pathname.includes('/thanks') && !pathname.includes('/contact')) {
      document.querySelector('body')!.style.background = 'transparent'
    }
    if (headerContent && headerContent.current) {
      ;(headerContent.current as Element).scrollIntoView()
    }
  }, [pathname])

  return null
}

export default ScrollToTop
