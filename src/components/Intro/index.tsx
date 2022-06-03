import { useEffect, useRef } from 'react'
import Sculpture from '../Sculpture'
import './intro.scss'
import gsap from 'gsap'
import { isTouch, is_firefox } from '../../mocks/info'
import { runInAction } from 'mobx'
import GlobalState from '../../stores/GlobalState'
import { isSafariDesktop } from '../../mocks/info'
import classNames from 'classnames'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { observer } from 'mobx-react'
const Intro = observer(() => {
  const circle = useRef(null)
  const left = useRef<Array<any>>(Array())
  const right = useRef<Array<any>>(Array())
  const tlLeft = useRef<any>(null)
  const tlRight = useRef<any>(null)
  const intro = useRef<any>(null)
  const scrollDown = useRef<any>(null)

  useEffect(() => {
    if (!left.current || !right.current) return

    if (is_firefox) {
      left.current.forEach((l: Element) => {
        if (l) {
          ;(l as any).style.opacity = '1'
        }
      })
      setTimeout(() => {
        left.current.forEach((l: HTMLElement, i: number) => {
          if (l) {
            setTimeout(() => {
              l.classList.add('animated')
            }, 100 + i * 100)
          }
        })
      }, 0)

      setTimeout(() => {
        right.current.forEach((l: HTMLElement, i: number) => {
          if (l) {
            setTimeout(() => {
              l.classList.add('animated')
            }, 100 + i * 100)
          }
        })
      }, 2000)

      return
    }
    if (!isSafariDesktop) {
      gsap.from('.intro__left', {
        y: 100,
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
      })
      gsap.from('.intro__right', {
        y: -100,
        opacity: 0,
        duration: 0.5,
        delay: 1.2,
      })
      tlLeft.current = gsap.timeline({})
      left.current = left.current.filter((l) => l)
      left.current &&
        tlLeft.current.from(left.current, {
          yPercent: -100,
          duration: 0.3,
          stagger: isTouch ? 0 : 0.2,
          ease: 'sine',
        })
      tlLeft.current.delay(1.5)
      tlRight.current = gsap.timeline({})
      right.current &&
        tlRight.current.from(right.current, {
          yPercent: 100,
          duration: 0.5,
          stagger: isTouch ? 0 : 0.2,
        })
      tlRight.current.delay(2)
    } else {
      gsap.to('.intro__right', {
        opacity: 1,
        duration: 0.5,
        delay: 1.2,
      })

      gsap.to('.intro__left', {
        opacity: 1,
        duration: 0.5,
        delay: 0.8,
      })
    }
  }, [])

  // useEffect(() => {
  //   console.log(GlobalState.locoScroll)
  //   let step = 0,
  //     flag = false
  //   GlobalState.locoScroll &&
  //     (GlobalState.locoScroll as any).on('scroll', (args: any) => {
  //       let scroll: any = document.querySelector('#root>.scroll-down')
  //       console.log(args.scroll.y)
  //       if (args.scroll.y >= (scroll as HTMLElement).offsetTop) {
  //         flag = true
  //       } else flag = false

  //       if (flag) {
  //         step += 30
  //         //scrollDown.current
  //         // scroll.style.transform = `translateY(${step}px)`
  //         // ;(scroll as HTMLElement).style.position = 'fixed'
  //         // ;(scroll as HTMLElement).style.top = `calc(${100 + step}vh - 40px)`
  //         // ;(scroll as HTMLElement).style.right = '40px'
  //       }
  //     })
  //   // console.log(
  //   //   (document.querySelector(
  //   //     '.main-projects',
  //   //   ) as HTMLElement).getBoundingClientRect(),
  //   // )
  //   // gsap.to(scrollDown.current, {
  //   //   scrollTrigger: {
  //   //     trigger: scrollDown.current,
  //   //     pin: true,
  //   //     scrub: 1,
  //   //     start: 'bottom bottom',
  //   //     endTrigger: '.main-projects',
  //   //     end: 'top bottom-=40',
  //   //     pinSpacing: false,
  //   //   },
  //   // })
  // }, [GlobalState.locoScroll])

  return (
    <section
      className="intro"
      ref={(el) => {
        intro.current = el
        runInAction(() => {
          GlobalState.introRef = intro.current
        })
      }}
    >
      <div className="circle-yellow" ref={circle}></div>
      <div
        className={classNames(
          'intro__left',
          isSafariDesktop && !is_firefox && 'safari',
        )}
      >
        <div className="intro__left-block mb-60">
          <a href="#" className="intro__left-link mb-15 intro__left-wrap">
            <span
              className={is_firefox ? 'firefox' : ''}
              ref={(el) => {
                left.current && left.current.push(el)
              }}
            >
              {' '}
              Discovery &amp; UX Strategy
            </span>
          </a>
          <ul className="intro__left-list">
            <li className="intro__left-item intro__left-wrap">
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                {' '}
                Market trends and research
              </span>
            </li>
            <li className="intro__left-item intro__left-wrap">
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                {' '}
                Target audience
              </span>
            </li>
            <li className="intro__left-item intro__left-wrap">
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                Competitive analysis
              </span>
            </li>
            <li className="intro__left-item intro__left-wrap">
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                {' '}
                Branding
              </span>
            </li>
          </ul>
        </div>
        <div className="intro__left-row">
          <div className="intro__left-block">
            <a href="#" className="intro__left-link mb-15  intro__left-wrap">
              {' '}
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                MVP Build &amp; Launch
              </span>
            </a>
            <ul className="intro__left-list">
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  Product logic
                </span>
              </li>
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  {' '}
                  Wireframing and prototyping
                </span>
              </li>
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  Responsive Design
                </span>
              </li>
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  UI Styleguides &amp; Design systems
                </span>
              </li>
            </ul>
          </div>
          <div className="intro__left-block">
            <a href="#" className="intro__left-link mb-15 intro__left-wrap">
              {' '}
              <span
                className={is_firefox ? 'firefox' : ''}
                ref={(el) => {
                  left.current && left.current.push(el)
                }}
              >
                {' '}
                Redesign &amp; Improve
              </span>
            </a>
            <ul className="intro__left-list">
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  Business analysis and research
                </span>
              </li>
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  {' '}
                  Improvement Strategy
                </span>
              </li>
              <li className="intro__left-item intro__left-wrap">
                <span
                  className={is_firefox ? 'firefox' : ''}
                  ref={(el) => {
                    left.current && left.current.push(el)
                  }}
                >
                  UX Audit &amp; Recommendations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="intro__center">
        <div className="intro__mob">
          <div className="intro__title">Face to face with interface</div>
          <h2 className="intro__subtitle">
            We create digital experience of websites and mobile applications for
            startups and existing businesses
          </h2>
        </div>
        <Sculpture circle={circle} />
      </div>
      <div
        className={classNames(
          'intro__right',
          isSafariDesktop && !is_firefox && 'safari',
        )}
      >
        <div className="intro__right-line">
          <div
            className={classNames('intro__right-text', is_firefox && 'firefox')}
            ref={(el) => right.current && right.current.push(el)}
          >
            {' '}
            We create digital
          </div>
        </div>
        <div className="intro__right-line">
          <div
            className={classNames('intro__right-text', is_firefox && 'firefox')}
            ref={(el) => right.current && right.current.push(el)}
          >
            experience of websites
          </div>
        </div>
        <div className="intro__right-line">
          <div
            className={classNames('intro__right-text', is_firefox && 'firefox')}
            ref={(el) => right.current && right.current.push(el)}
          >
            and mobile apps for
          </div>
        </div>
        <div className="intro__right-line">
          <div
            className={classNames('intro__right-text', is_firefox && 'firefox')}
            ref={(el) => right.current && right.current.push(el)}
          >
            {' '}
            startups and existing
          </div>
        </div>
        <div className="intro__right-line">
          <div
            className={classNames('intro__right-text', is_firefox && 'firefox')}
            ref={(el) => right.current && right.current.push(el)}
          >
            products
          </div>
        </div>
        <div className="scroll-down" ref={scrollDown}>
          <span>Scroll down</span>
        </div>
       
      </div>
    </section>
  )
})

export default Intro
