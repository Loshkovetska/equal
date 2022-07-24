import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoaderBlog from '../components/PreLoaderBlog'
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
  const [isCloseLoading, setCloseLoading] = useState(false)
  const [isShowContent, setShowContent] = useState(false)
  const [isShowFooter, setShowFooter] = useState(false)

  const { pathname } = useLocation()
  const { id } = useParams()

  const container = useRef(null)
  const scroll = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.background = 'transparent'
    setShowContent(false)
    setShowFooter(false)
    setLoading(true)
  }, [pathname])

  const [articleItem, setArticleData] = useState<any>(null);


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
  useLocoScroll(isShowContent)

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

  const article = async () => {
    if (!articleItem) {
      const article = await api.blog.getArticle(id)
      if (article) {
        document.title = `Equal Design | ${article.title}`
        document.body.style.background = 'transparent'
        setArticleData(article);
        setCloseLoading(true)
        setTimeout(() => {
          setShowContent(true)
        }, 350);
        setTimeout(() => {
          setShowFooter(true)
        }, 4000);
      }
    }
  }
  article();


  return (
    <>
      {loading && <PreLoaderBlog setLoading={setLoading} isCloseLoading={isCloseLoading} />}

      {isShowContent && <>
        <div ref={scroll}></div>
        <ScrollToTop headerContent={scroll} />
        <article className="progressBar"></article>

        <div className="smooth" data-scroll-container ref={containerRef}>
          <Header classlist="header-fixed" />
          <BlogArticle articleData={articleItem} />
          {isShowFooter && <Footer />}
        </div>

        <CursorBall />
      </>
      }
    </>
  )
})

export default BlogArticlePage
