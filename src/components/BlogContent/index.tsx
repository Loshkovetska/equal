import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'
import blog from '../BlogArticle/blog'
import MagnetButton from '../common/MagnetButton'
import PowerTitle from '../common/PowerTitle'
import BlogItem from '../BlogItem'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './blog.scss'
import { observer } from 'mobx-react'
import SplitText from '../common/SplitText'
import { Animated } from 'react-animated-css'

import 'animate.css/animate.css'

const BlogContent = observer(() => {
  const [casesData, setState] = useState<any>(null)
  const [caseDt, set] = useState<any>(blog)
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const menuItems = [
    {
      title: 'all articles',
      link: '/blog',
      tab: 'all articles',
    },
    {
      title: 'web app',
      link: '/blog/web-app',
      tab: 'web app',
    },
    {
      title: 'mobile app',
      link: '/blog/mobile-app',
      tab: 'mobile app',
    },
    {
      title: 'website',
      link: '/blog/website',
      tab: 'website',
    },
    {
      title: 'startups',
      link: '/blog/startups',
      tab: 'startups',
    },
    {
      title: 'blockchain',
      link: '/blog/blockchain',
      tab: 'blockchain',
    },
    {
      title: 'healthcare',
      link: '/blog/healthcare',
      tab: 'healthcare',
    },
  ]

  const filterByType = (dt: any) => {
    const tab = pathname.includes('-')
      ? pathname.split('/').pop()?.split('-').join(' ')
      : pathname.split('/').pop()
    switch (tab) {
      case 'blog':
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

  const showMoreArticle = () => {
    if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()
    const articles = document.querySelectorAll('.blog-item')
    for (let i = 0; i < articles.length; i++) {
      const element = articles[i];
      element.classList.remove('d-none')
    }
    ScrollTrigger.refresh()

  }

  useEffect(() => {
    if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()
    filterByType(blog)
    ScrollTrigger.refresh()
  }, [pathname])

  useEffect(() => {
    setTimeout(() => {
      const title = document.querySelectorAll('.selected-blog__title-text')
      if (!title || !document.querySelector('.blog-page')) return
      var tl = gsap.timeline({
        ease: 'power2',
        scrollTrigger: {
          trigger: `.blog-page`,
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

      const casePage = document.querySelector('.blog-page')
      if (casePage) {
        document.body.style.background = 'transparent'
      }
    })
  }, [])


  return (
    <>
      <section className="blog-page">
        <PowerTitle
          count={caseDt ? caseDt.length : 0}
          section="blog-page"
          classList=""
        />
      </section >

      <div className="blog-menu">
        <div className="blog-menu__block">
          {menuItems.map((m, idx) => {
            return <SplitText
              classList={`blog-menu__item ${pathname.split('/').pop() == m.link.split('/').pop() && 'active'}`}
              text={`${m.title} [0]`}
              path={m.link}
              target={false}
              key={idx}
            />
          })}
        </div>
      </div>
      <section className="blog-page">

        <div className="blog-list">
          {casesData &&
            casesData.map((c: any, idx: number) => {
              const isFirstFive = idx < 5 ? 'blog-item' : 'blog-item d-none'
              return <div className={isFirstFive} key={idx}>
                <Animated
                  animationIn="fadeInUp"
                  animationOut="fadeIn"
                  animationInDuration={1500}
                  animationOutDuration={1500}
                  isVisible={true}
                  key={idx}
                  style={{ width: '100%' }}
                >
                  {' '}
                  <BlogItem item={c} />
                  {' '}
                </Animated>
              </div>
            })}
        </div>
        <MagnetButton
          text="Show more"
          classList="btn-primary btn-blog"
          wrapperClass="appear appear--home"
          path={''}
          click={() => showMoreArticle()}
        />
      </section >
    </>
  )
})

export default BlogContent
