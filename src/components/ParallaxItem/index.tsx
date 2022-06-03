import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import LazyLoader from '../LazyLoader'
import { observer } from 'mobx-react'
import { runInAction } from 'mobx'
import GlobalState from '../../stores/GlobalState'

const formats = {
  img: 'png.webp',
  video: 'mp4',
}

const ParallaxCase = observer(({ item }: { item: any }) => {
  useEffect(() => {
    setTimeout(() => {
      const parallax = document.querySelectorAll('.cases-item .parallax')
      if (window.innerWidth > 767) {
        parallax.forEach((item) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              scrub: 0.5,

              onUpdate: (self) => {
                gsap.to(item, {
                  y: self.progress * 100,
                  ease: 'ease',
                })
              },
            },
          })
        })
      }
    })
  }, [])

  useEffect(() => {
    const cases = document.querySelectorAll('.cases-item__img')

    cases.forEach((c) => {
      c.addEventListener('mousemove', () => {
        const classname: any = c.getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.add(classname)
      })

      c.addEventListener('mouseleave', () => {
        const classname: any = c.getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.remove(classname)
      })
    })

    return () => {
      cases.forEach((c) => {
        c.removeEventListener('mousemove', () => {
          const classname: any = c.getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.add(classname)
        })

        c.removeEventListener('mouseleave', () => {
          const classname: any = c.getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.remove(classname)
        })
      })
    }
  }, [])

  return (
    <Link
      to={`/case${item.link}`}
      className="cases-item__img"
      cursor-class="cursor-case"
      ref={(el) =>
        runInAction(() => {
          GlobalState.cursorRefs.push(el)
        })
      }
    >
      {formats.img.includes(item.src.split('.').pop()) ? (
        <LazyLoader
          classList="parallax"
          preload="auto"
          autoplay
          muted
          loop
          src={item.src}
          type="img"
        />
      ) : (
        <LazyLoader
          classList=""
          preload="auto"
          autoplay={true}
          muted={true}
          loop={true}
          src={item.src}
          type="video"
        />
      )}
    </Link>
  )
})

export default ParallaxCase
