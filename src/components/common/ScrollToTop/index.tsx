import { useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = ({ headerContent }: { headerContent: any }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!pathname.includes('/thanks') && !pathname.includes('/contact')) {
      document.querySelector('body')!.style.background = 'transparent'
    }
    if (headerContent && headerContent.current) {
      ; (headerContent.current as Element).scrollIntoView()
    }
  }, [pathname, headerContent])

  return null
}

export default ScrollToTop
