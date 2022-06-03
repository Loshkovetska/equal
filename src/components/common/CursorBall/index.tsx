import classNames from 'classnames'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import GlobalState from '../../../stores/GlobalState'
import './cursor-ball.scss'

const CursorBall = observer(() => {
  const cursor = useRef<any>(null)
  const [isShow, setShow] = useState(false)
  let mouse = { x: 0, y: 0 }
  let pos = {
    x: 0,
    y: 0,
  }
  let speed = 0.2

  const updatePosition = () => {
    const cursor = document.querySelector('.cursor__ball')
    if (cursor) {
      pos.x += (mouse.x - pos.x - (cursor as any).offsetWidth / 2) * speed
      pos.y += (mouse.y - pos.y - (cursor as any).offsetHeight / 2) * speed
      ;(cursor as HTMLElement).style.transform =
        'translate(' + pos.x + 'px ,' + pos.y + 'px)'
    }
  }

  const updateCoordinates = (e: any) => {
    mouse = { x: e.clientX, y: e.clientY }
    cursor.current && ((cursor.current as HTMLElement).style.opacity = '0.6')
    loop()
  }

  const loop = () => {
    updatePosition()
    requestAnimationFrame(loop)
  }

  const setClass = (e: any) => {
    const target = e.currentTarget
    const cursor = document.querySelector('.cursor__ball')
    const className = target.getAttribute('cursor-class')
    if (!(cursor as any).classList.contains(className)) {
      cursor!.classList.add(className)
    }
    loop()
  }

  const removeClass = (e: any) => {
    const cursor = document.querySelector('.cursor__ball')
    cursor!.className = 'cursor__ball'
    loop()
  }

  useEffect(() => {
    const components = document.querySelectorAll('[cursor-class]') as any
    if (!components) return
    components.forEach((element: any) => {
      element.addEventListener('mousemove', (e: any) => setClass(e))
      element.addEventListener('mouseleave', removeClass)
    })

    return () => {
      const components = document.querySelectorAll('[cursor-class]') as any
      if (!components) return

      components.forEach((element: any) => {
        element.addEventListener('removeEventListener', (e: any) => setClass(e))
        element.addEventListener('removeEventListener', removeClass)
      })
    }
  }, [])

  useEffect(() => {
    cursor.current && (cursor.current.style.opacity = '0')
    if (window.innerWidth > 1024) {
      window.addEventListener('mousemove', updateCoordinates)
      requestAnimationFrame(loop)
    }

    return () => {
      if (window.innerWidth > 1024) {
        window.removeEventListener('mousemove', updateCoordinates)
      }
    }
  }, [])

  return (
    <div
      className={classNames('cursor__ball')}
      ref={(el) => {
        cursor.current = el
        runInAction(() => {
          GlobalState.cursorRef = cursor.current
        })
      }}
    >
      <svg height="40" width="40" fill="#E1F23A">
        <circle cx="50%" cy="50%" r="50%" strokeWidth="0"></circle>
      </svg>
    </div>
  )
})

export default CursorBall
