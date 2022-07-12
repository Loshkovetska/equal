import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'

import Footer from '../components/common/Footer'
import BlogsContent from '../components/BlogsContent'
import useLocoScroll from '../mocks/useLocoScroll'
import { useLocation } from 'react-router'

const BlogsPage = observer(() => {
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = useLocation();
  useLocoScroll(!loading)

  useEffect(() => {
    document.body.style.background = 'transparent'

    document.title = 'Equal Design | Cases page'
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!loading) {
      if (typeof window === 'undefined' || !window.document) {
        return
      }
    }
  }, [loading])

  if (typeof window === 'undefined' || !window.document) {
    return <></>
  }
  return (
    <>
      {loading ? (
        <PreLoader loading={loading} />
      ) : (
        <>
          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header />

            <BlogsContent />
            <Footer />
          </div>
          <CursorBall />
        </>
      )}
    </>
  )
})

export default BlogsPage
