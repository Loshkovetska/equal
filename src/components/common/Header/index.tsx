import { Link, useLocation } from 'react-router-dom'
import logo from '../../../images/icons/logo.svg'
import { ReactComponent as Hamburger } from '../../../images/icons/hamburger.svg'
import Navigation from '../Navigation'
import './header.scss'
import { observer } from 'mobx-react'
import GlobalState, { changeMenuState } from '../../../stores/GlobalState'
import MagnetButton from '../MagnetButton'
import SplitText from '../SplitText'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { isSafariDesktop, isTouch, is_firefox } from '../../../mocks/info'

const Header = observer(({ classlist = '' }: { classlist?: string }) => {
  const header = useRef<any>(null)
  const { pathname } = useLocation()
  useEffect(() => {
    const headerFix = document.querySelector('.header-fixed')

    if (!headerFix) {
      ;(header.current as HTMLElement).style.opacity = '1'
      ;(header.current as HTMLElement).style.transitionDuration = '0.3s'
      ;(header.current as HTMLElement).style.transitionDelay = '1s'
    }
  }, [])

  useEffect(() => {
    const headerFix = document.querySelector('.header-fixed')

    setTimeout(
      () => {
        const header = document.querySelector('.header-fixed')
        if (header && !isTouch) {
          if (isSafariDesktop || is_firefox) {
            ;(header as any).style.opacity = '1'
            ;(document.querySelector(
              '.header-fixed .header__logo',
            ) as any).style.transfrom = 'translate(0, 0)'

            gsap.from(
              [
                '.header-fixed .header__logo',
                '.header .header__text',
                '.header .btn-magnet-wrap',
              ],
              {
                transformOrigin: 'center',
                y: -100,
                duration: 0.6,
              },
            )
          } else {
            ;(header as any).style.opacity = '1'

            gsap.to('.header-fixed .header__logo', {
              scrollTrigger: {
                trigger: '.header-fixed .header__logo',
                pin: true,
                scrub: 1,
                start: 'top top+=30',
                endTrigger: '.case',
                end: 'bottom bottom',
                pinSpacing: false,
              },
            })
            gsap.from(
              ['.header-fixed .header__logo', '.header .header__text', ,],
              {
                transformOrigin: 'center',
                y: -100,
                duration: 0.6,
              },
            )
            ;(document.querySelector(
              '.header-fixed .btn-magnet-wrap',
            ) as any).style.transform = 'translate(0, 0)'
          }
        }

        if (header && isTouch) {
          ;(header as any).style.opacity = '1'
          ;(document.querySelector(
            '.header .hamburger',
          ) as any).style.marginTop = '0px'
          gsap.to('.header-fixed .btn-magnet-wrap', {
            scrollTrigger: {
              trigger: '.header-fixed .btn-magnet-wrap',
              pin: true,
              scrub: 1,
              start: 'top top',
              endTrigger: '.case',
              end: 'bottom bottom',
              pinSpacing: false,
            },
          })

          gsap.from(
            [
              '.header-fixed .header__logo',
              '.header .header__text',
              '.header .btn-magnet-wrap',
            ],
            {
              transformOrigin: 'center',
              y: -100,
              duration: 0.6,
            },
          )
        }
        if (header) {
          gsap.from('.header', {
            yPercent: -100,
            duration: 0.6,
            delay: 0,
          })
        }
      },
      headerFix ? 100 : 0,
    )
  }, [])
  let dir = 'down'
  let lastPost = 0
  useEffect(() => {
    const header = document.querySelector('.header')
    if (!header) return

    if (GlobalState.locoScroll) {
      const headerRect = header?.getBoundingClientRect()

      ;(GlobalState.locoScroll as any).on('scroll', (args: any) => {
        console.log(args.direction)
        if (args.scroll.y > headerRect.bottom) {
          if (args.direction == 'up') {
            document.querySelector('header.showup')!.classList.add('display')
          } else {
            if (GlobalState.menuIsOpen) {
              changeMenuState()
            }
            document.querySelector('header.showup')!.classList.remove('display')
          }
        } else {
          if (GlobalState.menuIsOpen) {
            changeMenuState()
          }
          document.querySelector('header.showup')!.classList.remove('display')
        }
      })
    }
  }, [GlobalState.locoScroll])

  useEffect(() => {
    window.onscroll = () => {
      console.log('scroll')
    }
  })

  return (
    <>
      <header className={classNames('header', classlist)} ref={header}>
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
        <div className="header__btns">
          <div className={classNames('slide-wrap', 'slide-wrap--header')}>
            <div className="slide-up">
              <SplitText
                classList="link-rotate"
                text="our cases"
                path="/cases"
                target={false}
              />
            </div>
          </div>

          <MagnetButton
            text="contact us"
            classList="btn-primary btn-header"
            path="/text-us"
          />
        </div>
        <button className="hamburger" onClick={changeMenuState}>
          <Hamburger />
        </button>
        <Navigation />
      </header>
    </>
  )
})

export default Header
