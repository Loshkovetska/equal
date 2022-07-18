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
  const [loading, setLoading] = useState(true)
  const [isShowContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuState, setMenuState] = useState<any>(null);
  const [blogData, setBlogData] = useState<any>(null)

  useLocoScroll(!loading)

  useEffect(() => {
    document.body.style.background = 'transparent'
    document.title = 'Equal Design | Blog page'
    setLoading(true)
    setShowContent(false)
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
  const menu = async () => {
    if (!menuState) {
      const menu = await api.blog.getMenu();
      setMenuState(menu);
    }
  }
  const articleData = async () => {
    if (!blogData) {
      const blog = await api.blog.getBlog();
      if (blog) {
        setBlogData(blog);
        setLoading(false)
        setTimeout(() => {
          setShowContent(true)
        }, 900);
      }
    }
  }
  articleData();
  menu();

  return (
    <>
      {isShowContent && <>
        <div className="smooth" data-scroll-container ref={containerRef}>
          <Header />

          <BlogContent menuState={menuState} blog={blogData} />
          <Footer />
        </div>
        <CursorBall />
      </>
      }

      <PreLoader loading={loading} />

    </>
  )
})

export default BlogPage
