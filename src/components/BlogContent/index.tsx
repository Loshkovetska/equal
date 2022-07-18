import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'
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

const BlogContent = observer(({ menuState, blog }: { menuState: any, blog: any, }) => {
  const [blogData, setState] = useState<any>(null)
  const { pathname } = useLocation()
  const location = useLocation()
  console.log("🚀 ~ file: index.tsx ~ line 21 ~ BlogContent ~ location", location)

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
    const filterByType = (dt: any) => {
      const tab = pathname.includes('-')
        ? pathname.split('/').pop()?.split('-').join(' ')
        : pathname.split('/').pop()

      console.log("🚀 ~ file: index.tsx ~ line 34 ~ filterByType ~ tab", tab)
      switch (tab) {
        case 'blog':
          setState(dt)
          ScrollTrigger.refresh()
          break
        case `${tab}`:
          console.log("🚀 ~ file: index.tsx ~ line 44 ~ filterByType ~ tab", tab)
          const res = dt.filter((d: any) => {
            let flag = false
            d.types.forEach((t: string) => {
              if (t.toLocaleLowerCase().includes(tab.toLocaleLowerCase())) {
                return flag = true
              }
              return
            })

            if (flag) {
              return d
            } else {
              return null
            }
          })

          setState(res)
          ScrollTrigger.refresh()
          break
      }
    }
    if (blog) {
      filterByType(blog)

    }
    if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()

    ScrollTrigger.refresh()
  }, [pathname, blog, menuState])

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
          section="blog-page"
          classList=""
        />
      </section >

      <div className="blog-menu">
        <div className="blog-menu__block">
          {menuState &&
            menuState.map((m: any, idx: number) => {
              console.log("🚀 ~ file: index.tsx ~ line 130 ~ menuState.map ~ m", m)

              const splittedPath = pathname.split('/')

              const path = splittedPath.length > 2 ? `${splittedPath[0]}/${splittedPath[1]}/${m.link}` : `${pathname}/${m.link}`
              const isAllPath = m.link === 'blog' ? '/blog' : path
              const isActive = pathname.split('/').pop() === m.link.split('/').pop()
              console.log("🚀 ~ file: index.tsx ~ line 122 ~ menuState.map ~ isAllPath", isAllPath)
              return <div
                className="blog-menu__block-fragment"
                key={idx}>
                <SplitText
                  classList={`blog-menu__item ${isActive && 'active'}`}
                  text={`${m.title} [${m.count}]`}
                  path={isAllPath}
                  target={false}
                />
              </div>
            })}
        </div>
      </div>
      <section className="blog-page">

        <div className="blog-list">
          {blogData &&
            blogData.map((c: any, idx: number) => {
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
