import { useEffect, useRef } from 'react'
import './main-projects.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { observer } from 'mobx-react'
import { isSafariDesktop, isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'

const MainProjects = observer(() => {
  const mainProjects = useRef<any>(null)
  const lines = useRef<any>(Array())
  const mobLines = useRef<any>(Array())
  const rotateRef = useRef<any>(null)
  const yellowCircle = useRef<any>(null)
  const yellowBottomCircle = useRef<any>(null)

  useEffect(() => {
    setTimeout(() => {
      if (!isTouch) {
        if (!yellowCircle.current || !yellowBottomCircle.current) return
        if (!document.querySelector('.selected-cases')) return
        if (!mainProjects.current) return
        gsap.from(yellowCircle.current, {
          scrollTrigger: {
            trigger: mainProjects.current,
            start: 'top top+=2',
          },
          y: -300,
          transformOrigin: 'center',
          ease: 'back.BackInOut(1.9)',
          duration: 1,
        })
        gsap.from(yellowBottomCircle.current, {
          scrollTrigger: {
            trigger: mainProjects.current,
            start: 'top top+=2',
          },
          y: 300,
          transformOrigin: 'center',
          ease: 'back.BackInOut(1.9)',
          duration: 1,
        })
        gsap.to('.main-projects', {
          scrollTrigger: {
            trigger: '.main-projects',
            pin: true,
            start: 'top top',
            end: isSafariDesktop ? '+=1000' : '+=1000',
            scrub: !isTouch ? 0.5 : false, //!isTouch
            invalidateOnRefresh: true,
          },
        })

        GlobalState.locoScroll &&
          (GlobalState.locoScroll as any).on('scroll', (args: any) => {
            const smooth = document.querySelector('.smooth')
            const rotate = smooth!.querySelector('.main-projects .rotate-180')

            var bodyRect = smooth!.getBoundingClientRect(),
              elemRect = rotate!.getBoundingClientRect(),
              offset = elemRect.top - bodyRect.top
            const translate = (rotate! as HTMLElement).style.transform
            if (args.scroll.y > offset - 100 && !translate.includes('100%')) {
              rotate?.classList.add('rotate')
            } else rotate?.classList.remove('rotate')
          })

        // ScrollTrigger.create({
        //   scroller: '.smooth',
        //   trigger: '.selected-cases',
        //   start: 'top bottom-=1',
        //   onToggle: (self) => {
        //     if (self.direction == 1) {
        //       gsap.to('.main-projects .rotate-180', {
        //         transformOrigin: 'center',
        //         rotate: '+=180',
        //         duration: 0.5,
        //         ease: 'sine',
        //       })
        //     }
        //   },
        // })
      }
      if (!mainProjects.current || !mainProjects.current.parentNode) return
      if (window.innerWidth <= 767) {
        lines.current = mobLines.current.filter((m: any) => m)
        lines.current.forEach((element: HTMLElement, i: number) => {
          var tl = gsap.timeline({})
          if (element) {
            tl.from(element, {
              yPercent: 100,
              opacity: 0,
              ease: 'power0',
              scrollTrigger: {
                trigger: mainProjects.current.parentNode,
                start: '+=' + (150 * (i + 1) - 100),
                end: '+=' + (element as any).innerHeight * (i + 1),
                scrub: 1,
              },
            })
          }
        })
      } else
        lines.current &&
          lines.current.forEach((element: HTMLElement, i: number) => {
            var tl = gsap.timeline({})
            if (element) {
              tl.from(element, {
                yPercent: 100,
                opacity: 0,
                ease: 'power2',
                scrollTrigger: {
                  trigger: mainProjects.current.parentNode,
                  start: '+=' + (300 * (i + 1) - 200),
                  end: '+=' + (element as any).innerHeight * (i + 1),
                  scrub: 0.5,
                },
              })
            }
          })
    })
  }, [])

  return (
    <div className="main-projects" ref={mainProjects}>
      <span className="circle-yellow" ref={yellowCircle}></span>
      <span className="circle-bottom-yellow" ref={yellowBottomCircle}></span>

      <h2
        className="subheading mb-80"
        ref={(e) => {
          lines.current && lines.current.push(e)
        }}
      >
        Our agency brings to life projects{' '}
        <b>from ideas to finished products</b>. Not only do we provide striking
        visual solutions but also a working strategy. We have expertise in areas
        such as
      </h2>
      <div className="main-projects__content mb-60">
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => lines.current && lines.current.push(e)}
          >
            Fintech
            <span className="text-transparent"> ECOMMERCE</span>
          </div>
        </div>
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => lines.current && lines.current.push(e)}
          >
            <span className="text-transparent">marketplace </span> HEALTHCARE
          </div>
        </div>
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => lines.current && lines.current.push(e)}
          >
            EdTech
            <span className="text-transparent"> real estate</span>{' '}
          </div>
        </div>
      </div>
      <div className="main-projects__content main-projects__content--mob mb-40">
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => mobLines.current && mobLines.current.push(e)}
          >
            Fintech
            <span className="text-transparent"> ECOMMERCE</span>
          </div>
        </div>
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => mobLines.current && mobLines.current.push(e)}
          >
            marketplace
            <span className="text-transparent"> HEALTHCARE</span>
          </div>
        </div>
        <div className="main-projects__row">
          <div
            className="main-projects__row-cont"
            ref={(e) => mobLines.current && mobLines.current.push(e)}
          >
            EdTech
            <span className="text-transparent"> real estate</span>{' '}
          </div>
        </div>
      </div>
      <div
        className="scroll-image rotate-180"
        ref={(el) => {
          lines.current && lines.current.push(el)
          mobLines.current && mobLines.current.push(el)
          rotateRef.current = el
        }}
      >
        <svg
          width="38"
          height="76"
          viewBox="0 0 38 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1.45444e-06 33.2736L16.355 17.1567L16.355 58.796L-1.86763e-06 42.7264L-2.50395e-06 57.2836L18.9757 76L38 57.2836L38 42.7264L21.5964 58.796L21.5964 17.1567L38 33.2736L38 18.6692L18.9757 -8.31577e-07L-8.16055e-07 18.6692L-1.45444e-06 33.2736Z"
            fill="#2B2727"
          />
        </svg>
      </div>
    </div>
  )
})

export default MainProjects
