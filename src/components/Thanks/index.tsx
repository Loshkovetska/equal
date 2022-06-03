import { Link } from 'react-router-dom'
import './thanks.scss'
import gsap from 'gsap'
import { useEffect } from 'react'
import { isTouch } from '../../mocks/info'
import SplitText from '../common/SplitText'
const Thanks = () => {
  useEffect(() => {
    if (!isTouch) {
      setTimeout(() => {
        var tl = gsap.timeline({})
        tl.from('.slide-up', {
          yPercent: 100,
          duration: 1.5,
          ease: 'power3.out',
        })
      })
    }
  }, [])
  return (
    <div className="thanks">
      <div
        className="thanks__link-back"
        onClick={() => (window.location.href = '/')}
      >
        <SplitText text="< Back to homepage" classList="" path="/" target />
      </div>
      <div className="thanks__content">
        <div className="slide-wrap">
          <div className="thanks__title slide-up">Thank you!</div>
        </div>
        <div className="slide-wrap">
          <div className="thanks__text slide-up">
            Our manager is already checking the inbox 😉{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thanks
