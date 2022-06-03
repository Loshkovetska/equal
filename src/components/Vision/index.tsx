import { useEffect, useRef } from 'react'
import VisionCarousel from '../VisionCarousel'
import './vision.scss'
import gsap from 'gsap'
import { isTouch } from '../../mocks/info'
const Vision = () => {
  const shows = useRef<any>(Array())
  useEffect(() => {
    setTimeout(() => {
      if (!document.querySelector('.vision') || !shows.current) return

      var tl = gsap.timeline({
        ease: 'power2',
        scrollTrigger: {
          trigger: '.vision',
          start: isTouch ? 'top bottom' : 'top center',
          toggleActions: 'play none none none',
        },
      })

      shows.current = shows.current.filter((s: any) => s)
      tl.from(shows.current, {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.2,
      })
    })
  }, [])
  return (
    <section className="vision">
      <div className="vision__title">
        <div className="vision__sub-cont">
          <div
            className="vision__sub-text"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            {' '}
            {window.innerWidth > 768 ? 'our vision' : 'We believe'}
          </div>
        </div>
        <div className="vision__title-cont">
          <div
            className="vision__title-text indent"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            {' '}
            {window.innerWidth <= 768 ? '' : 'We believe '}that a successful{' '}
          </div>
        </div>
        <div className="vision__title-cont">
          <div
            className="vision__title-text"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            product is the right{' '}
            <span className="vision__title-text transparent"> balance </span>
          </div>
        </div>
        <div className="vision__title-cont">
          <div className="vision__title-text">
            between customer problems and
          </div>
        </div>
        <div className="vision__title-cont">
          <div
            className="vision__title-text"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            {' '}
            business goals
          </div>
        </div>
      </div>
      <VisionCarousel />
      <div className="vision__bottom">
        <div className="vision__botton-cont">
          <div
            className="vision__bottom-text"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            Therefore, to describe us in one
          </div>
        </div>
        <div className="vision__botton-cont">
          <div
            className="vision__bottom-text"
            ref={(el) => {
              shows.current &&
                !shows.current.includes(el) &&
                shows.current.push(el)
            }}
          >
            word — we are Equal
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
