import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CursorBall from '../components/common/CursorBall'
import PreLoader from '../components/PreLoader'
import logo from '../images/icons/logo-w.svg'
import { ReactComponent as Hamburger } from '../images/icons/hamburger.svg'
import Navigation from '../components/common/Navigation'
import GlobalState, { changeMenuState } from '../stores/GlobalState'
import ContactForm from '../components/ContactForm'
import bg from '../images/contacts_bg.png'
import { runInAction } from 'mobx'
import { messengers, socials } from '../mocks/menuItems'
import SplitText from '../components/common/SplitText'
import Footer, { CustomEmail } from '../components/common/Footer'
import useLocoScroll from '../mocks/useLocoScroll'

const ContactPage = () => {
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const header = useRef<any>(null)
  useLocoScroll(!loading)
  useEffect(() => {
    document.title = 'Equal Design | Contact page'
    document.body.style.background = '#2b2727'
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (header.current && !loading) {
      console.log(loading)
        ; (header.current as HTMLElement).style.opacity = '1'
        ; (header.current as HTMLElement).style.transitionDuration = '0.3s'
        ; (header.current as HTMLElement).style.transitionDelay = '1s'
        ; (header.current as HTMLElement).style.transitionProperty = 'opacity'
    }
  }, [loading])

  useEffect(() => {
    runInAction(() => {
      GlobalState.menuIsOpen = false
    })
  }, [])

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div data-load-container>
          <div className="smooth" data-scroll-container ref={containerRef}>
            <div className="page-dark ">
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
              <ContactForm />
              <Footer />
            </div>
          </div>
          <CursorBall />
        </div>
      )}
    </>
  )
}

export default ContactPage
