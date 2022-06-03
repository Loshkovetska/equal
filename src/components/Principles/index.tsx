import { useEffect, useLayoutEffect, useRef } from 'react'
import LazyLoader from '../LazyLoader'
import './principles.scss'
import ScrollTrigger from 'gsap/ScrollTrigger'
import img from '../../images/principles-timelapse-bg.png'
import gsap from 'gsap'
import { isTouch } from '../../mocks/info'
const Principles = () => {
  const principles = useRef<any>(null)
  const blocks = useRef<any>(Array())
  const title = useRef<any>(Array())
  const video = useRef<any>(null)

  useEffect(() => {
    setTimeout(() => {
      if (
        !principles.current ||
        !title.current ||
        !document.querySelector('.principles-wrapper')
      )
        return
      ScrollTrigger.create({
        trigger: '.principles-wrapper',
        start: 'top bottom-=141',
        end: 'bottom bottom-=1',
        scrub: 1,
      })
      if (!isTouch) {
        title.current = title.current.filter((b: any) => b)
        gsap.from([title.current[0], title.current[1]], {
          ease: 'power2',
          scrollTrigger: {
            trigger: '.principles',
            start: 'top center',
            toggleActions: 'play none none none',
          },
          yPercent: 100,
          duration: 1,
          stagger: 0.2,
          delay: 0.4,
        })
        gsap.to('.principles', {
          scrollTrigger: {
            trigger: '.principles',
            pin: true,
            start: 'top top',
            end: '+=4000',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        blocks.current = blocks.current.filter((b: any) => b)

        blocks.current.forEach((element: any, i: number) => {
          var tl = gsap.timeline({})
          if (element) {
            tl.from(element, {
              yPercent: 200,
              opacity: 0,
              ease: 'power2',
              scrollTrigger: {
                trigger: principles.current.parentNode,
                start: '+=' + (450 + 300 * i) * (i + 1),
                end: '+=' + (element as any).innerHeight * (i + 1),
                scrub: 1,
              },
            })
          }
        })
      }

      if (window.innerWidth <= 768) {
        blocks.current.forEach((element: any, i: number) => {
          var tl = gsap.timeline({})
          if (element) {
            tl.from(element, {
              opacity: 0,
              ease: 'power2',
              duration: 0.3,
            })
          }
        })
      }
    })

    return () => {
      const all = ScrollTrigger.getAll()
      all && all.forEach((a) => a.kill())
    }
  }, [])

  return (
    <div className="principles-wrapper">
      <section className="principles" ref={principles}>
        <div className="principles__top">
          <div className="principles__title">
            <div className="principles__title-cont">
              <span
                className="principles__title-text"
                ref={(el) => {
                  title.current &&
                    !title.current.includes(el) &&
                    title.current.push(el)
                }}
              >
                Principles
              </span>
            </div>
            <div className="principles__title-cont">
              <span
                className="principles__title-text"
                ref={(el) => {
                  title.current &&
                    !title.current.includes(el) &&
                    title.current.push(el)
                }}
              >
                of work
              </span>
            </div>
          </div>
          <div className="principles__video" ref={video}>
            <LazyLoader
              classList=""
              preload="auto"
              autoplay={true}
              muted={true}
              loop={true}
              src={img}
              srcFetch={img}
              type="img"
            />
            <LazyLoader
              classList="principle-video"
              preload="auto"
              autoplay={true}
              muted={true}
              loop={true}
              src={process.env.PUBLIC_URL + '/videos/Equal_timelapse.mp4'}
              srcFetch={'https://equal.design/videos/Equal_timelapse.mp4'}
              type="video"
            />
          </div>
        </div>
        <div className="principles__content">
          <div
            className="principles__block"
            ref={(el) => {
              blocks.current &&
                !blocks.current.includes(el) &&
                blocks.current.push(el)
            }}
          >
            <div className="principles__block-title">simplicity</div>
            <div className="principles__block-text">
              A beautiful interface and trendy illustrations do not guarantee a
              hit. At the heart of any top mobile app or website there is a
              workable system. The first thing we always think about is how to
              make it easier for a user to achieve their objective? We conduct a
              detailed study searching for the best design practices and
              solutions to use in our own projects.
            </div>
          </div>
          <div
            className="principles__block"
            ref={(el) => {
              blocks.current &&
                !blocks.current.includes(el) &&
                blocks.current.push(el)
            }}
          >
            <div className="principles__block-title">partnership</div>
            <div className="principles__block-text">
              {' '}
              We take a proactive position in the projects we undertake. We
              discuss all ideas, features and functionality with the client,
              listen to them carefully, share knowledge, and use our cumulative
              experience to give exactly what their digital business and their
              users need.{' '}
            </div>
          </div>
          <div
            className="principles__block"
            ref={(el) => {
              blocks.current &&
                !blocks.current.includes(el) &&
                blocks.current.push(el)
            }}
          >
            <div className="principles__block-title">commitment</div>
            <div className="principles__block-text">
              {' '}
              Our design team doesn't put projects on the back burner. Our
              motivation is to make the client want to recommend us, and we are
              proud to post a link to a working project in our portfolio. Rest
              assured, it is in our best interest to provide our clients with
              excellent design as we do care about each project.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Principles
