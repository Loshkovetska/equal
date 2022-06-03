import { useEffect, useLayoutEffect, useRef } from 'react'
import './estimate.scss'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router'

const Estimate = () => {
  const estimate = useRef<any>(null)
  const history = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if(!estimate.current) return
      gsap.to('.estimate', {
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: 'ease',
      })
      gsap.to('.estimate', {
        scrollTrigger: {
          scroller: '.smooth',
          trigger: '.estimate',
          pin: true,
          scrub: 1,
          start: 'bottom bottom',
          endTrigger: '.case-next',
          end: 'top bottom+=500',
          pinSpacing: false,
          onLeave: () => {
            gsap.to('.estimate', {
              opacity: 0,
              duration: 0.6,
              ease: 'ease',
            })
          },
          onEnterBack: () => {
            gsap.to('.estimate', {
              opacity: 1,
              duration: 0.6,
              ease: 'ease',
            })
          },
        },
      })
    })
  }, [])

  return (
    <div
      className="estimate"
      ref={estimate}
      onClick={() => history('/text-us')}
    >
      <div className="btn-primary btn-circle">Estimate</div>
    </div>
  )
}
export default Estimate
