import { useEffect, useRef, useState } from 'react'
import './contactForm.scss'
import attachIcon from '../../images/icons/attach.svg'
import { Link, useNavigate } from 'react-router-dom'
import MagnetButton from '../common/MagnetButton'
import gsap from 'gsap'
import { Linear } from 'gsap/all'
import {
  isSafariDesktop,
  is_chrome,
  is_firefox,
  is_opera,
  is_win,
} from '../../mocks/info'
import classNames from 'classnames'
const ContactForm = () => {
  const refs = useRef<any>(Array())
  const formRef = useRef<any>(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    interestsOptions: Array(),
    budgetOption: '',
    username: '',
    projectAbout: '',
    email: '',
    privacyCheched: false,
    projectsFiles: null,
  })

  const [error, setError] = useState({
    interestsOptions: '',
    budgetOption: '',
    username: '',
    projectAbout: '',
    email: '',
    privacyCheched: '',
  })

  const interestsOptions = [
    'interface design',
    'illustration',
    'identity',
    'development',
    '3d design',
    'animation',
  ]

  const budgetOptions = ['< 5k', '5k - 10k', '10k - 50k', '> 50k']

  const validate = () => {
    if (!formData.username) {
      setError({ ...error, username: 'Field is required!' })
      return false
    }

    if (!formData.projectAbout) {
      setError({ ...error, projectAbout: 'Field is required!' })
      return false
    }

    if (!formData.email) {
      setError({ ...error, email: 'Field is required!' })
      return false
    }

    if (formData.privacyCheched === false) {
      setError({ ...error, privacyCheched: 'Field is required!' })
      return false
    }

    return true
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, username: e.target.value })
  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement, Element>) =>
    setError({ ...error, username: e.target.value ? '' : 'Field is required!' })

  const handleProjectAboutChange = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => setFormData({ ...formData, projectAbout: e.target.value })
  const handleProjectAboutBlur = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) =>
    setError({
      ...error,
      projectAbout: e.target.value ? '' : 'Field is required!',
    })

  const handleEmailChange = (e: React.FocusEvent<HTMLInputElement, Element>) =>
    setFormData({ ...formData, email: e.target.value })
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement, Element>) =>
    setError({ ...error, email: e.target.value ? '' : 'Field is required!' })

  const handlePrivacyChange = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => setFormData({ ...formData, privacyCheched: e.target.checked })
  const handlePrivacyBlur = (e: React.FocusEvent<HTMLInputElement, Element>) =>
    setError({
      ...error,
      privacyCheched: e.target.value ? '' : 'Field is required!',
    })

  const handleInterestsChange = (clickedOption: string) => {
    if (formData.interestsOptions.includes(clickedOption)) {
      setFormData({
        ...formData,
        interestsOptions: formData.interestsOptions.filter(
          (el) => el !== clickedOption,
        ),
      })
    } else {
      setFormData({
        ...formData,
        interestsOptions: [...formData.interestsOptions, clickedOption],
      })
    }
  }

  const handleBudgetChange = (clickedOption: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, budgetOption: clickedOption })
    }
  }

  const handleFormSend = () => {
    const isFormValid = validate()

    if (isFormValid) {
      const fd = new FormData()
      fd.append('interestsoptions', JSON.stringify(formData.interestsOptions))
      fd.append('budgetoption', formData.budgetOption)
      fd.append('username', formData.username)
      fd.append('projectabout', formData.projectAbout)
      fd.append('file', formData.projectsFiles as any)
      fd.append('email', formData.email)
      fd.append('privacycheched', JSON.stringify(formData.privacyCheched))
      fd.append('status', 'contact')

      fetch('https://equal.design/main.php', {
        method: 'POST',
        body: fd,
      }).then(() => {
        navigate('/thanks')
      })
    }
  }

  useEffect(() => {
    if (!refs.current || !formRef.current) return
    formRef.current.style.opacity = '1'
    if (
      !is_firefox &&
      !isSafariDesktop &&
      !(is_opera && is_win) &&
      !(is_chrome && is_win)
    ) {
      var tl = gsap.timeline({})
      tl.from(refs.current, {
        yPercent: 100,
        duration: 1.5,
        ease: 'power3.out',
      })

    } else {
      refs.current.forEach((element: any) => {
        element.classList.add('animated')
      })
    }
  }, [refs.current])

  const fileLoad = (e: any) => {
    var reader = new FileReader()
    var url = reader.readAsDataURL(e.target.files[0])
    setFormData({
      ...formData,
      projectsFiles: e.target.files[0],
    })
  }

  return (
    <form
      ref={formRef}
      className="contact-form" onSubmit={(e) => e.preventDefault()}>
      <div className="contact-form__text">
        <span
          className={classNames(
            is_firefox && 'firefox',
            (isSafariDesktop ||
              (is_opera && is_win) ||
              (is_chrome && is_win)) &&
            'safari',
          )}
          ref={(el) => {
            refs.current && !refs.current.includes(el) && refs.current.push(el)
          }}
        >
          fill in the form <br /> to tell us
        </span>
      </div>
      <div className="contact-form__content">
        <div className="contact-form__title">
          <div
            className={classNames(
              is_firefox && 'firefox',
              (isSafariDesktop ||
                (is_opera && is_win) ||
                (is_chrome && is_win)) &&
              'safari',
            )}
            ref={(el) => {
              refs.current &&
                !refs.current.includes(el) &&
                refs.current.push(el)
            }}
          >
            {' '}
            What’s on your <span>mind?</span>
          </div>
        </div>
        <div
          className={classNames(
            'animate',
            is_firefox && 'firefox',
            (isSafariDesktop ||
              (is_opera && is_win) ||
              (is_chrome && is_win)) &&
            'safari',
          )}
          ref={(el) => {
            refs.current && !refs.current.includes(el) && refs.current.push(el)
          }}
        >
          <div className="contact-form__content-item">
            <div className="contact-form__content-title">
              1. What are you interested in?
            </div>
            <div className="contact-form__checkboxes">
              {interestsOptions.map((option, idx) => {
                return (
                  <div className="contact-form__checkbox checkbox" key={idx}>
                    <input
                      type="checkbox"
                      id={`int_${idx}`}
                      className="custom-checkbox"
                      checked={formData.interestsOptions.includes(option)}
                      onChange={() => handleInterestsChange(option)}
                    />
                    <label htmlFor={`int_${idx}`}>{option}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="contact-form__content-item">
            <div className="contact-form__content-title">
              2. What is your budget in usd?
            </div>
            <div className="contact-form__radio-btns">
              {budgetOptions.map((option, idx) => {
                return (
                  <div className="contact-form__radio-btn" key={idx}>
                    <input
                      type="radio"
                      id={`budget_${idx}`}
                      name="budget"
                      checked={formData.budgetOption === option}
                      onChange={(e) =>
                        handleBudgetChange(option, e.target.checked)
                      }
                    />
                    <label htmlFor={`budget_${idx}`}>{option}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="contact-form__content-item">
            <div className="contact-form__content-title">
              3. how can we call you?
            </div>
            <input
              type="text"
              placeholder="Your name"
              className="contact-form__input"
              value={formData.username}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />
            <div className="contact-form__error">{error.username}</div>
          </div>
          <div className="contact-form__content-item">
            <div className="contact-form__content-title">
              4. What is your project about?
            </div>
            <input
              type="text"
              placeholder="A brief overview of your project"
              className="contact-form__input"
              value={formData.projectAbout}
              onChange={handleProjectAboutChange}
              onBlur={handleProjectAboutBlur}
            />
            <div className="contact-form__error">{error.projectAbout}</div>
            <div className="contact-form__attach-btn">
              <input
                type="file"
                id="attach-file"
                className="contact-form__attach-input"
                onChange={fileLoad}
              />
              <label htmlFor="attach-file">
                <img src={attachIcon} alt="" />
                <span>
                  {formData.projectsFiles
                    ? (formData.projectsFiles as any).name
                    : 'Attach some project files if you wish'}
                </span>
              </label>
            </div>
          </div>
          <div className="contact-form__content-item">
            <div className="contact-form__content-title">
              5. Leave us your email please
            </div>
            <input
              type="email"
              placeholder="Your email"
              className="contact-form__input"
              value={formData.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            <div className="contact-form__error">{error.email}</div>
          </div>
          <div className="contact-form__policy">
            <input
              className="custom-check"
              id="policy"
              type="checkbox"
              checked={formData.privacyCheched}
              onChange={handlePrivacyChange}
              onBlur={handlePrivacyBlur}
            />
            <label htmlFor="policy">
              <div className="contact-form__policy-text">
                <div>
                  By clicking this button, you accept{' '}
                  <Link to="">Terms of Service</Link>
                </div>
                <div>
                  {' '}
                  and <Link to="">Privacy Poilcy.</Link>
                </div>
              </div>
            </label>
            <div className="contact-form__error">{error.privacyCheched}</div>
          </div>
          <MagnetButton
            text="send"
            path={'/text-us'}
            classList="btn-primary btn-header btn-send"
            click={handleFormSend}
            wrapperClass="contact-form__btn"
          />
        </div>
      </div>
    </form>
  )
}

export default ContactForm
