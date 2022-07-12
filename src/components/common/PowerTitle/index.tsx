import classNames from 'classnames'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { isTouch } from '../../../mocks/info'
const PowerTitle = ({
  count,
  section,
  classList,
}: {
  count?: any
  section: string
  classList: string
}) => {
  const titleSlideUp = useRef<any>(Array())

  const isCasesPage = section === 'cases-page' ? 'cases-page' : 'blogs-page'
  useEffect(() => {
    setTimeout(() => {
      if (
        !document.querySelector(`.${section}`) ||
        !titleSlideUp.current ||
        section == isCasesPage
      )
        return
      var tl = gsap.timeline({
        ease: 'power2',
        scrollTrigger: {
          trigger: `.${section}`,
          start: isTouch ? 'top bottom' : 'top center',
          toggleActions: 'play none none none',
        },
      })
      tl.from(titleSlideUp.current, {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.2,
      })
    })
  }, [])
  return (
    <>
      {section != 'blogs-page' && section == 'selected-cases' || section == 'cases-page' ? (
        <div className="selected-cases__title">
          <div className="selected-cases__title-cont">
            <div
              className="selected-cases__title-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              Our
            </div>
          </div>
          <div className="selected-cases__title-cont">
            <div
              className="selected-cases__title-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              cases
              <span className="selected-cases__title-num">({count})</span>
            </div>
          </div>
        </div>
      ) : (section != 'blogs-page' && section == 'footer') ? (
        <div className="footer__right-title">
          <div className="footer__right-cont">
            <div
              className="footer__right-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              let's
            </div>
          </div>
          <div className="footer__right-cont">
            <div
              className="footer__right-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              discuss it
            </div>
          </div>
        </div>
      ) : section != 'blogs-page' ? (
        <div className={classNames('selected-cases__title', classList)}>
          <div className="selected-cases__title-cont">
            <div
              className="selected-cases__title-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              How we
            </div>
          </div>
          <div className="selected-cases__title-cont">
            <div
              className="selected-cases__title-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              can help
            </div>
          </div>
          <div className="selected-cases__title-cont">
            <div
              className="selected-cases__title-text"
              ref={(el) =>
                titleSlideUp.current && titleSlideUp.current.push(el)
              }
            >
              you
            </div>
          </div>
        </div>
      ) : <div className="selected-blogs__title">
        <div className="selected-blogs__title-cont">
          <div
            className="selected-blogs__title-text"
            ref={(el) =>
              titleSlideUp.current && titleSlideUp.current.push(el)
            }
          >
            THOUGHTS
          </div>
        </div>
        <div className="selected-blogs__title-cont">
          <div
            className="selected-blogs__title-text"
            ref={(el) =>
              titleSlideUp.current && titleSlideUp.current.push(el)
            }
          >
            & IDEAS
          </div>
        </div>
      </div>


      }
    </>
  )
}
export default PowerTitle
