import { Link } from 'react-router-dom'
import CursorBall from '../components/common/CursorBall'
import logo from '../images/icons/logo-w.svg'
import { ReactComponent as Hamburger } from '../images/icons/hamburger.svg'
import Navigation from '../components/common/Navigation'
import GlobalState, { changeMenuState } from '../stores/GlobalState'
import Thanks from '../components/Thanks'
import bg from '../images/thanks-bg.png'
import { useEffect, useRef, useState } from 'react'
import { runInAction } from 'mobx'
import useLocoScroll from '../mocks/useLocoScroll'
import Footer from '../components/common/Footer'

const ThanksPage = () => {
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const header = useRef<any>(null)
  useLocoScroll(!loading)

  useEffect(() => {
    document.title = 'Equal Design | Thanks page'
    document.body.style.background = '#2b2727'
    console.log('ну пиздец');

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (header.current) {
      ; (header.current as HTMLElement).style.opacity = '1'
        ; (header.current as HTMLElement).style.transitionDuration = '0.3s'
        ; (header.current as HTMLElement).style.transitionDelay = '1s'
        ; (header.current as HTMLElement).style.transitionProperty = 'opacity'
    }
  }, [])

  useEffect(() => {
    runInAction(() => {
      GlobalState.menuIsOpen = false
    })
  }, [])

  return (
    <div data-load-container>
      <div className="smooth" data-scroll-container ref={containerRef}>
        <div className="page-dark thank-page">
          <img className="bg" src={bg} alt="" />
          <header className="header" ref={header}>
            <div
              className="header__logo"
              onClick={() => (window.location.href = '/')}
            >
              <img src={logo} alt="" />
            </div>
            <p className="header__text">
              DESIGN AGENCY <br />
              FOR DIGITAL PRODUCTS
            </p>
            <button className="hamburger" onClick={changeMenuState}>
              <Hamburger />
            </button>
            <Navigation />
          </header>
          <Thanks />
          <Footer />
        </div>
      </div>

      <CursorBall />
    </div>
  )
}

export default ThanksPage
