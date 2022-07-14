import { useState, useEffect, useRef } from 'react'
import ProgressBar from 'react-progressbar-on-scroll'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'
import Footer from '../components/common/Footer'
import BlogArticle from '../components/BlogArticle'
import { useLocation } from 'react-router'
import { runInAction } from 'mobx'
import GlobalState from '../stores/GlobalState'
import Estimate from '../components/Estimate'
import ScrollToTop from '../components/common/ScrollToTop'
import useLocoScroll from '../mocks/useLocoScroll'

const BlogArticlePage = observer(() => {
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const container = useRef(null)
  const scroll = useRef(null)
  const progressScroll = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useLocoScroll(!loading)

  useEffect(() => {
    document.body.style.background = 'transparent'

    document.title = `Equal Design | ${pathname.split('/').pop()}`
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    runInAction(() => {
      GlobalState.menuIsOpen = false
    })
  }, [])

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

  useEffect(() => {
    if (GlobalState.locoScroll) {
      ; (GlobalState.locoScroll as any).on('scroll', (args: any) => {

        if (args.scroll.y) {
          const defineScrollOne = args.limit / 100
          const scrollProgress = Math.floor(args.scroll.y / defineScrollOne);
          (document.querySelector(
            '.progressBar',
          ) as any).style.backgroundImage = "linear-gradient(to right, " + `#e1f23a ${scrollProgress}%` + ", " + 'transparent 0px' + ")";
          // ) as any).style.backgroundImage = 'linear-gradient(to right, #e1f23a 10%, transparent 0px);'
          // if (progressScroll.current) {
          //   console.log("🚀 ~ file: BlogArticlePage.tsx ~ line 61 ~ ; ~ scrollProgress", scrollProgress)
          //   // progressScroll.current.style.background = `-moz-linear-gradient(' + 'right' + ', ' + '#e1f23a ${scrollProgress}%' + ', ' + 'transparent 0px' + ')';`
          //   // progressScroll.current.style.backgroundImage =
          //   progressScroll.current.style.backgroundImage = 'red'
          //   console.log("🚀 ~ file: BlogArticlePage.tsx ~ line 64 ~ ; ~ progressScroll.current.style", progressScroll.current.style)
          // }
        }
      })
    }
  }, [GlobalState.locoScroll])
  return (
    <>
      {loading ? (
        <PreLoader loading={loading} />
      ) : (
        <>
          <div ref={scroll}></div>
          <ScrollToTop headerContent={scroll} />


          <div ref={progressScroll} className="progressBar"></div>

          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header classlist="header-fixed" />
            <BlogArticle />
            <Footer />
          </div>

          <CursorBall />
        </>
      )}
    </>
  )
})

export default BlogArticlePage
