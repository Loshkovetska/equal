import { messengers, socials } from '../../../mocks/menuItems'
import MagnetButton from '../MagnetButton'
import './footer.scss'
import './footer-safari.scss'
import SplitText from '../SplitText'
import { Link, useLocation } from 'react-router-dom'
import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { observer } from 'mobx-react'
import GlobalState from '../../../stores/GlobalState'
import {
  isSafariDesktop,
  is_safari,
  isTouch,
  is_chrome,
} from '../../../mocks/info'
const Footer = observer(() => {
  const footer = useRef<any>(null)
  const { pathname } = useLocation()
  const flag = useRef<any>(false)

  useEffect(() => {
    GlobalState.locoScroll && (GlobalState.locoScroll as any).update()
    ScrollTrigger.refresh()
    if (!isSafariDesktop && is_chrome) {
      setTimeout(() => {
        if (!footer.current) return
        if (pathname.split('/').pop() !== 'text-us') {
          const title = document.querySelectorAll('.footer__right-text')
          if (!title) return
          ScrollTrigger.create({
            trigger: '.footer',
            start: 'top center',
            scrub: 1,
            end: 'top top',
            onEnter: (self) => {
              let prev: any = document.querySelector('.footer')
                ?.previousElementSibling
              gsap.to('body', {
                background: '#2B2727',
              })
              gsap.to(prev, {
                opacity: 0,
                duration: 0.2,
              })
              gsap.to('.footer', {
                opacity: 1,
                duration: 0.5,
              })
              gsap.to('.footer *', {
                opacity: 1,
                duration: 0.5,
              })
            },
            onLeaveBack: () => {
              let prev: any = document.querySelector('.footer')
                ?.previousElementSibling
              gsap.to('body', {
                background: 'transparent',
              })
              gsap.to('.footer', {
                opacity: 0,
                duration: 0.5,
              })
              gsap.to('.footer *', {
                opacity: 0,
                duration: 0.5,
              })
              gsap.to(prev, {
                opacity: 1,
                duration: 0.5,
              })
            },
          })
          if (!footer.current.classList.contains('animated')) {
            var tl = gsap.timeline({
              ease: 'power2',
              scrollTrigger: {
                trigger: `.footer`,
                start: isTouch ? 'top bottom' : 'top center-=100',
                toggleActions: 'play none none none',
              },
            })
            tl.from(title, {
              yPercent: 100,
              duration: 0.6,
              stagger: 0.2,
              onComplete: () => {
                if (pathname.includes('cases')) {
                  title.forEach((t: HTMLElement | any, id: number) => {
                    let y = getComputedStyle(t)
                      .transform.replaceAll(')', '')
                      .replaceAll('(', '')
                      .replaceAll(' ', '')
                      .split(',')
                      .pop()
                    if (y && +y) {
                      t.style.transform = 'translate(0,0)'
                      t.style.transitionDuration = '0.6s'
                      t.style.transitionProperty = 'transform'
                      t.style.transitionDelay = `${id * 0.2}s`
                    }
                  })
                }
              },
            })
            tl = gsap.timeline({
              ease: 'power2',
              scrollTrigger: {
                trigger: footer.current,
                start:
                  window.innerHeight / 2 + 50 >
                  (document.querySelector('.footer') as HTMLElement)
                    ?.offsetHeight
                    ? 'top bottom'
                    : 'top center',
                toggleActions: 'play none none none',
              },
              delay: 0,
            })
            tl.from('.footer__arrow', {
              transformOrigin: 'center',
              xPercent: -100,
              duration: 0.4,
              stagger: 0.01,
              delay: 0.6,
              ease: 'sine',
              onComplete: () => {
                let arrow: any = document.querySelector('.footer__arrow')

                if (pathname.includes('cases')) {
                  if (!arrow) return
                  let x: any = getComputedStyle(arrow!)
                    .transform.replaceAll(')', '')
                    .replaceAll('(', '')
                    .replaceAll(' ', '')
                    .split(',')

                  x = x[x.length - 2]

                  if (x && 0 > +x) {
                    arrow.style.transform = 'translateX(0%)'
                    arrow.style.transitionDuration = `${0.4}s`
                    arrow.style.transitionDelay = `${1.2}s`
                    arrow.style.transitionTimingFunction =
                      'cubic-bezier(0.45, 0.05, 0.55, 0.95);'
                    arrow.style.transitionProperty = 'transform'
                  }
                }
              },
            })
            //footer.current.classList.add('animated')
          }

          return
        }
      })
      GlobalState.locoScroll &&
        (GlobalState.locoScroll as any).on('scroll', (args: any) => {
          if (
            args.scroll.y >=
            (footer.current as HTMLElement).offsetTop - 200
          ) {
            const title = document.querySelectorAll('.footer__right-text')

            title.forEach((t) => {
              ;(t as any).style.opacity = '1'
            })
          }
        })
    } else {
      if (!footer.current) return
      if (
        pathname.split('/').pop() !== 'text-us' &&
        pathname.split('/').pop() !== 'thanks'
      ) {
        ;(footer.current as Element).classList.add('safari')
        return
      }
    }
  }, [pathname])

  useEffect(() => {
    if (!isSafariDesktop) {
      if (
        pathname.split('/').pop() == 'text-us' ||
        pathname.split('/').pop() == 'thanks'
      ) {
        const elems = document.querySelectorAll('.footer *')
        elems.forEach((e) => {
          ;(e as any).style.opacity = '1'
          ;(e as any).style.transitionDuration = '0.3s'
          ;(e as any).style.transitionProperty = 'opacity'
        })
        return
      }
    }
  }, [pathname])

  useEffect(() => {
    if ((isSafariDesktop || is_safari) && !is_chrome) {
      ScrollTrigger.refresh()
      if (
        pathname.split('/').pop() == 'text-us' ||
        pathname.split('/').pop() == 'thanks'
      ) {
        document.body.classList.add('dark')
        const elems = document.querySelectorAll('.footer *')
        elems.forEach((e) => {
          ;(e as any).style.opacity = '1'
          ;(e as any).style.transitionDuration = '0.3s'
          ;(e as any).style.transitionProperty = 'opacity'
        })
        setTimeout(() => {
          if (document.querySelector('.contact-form__btn') as any) {
            ;(document.querySelector(
              '.contact-form__btn',
            ) as any)!.style.transform = 'translate(0,0)'
          }
        }, 1000)
      } else (footer.current as Element).classList.add('safari')
      if (
        pathname.split('/').pop() !== 'text-us' &&
        pathname.split('/').pop() !== 'thanks'
      ) {
        document.body.classList.add('safari')
        const prev = (footer.current as any).previousElementSibling
        const btnMess: any = document.querySelector('.btn-message')
        const arrow: any = document.querySelector('.footer__arrow')
        const elems = document.querySelectorAll('.footer *')
        const slides = document.querySelectorAll('.footer.safari .slide-up')
        const titles: any = document.querySelectorAll(
          '.footer__right-cont>.footer__right-text',
        )
        // const footer = document.querySelector('.footer');

        GlobalState.locoScroll &&
          (GlobalState.locoScroll as any).on('scroll', (args: any) => {
            if (
              args.scroll.y >=
              (footer.current as HTMLElement).offsetTop - 200
            ) {
              ;(document.body as any).style.background = '#2B2727'
              ;(prev as any).style.opacity = 0

              if (!flag.current) {
                Array.from(elems).forEach((e, ind) => {
                  ;(e as any).style.opacity = 1
                  ;(e as any).style.transitionDelay = `${0.2}s`
                })
                titles &&
                  titles.forEach((t: HTMLElement, id: number) => {
                    t.style.transitionDelay = `${1 + id * 0.2}s`
                    t.style.transform = 'translate(0,0%)'
                  })
                Array.from(slides).forEach((e, ind) => {
                  ;(e as any).style.transitionDuration = '0.5s'
                  ;(e as any).style.transitionProperty = 'transform'
                  ;(e as any).style.transform = 'translate(0%,0%)'
                  ;(e as any).style.transitionDelay = `${0 + 0.2 * ind}s`
                  ;(e as any).style.transitionTimingFunction =
                    'cubic-bezier(0.45, 0.05, 0.55, 0.95);'
                })
                flag.current = true
              }
              if (btnMess) btnMess.style.boxShadow = 'inset 0 0 0 2px #e1f23a'

              if (arrow && !arrow.classList.contains('animated')) {
                arrow.style.transform = 'translateX(0%)'
                arrow.style.transitionDuration = `${0.4}s`
                arrow.style.transitionDelay = `${2}s`
                arrow.style.transitionTimingFunction =
                  'cubic-bezier(0.45, 0.05, 0.55, 0.95);'
                arrow.style.transitionProperty = 'transform'
                arrow.classList.add('animated')
              }
            } else {
              ;(document.body as any).style.background = 'transparent'
              ;(prev as any).style.opacity = 1
              if (btnMess) btnMess.style.boxShadow = 'inset 0 0 0 2px #fff'
              if (!arrow.classList.contains('animated')) {
                arrow.style.transform = 'translateX(-120%)'
              }
            }
          })
      }
    }
  }, [pathname, GlobalState.locoScroll])

  return (
    <footer className="footer" ref={footer}>
      {pathname.split('/').pop() !== 'text-us' &&
        pathname.split('/').pop() !== 'thanks' && (
          <>
            {' '}
            <span className="circle-yellow"></span>
            {(isSafariDesktop || is_safari) && !is_chrome ? (
              <></>
            ) : (
              <span className="circle-white"></span>
            )}
            <div className="footer__top">
              <div className="footer__top-cont">
                <div className="footer__top-text">Got an idea?</div>
              </div>
              <div className="footer__top-cont">
                <div className="footer__top-text">working worldwide</div>
              </div>
            </div>
          </>
        )}
      <div className="footer__content">
        {pathname.split('/').pop() !== 'text-us' &&
          pathname.split('/').pop() !== 'thanks' && (
            <div className="footer__middle">
              <div className="footer__left">
                <div className="footer__arrow">
                  <svg
                    width="321"
                    height="185"
                    viewBox="0 0 321 185"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M238.021 79.5105L161.007 0.5H230.127L320.3 92.6177L230.127 184.5H161.009L238.021 105.726L238.851 104.877H237.663L-392.892 104.877H-394.083L-393.249 105.727L-316.012 184.5H-385.356L-475.301 92.6177L-385.356 0.5H-316.01L-393.25 79.51L-394.08 80.3595H-392.892H237.663H238.849L238.021 79.5105Z"
                      stroke="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="footer__right">
                <div className="footer__right-title">
                  <div className="footer__right-cont">
                    <div className="footer__right-text">let's</div>
                  </div>
                  <div className="footer__right-cont">
                    <div className="footer__right-text">discuss it</div>
                  </div>
                </div>
                {/* )} */}
                <MagnetButton
                  wrapperClass="appear"
                  classList="btn-primary btn-magnet btn-message"
                  text="Send message"
                  path="/text-us"
                />
              </div>
            </div>
          )}
      </div>
      <div className="footer__bottom">
        <div className="footer__social">
          <div className="footer__col">
            <div className="footer__col-title">
              <div className="footer__col-cont slide-wrap">
                <div className="footer__col-text slide-up">Follow us</div>
              </div>
            </div>
            <div className="footer__list">
              {socials.map((col, ind) => (
                <div key={ind} className="footer__item slide-wrap">
                  {col.map((s, idx) => (
                    <Fragment key={idx}>
                      <SplitText
                        target={true}
                        text={s.title}
                        path={s.link}
                        classList="link-rotate slide-up"
                      />
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">
              <div className="footer__col-cont slide-wrap">
                <div className="footer__col-text slide-up">
                  {window.innerWidth <= 768 ? '' : 'You can '} drop us
                </div>
              </div>
              <div className="footer__col-cont wrap">
                <div className="footer__col-text slide-up">
                  a line in messengers{' '}
                </div>
              </div>
            </div>
            <div className="footer__list">
              {messengers.map((s, idx) => (
                <div className="footer__item slide-wrap" key={idx}>
                  <SplitText
                    target={true}
                    text={s.title}
                    path={s.link}
                    classList="link-rotate slide-up"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__col-title">
              <div className="footer__col-cont slide-wrap">
                <div className="footer__col-text slide-up">
                  {!pathname.includes('thanks') && !pathname.includes('text-us')
                    ? 'or '
                    : ''}
                  email
                </div>
              </div>
            </div>
            <CustomEmail
              classList="footer__email"
              path="mailto:hello@equal.design"
              text="hello@equal.design"
            />
          </div>
        </div>
        @ Equal {new Date().getFullYear()}
      </div>
    </footer>
  )
})

export default Footer

export const CustomEmail = ({
  classList,
  path,
  text,
}: {
  classList: string
  path: any
  text: string
}) => {
  return (
    <Link
      to="#"
      className={classList}
      onClick={(e) => {
        e.preventDefault()
        window.location = path
      }}
    >
      {text}
    </Link>
  )
}
