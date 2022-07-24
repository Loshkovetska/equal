import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import Header from '../components/common/Header'
import PreLoaderBlog from '../components/PreLoaderBlog'
import { observer } from 'mobx-react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import CursorBall from '../components/common/CursorBall'

import Footer from '../components/common/Footer'
import BlogContent from '../components/BlogContent'
import useLocoScroll from '../mocks/useLocoScroll'

import { api } from '../api'

const BlogPage = observer(() => {
  const [loading, setLoading] = useState(true)
  const [isCloseLoading, setCloseLoading] = useState(false)
  const [isShowContent, setShowContent] = useState(false)
  const [isShowFooter, setShowFooter] = useState(false)

  const { pathname } = useLocation()

  const containerRef = useRef<HTMLDivElement>(null)
  const [menuState, setMenuState] = useState<any>(null);
  const [blogData, setBlogData] = useState<any>(null)
  const [filteredBlogData, setFilteredBlogData] = useState<any>(null)

  useLocoScroll(!loading)

  useEffect(() => {
    document.body.style.background = 'transparent'
    document.title = 'Equal Design | Blog page'
    if (!blogData) {

      setLoading(true)
      setShowContent(false)
      setShowFooter(false)
    }
  }, [pathname, blogData])

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

  const filterByType = (dt: any) => {
    const tab = pathname.includes('-')
      ? pathname.split('/').pop()?.split('-').join(' ')
      : pathname.split('/').pop()
    switch (tab) {
      case 'blog':
        setFilteredBlogData(dt)
        ScrollTrigger.refresh()
        break
      case `${tab}`:
        const res = dt.filter((d: any) => {
          let flag = false
          d.types.forEach((t: string) => {
            if (t.toLocaleLowerCase().includes(tab.toLocaleLowerCase())) {
              return flag = true
            }
            return
          })
          if (flag) {
            return d
          } else {
            return null
          }
        })
        setFilteredBlogData(res)
        ScrollTrigger.refresh()
        break
    }
  }

  const articleData = async () => {
    const blog = await api.blog.getBlog();
    if (!blogData) {
      if (blog) {
        filterByType(blog);
        setBlogData(blog);
        setCloseLoading(true)
        setTimeout(() => {
          setShowContent(true)
        }, 850);
        setTimeout(() => {
          setShowFooter(true)
        }, 4000);
      }
    }
  }
  articleData();
  menu();

  useEffect(() => {
    if (pathname && blogData) {
      filterByType(blogData);

    }
  }, [pathname, blogData])

  return (
    <>
      {loading && <PreLoaderBlog setLoading={setLoading} isCloseLoading={isCloseLoading} />}

      {isShowContent && <>
        <div className="smooth" data-scroll-container ref={containerRef}>
          <Header />

          <BlogContent menuState={menuState} blog={filteredBlogData} />
          {isShowFooter && <Footer />}
        </div>
        <CursorBall />
      </>
      }

    </>
  )
})

export default BlogPage
