import { useState, useEffect, useRef } from 'react'
import Header from '../components/common/Header'
import PreLoader from '../components/PreLoader'
import { observer } from 'mobx-react'
import CursorBall from '../components/common/CursorBall'

import Footer from '../components/common/Footer'
import CasesContent from '../components/CasesContent'
import useLocoScroll from '../mocks/useLocoScroll'

const CasesPage = observer(() => {
  const [loading, setLoading] = useState(true)
  const [isShowFooter, setShowFooter] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  useLocoScroll(!loading)

  useEffect(() => {

    document.title = 'Equal Design | Cases page'
    setLoading(true)
    setTimeout(() => {
      document.body.style.background = 'transparent'
      setLoading(false)
    }, 1000)
    setTimeout(() => {
      setShowFooter(true)
    }, 4000);
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
        <PreLoader />
      ) : (
        <>
          <div className="smooth" data-scroll-container ref={containerRef}>
            <Header />
            <CasesContent />
            {isShowFooter && <Footer />}
          </div>
          <CursorBall />
        </>
      )}
    </>
  )
})

export default CasesPage
