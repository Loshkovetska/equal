import { ReactComponent as Logo } from '../../../images/icons/logo-white.svg'
import { ReactComponent as Close } from '../../../images/icons/close.svg'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { menuItems, socials } from '../../../mocks/menuItems'
import './navigation.scss'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import GlobalState, { changeMenuState } from '../../../stores/GlobalState'
import SplitText from '../SplitText'

const Navigation = observer(() => {
  const history = useNavigate()
  const { pathname } = useLocation()
  return (
    <nav className={classNames('navigation', GlobalState.menuIsOpen && 'show')}>
      <div className="navigation__top">
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <button className="navigation__close" onClick={changeMenuState}>
          <Close />
        </button>
      </div>
      <div className="navigation__content">
        <div className="navigation__list">
          {menuItems.map((m, ind) => (
            <div key={ind}>
              <Link
                className={classNames(
                  'navigation__item',
                  (m.link === pathname) && 'active',
                )}
                to={m.link}
                onClick={() => changeMenuState()}
              >
                {m.title}

              </Link></div>
          ))}
        </div>
        <button
          className="navigation__contact"
          onClick={() => {
            history('/text-us')
          }}
        >
          Contact us
        </button>
      </div>
      <div className="navigation__footer">
        <h3 className="navigation__title">Follow us</h3>
        <div className="navigation__social">
          {socials.map((col, ind) => (
            <div key={ind} className="navigation__social-col">
              {col.map((s, idx) => (
                <div className="slide-wrap slide-wrap--nav" key={idx}>
                  <div className="slide-up">
                    <SplitText
                      target={true}
                      text={s.title}
                      path={s.link}
                      classList="link-rotate"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
})

export default Navigation
