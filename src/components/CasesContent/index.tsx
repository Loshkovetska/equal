import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'
import cases from '../Case/cases'
import MagnetButton from '../common/MagnetButton'
import PowerTitle from '../common/PowerTitle'
import ParallaxCase from '../ParallaxItem'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './cases.scss'
import { observer } from 'mobx-react'
import SplitText from '../common/SplitText'
import { Animated } from 'react-animated-css'

import 'animate.css/animate.css'

const CasesContent = observer(() => {
  const [casesData, setState] = useState<any>(null)
  const [caseDt, set] = useState<any>(cases)
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const menuItems = [
    {
      title: 'all projects',
      link: '/cases',
      tab: 'cases',
    },
    {
      title: 'web apps',
      link: '/cases/web-app',
      tab: 'web app',
    },
    {
      title: 'mobile apps',
      link: '/cases/mobile-app',
      tab: 'mobile app',
    },
    {
      title: 'websites',
      link: '/cases/website',
      tab: 'website',
    },
    {
      title: 'VR&AR',
      link: '/cases/VR&AR',
      tab: 'VR&AR',
    },
  ]

  const filterByType = (dt: any) => {
    const tab = pathname.includes('-')
      ? pathname.split('/').pop()?.split('-').join(' ')
      : pathname.split('/').pop()
    switch (tab) {
      case 'cases':
        setState(dt)
        break
      case `${tab}`:
        const res = dt.filter((d: any) => {
          let flag = false
          d.types.forEach((t: string) => {
            if (t.toLocaleLowerCase().includes(tab.toLocaleLowerCase())) {
              flag = true
            }
          })

          if (flag) return d
        })

        setState(res)
        break
    }
  }

  useEffect(() => {
    if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()
    filterByType(cases)
    ScrollTrigger.refresh()
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      const title = document.querySelectorAll('.selected-cases__title-text')
      if (!title || !document.querySelector('.cases-page')) return
      var tl = gsap.timeline({
        ease: 'power2',
        scrollTrigger: {
          trigger: `.cases-page`,
          start: isTouch ? 'top bottom' : 'top center',
          toggleActions: 'play none none none',
        },
      })
      tl.from(title, {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.6,
        stagger: 0.2,
      })

      const casePage = document.querySelector('.cases-page')
      if (casePage) {
        document.body.style.background = 'transparent'
      }
    })
  }, [])

  return (
    <section className="cases-page">
      <div
        className="cases-page__back"
        // onClick={() => (window.location.href = '/')}
      >
        <SplitText text={`< Back`} path="/" classList="" target />
      </div>
      <PowerTitle
        count={caseDt ? caseDt.length : 0}
        section="cases-page"
        classList=""
      />
      <div className="cases-page__menu cases-menu">
        {menuItems.map((m, idx) => (
          <Link
            className={classNames(
              'cases-menu__item',
              pathname.split('/').pop() == m.link.split('/').pop() && 'active',
            )}
            to={`${m.link}`}
            key={idx}
          >
            {m.title}
          </Link>
        ))}
      </div>
      <div className="selected-cases__list cases-list">
        {casesData &&
          casesData.map((c: any, idx: number) => (
            <div className="cases-item ">
              <Animated
                animationIn="fadeInUp"
                animationOut="fadeIn"
                animationInDuration={1500}
                animationOutDuration={1500}
                isVisible={true}
                key={idx}
              >
                {' '}
                <ParallaxCase item={c} />
                <div className="cases-item__info">
                  <div className="cases-item__title">{c.title}</div>
                  <div className="cases-item__type">{c.types.join(' / ')}</div>
                </div>{' '}
              </Animated>
            </div>
          ))}
      </div>
    </section>
  )
})

export default CasesContent
