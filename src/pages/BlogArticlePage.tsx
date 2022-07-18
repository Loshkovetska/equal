import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'
import Footer from '../components/common/Footer'
import BlogArticle from '../components/BlogArticle'
import { useLocation, useParams } from 'react-router'
import { runInAction } from 'mobx'
import GlobalState from '../stores/GlobalState'
import ScrollToTop from '../components/common/ScrollToTop'
import useLocoScroll from '../mocks/useLocoScroll'
import { api } from '../api'

const BlogArticlePage = observer(() => {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()
  const { id } = useParams()

  const container = useRef(null)
  const scroll = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.background = 'transparent'

    document.title = `Equal Design | ${pathname.split('/').pop()}`
    setLoading(true)
  }, [pathname])

  const [articleItem, setArticleData] = useState<any>(null);

  const article = async () => {
    if (!articleItem) {
      const article = await api.blog.getArticle(id)
      setArticleData(article);
      setLoading(false)
    }
  }
  article();
  useLocoScroll(!loading)

  useEffect(() => {
    runInAction(() => {
      GlobalState.menuIsOpen = false
    })
  }, [pathname])

  useEffect(() => {
    if (!loading && container) {
      if (typeof window === 'undefined' || !window.document) {
        return
      }
    }
  }, [loading])

  if (typeof window === 'undefined' || !window.document) {
    return <></>
  }
  const locoScroll = (GlobalState.locoScroll as any)
  useEffect(() => {
    if (locoScroll) {
      locoScroll.on('scroll', (args: any) => {
        if (args.scroll.y) {
          const defineScrollOne = args.limit / 100
          const scrollProgress = args.scroll.y / defineScrollOne;
          (document.querySelector(
            '.progressBar',
          ) as any).style.backgroundImage = `linear-gradient(to right,#e1f23a ${scrollProgress}%, transparent 0px)`;
        }
      })
    }
  }, [locoScroll])

  return (
    <>
      {!loading && articleItem !== null && <>
        <div ref={scroll}></div>
        <ScrollToTop headerContent={scroll} />
        <article className="progressBar"></article>

        <div className="smooth" data-scroll-container ref={containerRef}>
          <Header classlist="header-fixed" />
          <BlogArticle articleData={articleItem} />
          <Footer />
        </div>

        <CursorBall />
      </>
      }
      <PreLoader loading={loading} />
    </>
  )
})

export default BlogArticlePage
