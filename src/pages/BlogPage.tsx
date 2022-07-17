import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'

import Footer from '../components/common/Footer'
import BlogContent from '../components/BlogContent'
import useLocoScroll from '../mocks/useLocoScroll'

import { api } from '../api'

const BlogPage = observer(() => {
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const [menuState, setMenuState] = useState<any>(null);

  const [blogData, setBlogData] = useState<any>(null)

  const menu = async () => {
    if (!menuState) {
      const menu = await api.blog.getMenu();
      console.log(menu);
      setMenuState(menu);

      const blog = await api.blog.getBlog();
      console.log(blog);
      setBlogData(blog);
    }
  }
  menu();

  return (
    <>
      {loading || !menuState || !blogData ? (
        <PreLoader loading={loading} />
      ) : (
        <>

          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header />

            <BlogContent menuState={menuState} blog={blogData} />
            <Footer />
          </div>
          <CursorBall />
        </>
      )}
    </>
  )
})

export default BlogPage
