import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import help1 from '../../images/icons/help1.svg'
import help2 from '../../images/icons/help2.svg'
import help3 from '../../images/icons/help3.svg'
import help4 from '../../images/icons/help4.svg'
import help5 from '../../images/icons/help5.svg'
import { useLottie } from 'lottie-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import lottie from 'lottie-web'
import {
  isSafariDesktop,
  isTouch,
  is_firefox,
  is_opera,
} from '../../mocks/info'
import dt from '../../mocks/lottie.json'
import MagnetButton from '../common/MagnetButton'
const HelpCircle = () => {
  const [svgScheme, set] = useState<any>(null)
  const helpSvg = useRef<any>(null)
  const anim = useRef<any>(null)
  const items = useRef<any>(Array())
  const helpWay = useRef<any>(null)
  const helpProgress = useRef<any>(null)
  const helpCircle = useRef<any>(null)
  let timeObj = { currentFrame: 0 }

  // useEffect(() => {
  //   const controller = new AbortController()
  //   const signal = controller.signal

  //   //  set(`${process.env.PUBLIC_URL + '/json/lottie.json'}`)
  //   fetch(`${process.env.PUBLIC_URL + '/json/lottie.json'}`, {
  //     signal: signal,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => set(res))

  //   return () => controller.abort()
  // }, [])

  useEffect(() => {
    if (!helpSvg.current) return

    if (window.innerWidth > 1024) {
      anim.current = lottie.loadAnimation({
        container: helpSvg.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: dt,
      })
    }
  }, [])
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setTimeout(() => {
        if (!anim.current || !items.current) return
        if (!helpProgress.current || !helpWay.current) return
        const helpSection = document.querySelector('.help')
        if (!helpSection || !helpCircle.current) return
        let circumferenceProgress =
          Math.PI * parseFloat(helpProgress.current.getAttribute('r')) * 2
        let circumferenceWay =
          Math.PI * parseFloat(helpWay.current.getAttribute('r')) * 2
        helpWay.current.setAttribute('stroke-dasharray', circumferenceWay)
        helpWay.current.setAttribute('stroke-dashoffset', circumferenceWay)
        helpProgress.current.setAttribute(
          'stroke-dasharray',
          circumferenceProgress,
        )
        helpProgress.current.setAttribute(
          'stroke-dashoffset',
          circumferenceProgress,
        )

        const animateProgress = (
          shape: any,
          percent: any,
          circumference: any,
        ) => {
          let offset = circumference - (circumference * percent) / 100
          shape.setAttribute('stroke-dashoffset', offset)
        }

        const animateItem = (item: any, i: number) => {
          if (document.querySelector('.help__content.active')) {
            document
              .querySelector('.help__content.active')
              ?.classList.remove('active')
          }
          item?.classList.add('active')
          gsap.to(timeObj, {
            duration: is_opera || is_firefox ? 0.5 : 1,
            currentFrame: Math.floor(
              0.25 * (i == 0 ? 0.7 : i) * (anim.current.totalFrames - 1),
            ),
            onUpdate: () => {
              anim.current.goToAndStop(timeObj.currentFrame, true)
            },
            ease: 'ease',
          })

          animateProgress(helpProgress.current, 25 * i, circumferenceProgress)
        }

        ScrollTrigger.create({
          trigger: '.help-container',
          start: 'top bottom',
          scrub: 1,
          onEnter: () => {
            items.current[0]?.classList.add('active')
            animateItem(items.current[0], 0)
            animateProgress(helpWay.current, 100, circumferenceWay)
          },
        })

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: isTouch ? helpCircle.current : '.help',
            pin: true,
            start: 'top top',
            end: window.innerWidth > 1900 ? '+=4500' : '+=2600', //2200
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        items.current &&
          items.current.forEach((item: any, i: number) => {
            if (item) {
              tl.from(item, {
                ease: 'power2',
                scrollTrigger: {
                  trigger: (helpSection as any).parentNode,
                  start:
                    i == 0
                      ? '+=0'
                      : window.innerWidth > 1900
                      ? '+=' + (900 * i - 200)
                      : '+=' + (550 * i - 50), //450
                  end: window.innerWidth > 1900 ? '+=900' : '+=450',
                  scrub: 1,
                  refreshPriority: -1,

                  onEnter: (self) => {
                    animateItem(item, i)
                  },
                  onEnterBack: (self) => {
                    animateItem(item, i)
                  },
                },
              })
            }
          })
      })
    } else {
    }
  })

  return (
    <div className="help__col" ref={helpCircle}>
      <div className="help__circle">
        <svg
          className="help-circle"
          viewBox="0 0 664 664"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="help-way"
            cx="332"
            cy="332"
            r="332"
            ref={helpWay}
          />
          <circle
            className="help-progress"
            cx="332"
            cy="332"
            r="327"
            ref={helpProgress}
          />
        </svg>
      </div>
      <div className="help__animate">
        {' '}
        <div className="help__svg" ref={helpSvg}></div>
        <div
          className="help__content"
          ref={(el) => {
            items.current &&
              !items.current.includes(el) &&
              items.current.push(el)
          }}
        >
          <div className="help__content-icon">
            <img src={help1} alt="" />
          </div>
          <div className="help__content-title">
            WE WILL HELP YOU BETTER UNDERSTAND YOUR USERS
          </div>
          <div className="help__content-text">
            For our clients to get a solid understanding of the needs and
            behavior of their customers, we conduct business research, create
            user scenarios and a map of screens. This helps to immediately
            improve the UX of a website or an app as it shows what’s lacking.
          </div>
        </div>
        <div
          className="help__content"
          ref={(el) => {
            items.current &&
              !items.current.includes(el) &&
              items.current.push(el)
          }}
        >
          <div className="help__content-icon">
            <img src={help2} alt="" />
          </div>
          <div className="help__content-title">
            WE MOVE IN SHORT AND EFFICIENT ITERATIONS
          </div>
          <div className="help__content-text">
            We value our own and other people's time. This is why the evaluation
            is an important step of web design we never miss. With a list of
            screens in front of our eyes, we predict how long each stage of work
            on the project will take.
          </div>
        </div>
        <div
          className="help__content"
          ref={(el) => {
            items.current &&
              !items.current.includes(el) &&
              items.current.push(el)
          }}
        >
          <div className="help__content-icon">
            <img src={help3} alt="" />
          </div>
          <div className="help__content-title">CREATING A PROTOTYPE</div>
          <div className="help__content-text">
            To test user flows, we create project wireframes and make an
            interactive prototype out of them. Spending 5 hours creating
            wireframes saves you 30 hours during the design phase and 50 hours
            during the development phase. Prototyping is vital for high-quality
            results regarding user experience as it gives you the opportunity to
            check the functionality and increases the likelihood of eliminating
            all unnecessary steps and clicks.
          </div>
        </div>
        <div
          className="help__content"
          ref={(el) => {
            items.current &&
              !items.current.includes(el) &&
              items.current.push(el)
          }}
        >
          <div className="help__content-icon">
            <img src={help4} alt="" />
          </div>
          <div className="help__content-title">
            SET YOU APART FROM COMPETITORS
          </div>
          <div className="help__content-text">
            This stage aims to attract attention to your product, be it an app,
            a service or a website. How? Through impressive and vivid design as
            well as simple and intuitive interaction. In doing so, we detach it
            from competitors, which will expand the audience of your brand and
            increase the number of leads.
          </div>
        </div>
        <div
          className="help__content"
          ref={(el) => {
            items.current &&
              !items.current.includes(el) &&
              items.current.push(el)
          }}
        >
          <div className="help__content-icon">
            <img src={help5} alt="" />
          </div>
          <div className="help__content-title">DEVELOPMENT</div>
          <div className="help__content-text">
            Our agency provides a full set of digital assets for developers (UI
            kit, user scenarios, interactive prototype, fonts, etc.), maximizing
            the project’s rapid launch. Moreover, we are always open to further
            collaboration when it comes to app or web development.
          </div>
        </div>
        <MagnetButton
          wrapperClass="appear help__btn"
          path="/text-us"
          classList="btn-primary btn-md"
          text="Start a project"
        />
      </div>
    </div>
  )
}

export default HelpCircle
