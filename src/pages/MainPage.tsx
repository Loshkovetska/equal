import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import Intro from '../components/Intro'
import MainProjects from '../components/MainProjects'
import PlayReel from '../components/PlayReel'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'
import SelectedCases from '../components/SelectedCases'
import Help from '../components/Help'
import HorizontalLines from '../components/HorizontalLines'
import Principles from '../components/Principles'
import Vision from '../components/Vision'
import Footer from '../components/common/Footer'
import ScrollToTop from '../components/common/ScrollToTop'
import useLocoScroll from '../mocks/useLocoScroll'
import { useLocation } from 'react-router'
import { CSSProperties } from 'react'
import GlobalState from '../stores/GlobalState'

const MainPage = observer(() => {
  const [loading, setLoading] = useState(false)
  const ref = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  useLocoScroll(!loading)

  useEffect(() => {
    document.title = 'Equal Design | Main page'
    document.body.style.background = 'transparent'
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
          <div ref={ref}></div>
          <ScrollToTop headerContent={ref} />
          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header />
            <Intro />
            <PlayReel />
            <MainProjects />
            <SelectedCases />
            <Help />
            <HorizontalLines />
            <Principles />
            <Vision />
            <Footer />
          </div>
          <CursorBall />
          <div className="scroll-down-translate">
            <span>Scroll down</span>
          </div>
        </>
      )}
    </>
  )
})

export default MainPage
