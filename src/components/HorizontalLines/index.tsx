import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import './hl.scss'
import { gsap } from 'gsap'
import { isTouch } from '../../mocks/info'
import ScrollTrigger from 'gsap/ScrollTrigger'
const HorizontalLines = () => {
  const one = useRef<any>(null),
    two = useRef<any>(null),
    three = useRef<any>(null),
    lines = useRef<any>(null)

  useEffect(() => {
    setTimeout(() => {
      if (!lines.current || !one.current || !two.current || !three.current)
        return

      if (!isTouch) {
        gsap.set(one.current, { x: -7400 })
        gsap.set(two.current, { x: -11000 })
        gsap.set(three.current, { x: -3940 })
      } else {
        gsap.set(one.current, { x: -3400 })
        gsap.set(two.current, { x: -6000 })
        gsap.set(three.current, { x: -1940 })
      }
      gsap.timeline({
        scrollTrigger: {
          trigger: '.lines__container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            if (self.direction == 1) {
              gsap.to(one.current, {
                x: '-=10',
                ease: 'power2',
              })
              gsap.to(two.current, {
                x: '+=10',
                ease: 'power2',
              })
              gsap.to(three.current, {
                x: '-=20',
                ease: 'power2',
              })
            } else {
              gsap.to(one.current, {
                x: '+=10',
                ease: 'power2',
              })
              gsap.to(two.current, {
                x: '-=10',
                ease: 'power2',
              })
              gsap.to(three.current, {
                x: '+=20',
                ease: 'power2',
              })
            }
          },
        },
      })
    })
  }, [])

  return (
    <section className="lines" ref={lines} >
      <div className="lines__container">
        <div className="lines__item one">
          <div className="lines__item-inner" ref={one}>
            <span className="lines__text transparent">
              Discovery &amp; Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span> Market trends and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Target audience</span>{' '}
            <span className="lines__text icon">✺</span> Competitor  analysis{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>
            <span className="lines__text icon">✺</span>Discovery &amp; Strategy
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Market trends and research
            </span>{' '}
            <span className="lines__text icon">✺</span>Target audience
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Competitor  analysis
            </span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Discovery &amp; Strategy
            </span>
            <span className="lines__text icon">✺</span> Market trends and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Target audience</span>{' '}
            <span className="lines__text icon">✺</span> Competitor  analysis{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>
            <span className="lines__text icon">✺</span>Discovery &amp; Strategy
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Market trends and research
            </span>{' '}
            <span className="lines__text icon">✺</span>Target audience
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Competitor  analysis
            </span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Discovery &amp; Strategy
            </span>
            <span className="lines__text icon">✺</span> Market trends and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Target audience</span>{' '}
            <span className="lines__text icon">✺</span> Competitor  analysis{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>
            <span className="lines__text icon">✺</span>Discovery &amp; Strategy
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Market trends and research
            </span>{' '}
            <span className="lines__text icon">✺</span>Target audience
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Competitor  analysis
            </span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Discovery &amp; Strategy
            </span>
          </div>
        </div>
        <div className="lines__item two">
          <div className="lines__item-inner" ref={two}>
            <span className="lines__text transparent">
              MVP Build &amp; Launch
            </span>{' '}
            <span className="lines__text icon">✺</span> logic{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Wireframing and prototyping
            </span>{' '}
            <span className="lines__text icon">✺</span> Responsive Design{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>{' '}
            <span className="lines__text icon">✺</span> MVP Build &amp; Launch{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">logic</span>{' '}
            <span className="lines__text icon">✺</span> Wireframing and
            prototyping <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Responsive Design</span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              MVP Build &amp; Launch
            </span>{' '}
            <span className="lines__text icon">✺</span> logic{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Wireframing and prototyping
            </span>{' '}
            <span className="lines__text icon">✺</span> Responsive Design{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>{' '}
            <span className="lines__text icon">✺</span> MVP Build &amp; Launch{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">logic</span>{' '}
            <span className="lines__text icon">✺</span> Wireframing and
            prototyping <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Responsive Design</span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              MVP Build &amp; Launch
            </span>{' '}
            <span className="lines__text icon">✺</span> logic{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Wireframing and prototyping
            </span>{' '}
            <span className="lines__text icon">✺</span> Responsive Design{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Branding</span>{' '}
            <span className="lines__text icon">✺</span> MVP Build &amp; Launch{' '}
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">logic</span>{' '}
            <span className="lines__text icon">✺</span> Wireframing and
            prototyping <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">Responsive Design</span>{' '}
            <span className="lines__text icon">✺</span>Branding
            <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              MVP Build &amp; Launch
            </span>{' '}
          </div>
        </div>
        <div className="lines__item three">
          <div className="lines__item-inner" ref={three}>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
            <span className="lines__text transparent">
              Redesign &amp; Improve
            </span>{' '}
            <span className="lines__text icon">✺</span> Business analysis and
            research <span className="lines__text icon">✺</span>{' '}
            <span className="lines__text transparent">
              Improvement Strategy
            </span>{' '}
            <span className="lines__text icon">✺</span>UX Audit &amp;
            Recommendations
            <span className="lines__text icon">✺</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalLines
