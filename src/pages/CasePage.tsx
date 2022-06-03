import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'
import Footer from '../components/common/Footer'
import Case from '../components/Case'
import { useLocation } from 'react-router'
import { runInAction } from 'mobx'
import GlobalState from '../stores/GlobalState'
import Estimate from '../components/Estimate'
import ScrollToTop from '../components/common/ScrollToTop'
import useLocoScroll from '../mocks/useLocoScroll'

const CasePage = observer(() => {
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const container = useRef(null)
  const scroll = useRef(null)
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
  return (
    <>
      {loading ? (
        <PreLoader loading={loading} />
      ) : (
        <>
          <div ref={scroll}></div>
          <ScrollToTop headerContent={scroll} />

          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header classlist="header-fixed" />
            <Case />
            <Footer />
          </div>

          <CursorBall />
        </>
      )}
    </>
  )
})

export default CasePage
