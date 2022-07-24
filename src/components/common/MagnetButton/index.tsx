import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './magnet-but.scss'
import { gsap } from 'gsap'
import { runInAction } from 'mobx'
import GlobalState from '../../../stores/GlobalState'
import '../../../styles/button.scss'
import { isTouch } from '../../../mocks/info'

const MagnetButton = ({
  path,
  classList,
  text,
  wrapperClass,
  click,
}: {
  path: string
  classList: string
  text: string
  wrapperClass?: string
  click?: (e?: any) => void
}) => {
  const magnet = useRef(null)
  const mouseEnter = (e: any) => {
    gsap.to(e.currentTarget, { duration: 0.4, opacity: 1, scale: 1.1 })
  }
  const mouseLeave = (e: any) => {
    gsap.to(e.currentTarget, {
      duration: 0.15,
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    })
  }
  const mouseMove = (e: any) => {
    const position: any =
      magnet.current && (magnet.current as any).getBoundingClientRect()
    const relX = e.pageX - position.left - position.width / 2
    const relY = e.pageY - position.top - position.height / 2

    gsap.to(e.target, {
      duration: 0.15,
      force3D: true,
      overwrite: true,
      x: relX * 0.2,
      y: relY * 0.2,
    })
  }
  useEffect(() => {
    if (!isTouch) {
      if (magnet.current) {
        ; (magnet.current as Element).addEventListener('mouseenter', mouseEnter)
          ; (magnet.current as Element).addEventListener('mouseleave', mouseLeave)
          ; (magnet.current as Element).addEventListener('mousemove', mouseMove)
      }
    }

    return () => {
      if (!isTouch) {
        if (magnet.current) {
          ; (magnet.current as Element).removeEventListener(
            'mouseenter',
            mouseEnter,
          )
            ; (magnet.current as Element).removeEventListener(
              'mouseleave',
              mouseLeave,
            )
            ; (magnet.current as Element).removeEventListener(
              'mousemove',
              mouseMove,
            )
        }
      }
    }
  }, [])

  useEffect(() => {
    const btns = document.querySelectorAll('.btn-magnet')
    btns.forEach((b) => {
      b.addEventListener('mousemove', () => {
        const classname = (b as any).getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.add(classname)
      })
      b.addEventListener('mouseleave', () => {
        const classname = (b as any).getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.remove(classname)
      })
    })

    return () => {
      btns.forEach((b) => {
        b.removeEventListener('mousemove', () => {
          const classname = (b as any).getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.add(classname)
        })
        b.removeEventListener('mouseleave', () => {
          const classname = (b as any).getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.remove(classname)
        })
      })
    }
  }, [])

  return (
    <div
      className={classNames(
        'btn-magnet-wrap',
        wrapperClass ? wrapperClass : '',
      )}
      ref={magnet}
    >
      <>
        {text != 'send' ? (
          <Link
            to={path}
            className={classNames('btn-magnet', classList)}
            ref={(el) => {
              runInAction(() => {
                GlobalState.cursorRefs.push(el)
              })
            }}
            onClick={() => {
              if (click) click()
            }}
            cursor-class="cursor-dark"
          >
            {text}
          </Link>
        ) : (
          <div
            className={classNames('btn-magnet', classList)}
            ref={(el) => {
              runInAction(() => {
                GlobalState.cursorRefs.push(el)
              })
            }}
            onClick={() => {
              if (click) click()
            }}
            cursor-class="cursor-dark"
          >
            {' '}
            {text}
          </div>
        )}
      </>
    </div>
  )
}

export default MagnetButton
