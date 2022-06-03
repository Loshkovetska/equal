import './selected-cases.scss'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ParallaxItem from '../ParallaxItem'
import { observer } from 'mobx-react'
import GlobalState from '../../stores/GlobalState'
import MagnetButton from '../common/MagnetButton'

import PowerTitle from '../common/PowerTitle'
import ScrollTrigger from 'gsap/ScrollTrigger'
import cases from '../Case/cases'

const SelectedCases = observer(() => {
  const tl = useRef<any>(null)
  const casesRef = useRef<any>(null)
  const [casesData, setState] = useState<any>(cases)

  useEffect(() => {
    if (!casesData) return
    if (!GlobalState.scrollRef) return

    setTimeout(() => {
      const appear = document.querySelectorAll('.appear')
      gsap.from(appear, {
        ease: 'power2',
        scrollTrigger: {
          trigger: '.appear',
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        transformOrigin: 'center',
        y: 200,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      })
    })
  }, [])

  if (!casesData) return <></>
  return (
    <section className="selected-cases" ref={casesRef}>
      <PowerTitle
        count={casesData.length}
        section="selected-cases"
        classList=""
      />
      <div className="selected-cases__list cases-list">
        {casesData.slice(0, 6).map((c: any, idx: number) => (
          <div className="cases-item" key={idx}>
            <ParallaxItem item={c} />
            <div className="cases-item__info">
              <div className="cases-item__title">{c.title}</div>
              <div className="cases-item__type">{c.types.join(' / ')}</div>
            </div>
          </div>
        ))}
      </div>
      <MagnetButton
        path="/cases"
        text="Show more projects"
        classList="btn-primary btn-md toggle-cases"
        wrapperClass="appear appear--home"
      />
    </section>
  )
})

export default SelectedCases
