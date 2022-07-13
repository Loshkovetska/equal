import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useRef } from 'react'
import './split-text.scss'

const SplitText = ({
  text,
  path,
  classList,
  target,
}: {
  text: string
  path: any
  classList: string
  target: boolean
}) => {
  const splitTextContainer = useRef(null)
  const splitText = (text: string) => text.split(' ')

  useEffect(() => {
    if (splitTextContainer.current) {
      ; (splitTextContainer.current as HTMLElement).style.setProperty(
        '--word-total',
        `${text.split(' ').length}`,
      )

      const chars = text.split('')
      const res = []
      chars.forEach((c) => {
        if (c != ' ') res.push(c)
      })
        ; (splitTextContainer.current as HTMLElement).style.setProperty(
          '--char-total',
          `${res.length}`,
        )

      const wordsCont = Array.from(
        (splitTextContainer.current as Element).children,
      ).filter((c) => !(c as HTMLElement).classList.contains('whitespace'))
      const charsCont = (splitTextContainer.current as HTMLElement).querySelectorAll(
        '.char',
      )
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
  }, [])
  const splitClassList = classList.split(' ')
  const isActiveCharCode = splitClassList[splitClassList.length - 1] === 'active' && 'active'

  return (
    <Link
      className={classNames('btn--split', classList)}
      to={path}
      data-splitting=""
      ref={splitTextContainer}
      target={target ? '_blank' : ''}
      onClick={() => {
        target && (window.location = path)
      }}
    >
      {splitText(text).map((w, ind) => {
        return <Fragment key={ind}>
          <span className={classNames('word')} data-word={w}>
            {w.split('').map((s, idx) => {
              return <span className={`char ${isActiveCharCode}`} key={idx} data-char={s}>
                {s}
              </span>
            })}
            <span className="full-text">{w}</span>
          </span>
          {ind + 1 != splitText(text).length && (
            <span className="whitespace"></span>
          )}
        </Fragment>
      })}
    </Link>
  )
}

export default SplitText
