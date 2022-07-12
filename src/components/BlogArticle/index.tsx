import { Link, useLocation, useNavigate } from 'react-router-dom'
import './blogArticle.scss'
import MagnetButton from '../common/MagnetButton'
import blogs from './blogs'
import parse from 'html-react-parser'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef } from 'react'
import Estimate from '../Estimate'
import { isSafariDesktop, is_firefox } from '../../mocks/info'
import SplitText from '../common/SplitText'
import ReactDOMServer from 'react-dom/server'

const BlogArticle = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      let section = document.querySelector('.case')
      let slideUp = section?.querySelectorAll('.slide-up'),
        appear = section?.querySelectorAll('.appear'),
        parallax = section?.querySelectorAll('.parallax img')

      if (!section) return
        ; (section as HTMLElement).style.opacity = '1'
      slideUp?.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            toggleActions: 'play none none none',
          },
          y: (item as any).innerHeight < 140 ? '110%' : '150',
          duration: 0.8,
          stagger: 0.15,
        })
      })

      appear?.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
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

      parallax?.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            scrub: 0,
            onUpdate: (self) => {
              gsap.to(item, {
                y: self.progress * 100,
                ease: 'ease',
              })
            },
          },
        })
      })
      const casePage = document.querySelector('.case')
      if (casePage) {
        document.body.style.background = 'transparent'
      }
    }, 500)
  }, [])

  const splitAnchor = (l: any) => {
    const wordsCont = Array.from((l as Element).children).filter(
      (c) => !(c as HTMLElement).classList.contains('whitespace'),
    )
    const charsCont = (l as HTMLElement).querySelectorAll('.char')
    wordsCont.forEach((c, ind) => {
      if (c.classList.contains('word')) {
        ; (c as HTMLElement).style.setProperty('--word-index', `${ind}`)
      }
    })
    charsCont.forEach((c, ind) => {
      if (c.classList.contains('char')) {
        ; (c as HTMLElement).style.setProperty('--char-index', `${ind}`)
      }
    })
  }

  useEffect(() => {
    const links = document.querySelectorAll('.case__content-info ul li a')
    links &&
      links.forEach((l: any) => {
        let content = l.textContent
        if (!l.classList.contains('animated')) {
          l.classList.add('btn--split')
          l.classList.add('animated')
          l.classList.add('case-link')
            ; (l as any).style.setProperty(
              '--word-total',
              `${content.split(' ').length}`,
            )
          const chars = content.split('')
          const res = []
          chars.forEach((c: any) => {
            if (c != ' ') res.push(c)
          })
            ; (l as HTMLElement).style.setProperty('--char-total', `${res.length}`)
          let html = ''
          content.split(' ').forEach((w: any, ind: number) => {
            let middle = ``
            w.split('').forEach((s: any, idx: number) => {
              middle += ` <span class="char" data-char='${s}'>${s}</span>`
            })
            html += `<span class='word' data-word='${w}'>
            ${middle}
            <span class="full-text">${w}</span>
          </span>
            `

            html +=
              ind + 1 != content.split(' ').length
                ? `<span class="whitespace"></span>`
                : ''
          })

          l.innerHTML = html
          splitAnchor(l)
        }
      })
  }, [])

  const goNext = () => {
    let idx = 0
    blogs.forEach((c, ind) => {
      if (pathname.includes(c.link)) {
        idx = ind
      }
    })

    let next
    if (idx + 1 != blogs.length) {
      next = blogs[idx + 1]
    } else next = blogs[0]
    window.location.href = `/case${next.link}`
  }

  const caseItem = (blogs as any).find((c: any) => pathname.includes(c.link))
  if (!caseItem) return <></>
  return (
    <div className="case">
      <div className="slide-wrap">
        <div
          className="case__link-back slide-up"
          onClick={() => (window.location.href = '/blogs')}
        >
          <SplitText text={`< Back`} path="/blogs" classList="" target />
        </div>
      </div>
      <div className="case__content">
        <div className="case__content-row">
          <div className="case__content-col">
            <div className="case__content-info list-desk">
              {parse(caseItem.info)}
              {/* {document.querySelectorAll('.case__content-info ul li a') && (
                <SplitText
                  text={'dc'}
                  path={'dcd'}
                  classList="case-link"
                  target
                /> */}
              {/* )} */}
            </div>
            <Estimate />
          </div>
          <div className="case__content-col">
            <div className="case__content-right">
              {parse(caseItem.description)}
            </div>
          </div>
        </div>
      </div>
      <div className="case__bottom">
        <MagnetButton
          text="Next case >"
          wrapperClass="case-next"
          classList="case__btn-next "
          path={''}
          click={() => goNext()}
        />
      </div>
    </div>
  )
}

export default BlogArticle
