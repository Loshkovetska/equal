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
import './blogs.scss'
import { observer } from 'mobx-react'
import SplitText from '../common/SplitText'
import { Animated } from 'react-animated-css'

import 'animate.css/animate.css'

const BlogsContent = observer(() => {
  const [casesData, setState] = useState<any>(null)
  const [caseDt, set] = useState<any>(cases)
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const menuItems = [
    {
      title: 'all articles',
      link: '/blogs',
      tab: 'all articles',
    },
    {
      title: 'web app',
      link: '/blogs/web-app',
      tab: 'web app',
    },
    {
      title: 'mobile app',
      link: '/blogs/mobile-app',
      tab: 'mobile app',
    },
    {
      title: 'website',
      link: '/blogs/website',
      tab: 'website',
    },
    {
      title: 'startups',
      link: '/blogs/startups',
      tab: 'startups',
    },
    {
      title: 'blockchain',
      link: '/blogs/blockchain',
      tab: 'blockchain',
    },
    {
      title: 'healthcar',
      link: '/blogs/healthcar',
      tab: 'healthcar',
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
      const title = document.querySelectorAll('.selected-blogs__title-text')
      if (!title || !document.querySelector('.blogs-page')) return
      var tl = gsap.timeline({
        ease: 'power2',
        scrollTrigger: {
          trigger: `.blogs-page`,
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

      const casePage = document.querySelector('.blogs-page')
      if (casePage) {
        document.body.style.background = 'transparent'
      }
    })
  }, [])


  return (
    <section className="blogs-page">

      <PowerTitle
        count={caseDt ? caseDt.length : 0}
        section="blogs-page"
        classList=""
      />
      <div className="cases-page__menu blogs-menu">
        {menuItems.map((m, idx) => (
          <SplitText
            classList={`blogs-menu__item ${pathname.split('/').pop() == m.link.split('/').pop() && 'active'}`}
            text={m.title}
            path={m.link}
            target={false}
            key={idx}
          />

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
    </section >
  )
})

export default BlogsContent
