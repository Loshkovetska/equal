import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/src/locomotive-scroll.scss'
import { runInAction } from 'mobx'
import GlobalState from '../stores/GlobalState'
import { useLocation } from 'react-router'
import { isSafariDesktop, is_safari } from './info'

gsap.registerPlugin(ScrollTrigger)

export default function useLocoScroll(start: boolean) {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!start) return
    let locoScroll: any = null
    const scrollEl = document.querySelector('.smooth')

    if (!scrollEl) return

    locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: isSafariDesktop ? 0.6 : 0.7,
      repeat: true,
      getDirection: true,
      getSpeed: true,
      elMobile: scrollEl,
      smartphone: {
        breakpoint: 0,
        smooth: true,
      },
      tablet: {
        breakpoint: 0,
        smooth: true,
      },
      reloadOnContextChange: true,
    })

    locoScroll.on('scroll', () => {
      ScrollTrigger.update()
    })

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y
        }
        return null
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: (document.querySelector('.smooth') as any)?.style.transform
        ? `transform`
        : 'fixed',
    })

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update()
      }
    }

    window.addEventListener('resize', () => ScrollTrigger.refresh())

    runInAction(() => {
      GlobalState.locoScroll = locoScroll
    })

    setInterval(
      () => {
        locoScroll && locoScroll.update()
      },
      pathname.includes('cases') ? 1000 : 1500,
    )

    ScrollTrigger.defaults({ scroller: '.smooth' })

    ScrollTrigger.addEventListener('refresh', lsUpdate)
    ScrollTrigger.refresh()

    return () => {
      if (locoScroll) {
        ScrollTrigger.removeEventListener('refresh', lsUpdate)
        locoScroll.destroy()
        locoScroll = null

        runInAction(() => {
          GlobalState.locoScroll = locoScroll
        })
      }
    }
  }, [start, pathname])
}
