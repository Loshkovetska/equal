import { useEffect, useRef } from 'react'
import { ReactComponent as Svg } from '../../images/sculpture.svg'
import './sculpture.scss'
import { gsap } from 'gsap'
import { isSafariDesktop, is_firefox } from '../../mocks/info'
import classNames from 'classnames'

const Sculpture = ({ circle }: { circle: any }) => {
  const first = useRef(null)
  const second = useRef(null)
  const third = useRef(null)
  const fourth = useRef(null)
  const fifth = useRef(null)
  const overall = useRef(null)
  const left = useRef(null)
  const center = useRef(null)
  const right = useRef(null)
  const sculpture = useRef(null)
  const tl = useRef(null)
  const growUpElems = useRef<Array<any>>(Array())
  let speed = 0.75

  const swayLeft = () => {
    gsap
      .to(circle.current, 1.5, {
        x: 115,
        y: 40,
        transformOrigin: 'center',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(first.current, 1.5, {
        x: 30,
        rotate: 9,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(second.current, 1.5, {
        x: 35,
        y: -10,
        rotate: 18,
        transformOrigin: 'left bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(third.current, 1.5, {
        x: 20,
        rotate: 9,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fourth.current, 1.5, {
        x: 15,
        rotate: 6,
        transformOrigin: 'center bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fifth.current, 1.5, {
        x: 10,
        rotate: 0,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    overall.current &&
      (overall.current as HTMLElement).style.setProperty(
        'transform',
        'rotate(25deg) translate(0px, -30px)',
      )
  }
  const swayRight = () => {
    gsap
      .to(circle.current, 1, {
        x: -115,
        y: -20,
        transformOrigin: 'center',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(first.current, 1.5, {
        x: -35,
        rotate: -13,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(second.current, 1.5, {
        x: -35,
        y: 5,
        rotate: -14,
        transformOrigin: 'left bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(third.current, 1.5, {
        x: -20,
        rotate: -13,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fourth.current, 1.5, {
        x: -15,
        rotate: -8,
        transformOrigin: 'center bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fifth.current, 1.5, {
        x: -10,
        rotate: 0,
        transformOrigin: 'center bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)

    overall.current &&
      (overall.current as HTMLElement).style.setProperty(
        'transform',
        window.innerWidth < 1450
          ? 'rotate(-5deg) translate(0px, 0px)'
          : 'rotate(-12deg) translate(-50px, 10px)',
      )
  }

  const reset = () => {
    gsap
      .to(circle.current, 1, {
        x: 0,
        y: 0,
        transformOrigin: 'center',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(first.current, 1, {
        x: 0,
        rotate: 0,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(second.current, 1, {
        x: 0,
        y: 0,
        rotate: 0,
        transformOrigin: 'left bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(third.current, 1, {
        x: 0,
        rotate: 0,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fourth.current, 1, {
        x: 0,
        rotate: 0,
        transformOrigin: 'center bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    gsap
      .to(fifth.current, 1, {
        x: 0,
        rotate: 0,
        transformOrigin: 'right bottom',
        ease: 'back.BackInOut(1.9)',
      })
      .timeScale(speed)
    overall.current &&
      (overall.current as HTMLElement).style.setProperty(
        'transform',
        'rotate(0) translate(0, 0)',
      )
  }
  useEffect(() => {
    if (left.current) {
      ;(left.current as HTMLElement).addEventListener('mouseover', swayLeft)
    }
    if (right.current) {
      ;(right.current as HTMLElement).addEventListener('mouseover', swayRight)
    }
    if (center.current) {
      ;(center.current as HTMLElement).addEventListener('mouseover', reset)
    }

    return () => {
      if (left.current) {
        ;(left.current as HTMLElement).removeEventListener(
          'mouseover',
          swayLeft,
        )
      }
      if (right.current) {
        ;(right.current as HTMLElement).removeEventListener(
          'mouseover',
          swayRight,
        )
      }
      if (center.current) {
        ;(center.current as HTMLElement).removeEventListener('mouseover', reset)
      }
    }
  }, [])

  const growUp = (target: any) => {
    gsap.from(target, {
      transformOrigin: 'bottom center',
      yPercent: 110,
      duration: 1,
      stagger: 0.05,
      ease: 'sine',
    })
  }

  useEffect(() => {
    if (is_firefox) {
      ;(sculpture.current as any).style.opacity = '1'
      ;(sculpture.current as any).classList.add('animated')
      setTimeout(() => {
        growUpElems.current &&
          growUpElems.current.forEach((g) => {
            growUp(g)
          })
      }, 500)
      return
    }

    if (!isSafariDesktop) {
      gsap.from(sculpture.current, {
        transformOrigin: 'bottom center',
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'sine',
      })

      growUpElems.current &&
        growUpElems.current.forEach((g) => {
          growUp(g)
        })
    } else {
      gsap.to(sculpture.current, {
        transformOrigin: 'bottom center',
        scale: 0.9,
        opacity: 1,
        duration: 1,
        ease: 'sine',
      })
    }
  }, [])
  return (
    <div
      className={classNames(
        'sculpture',
        is_firefox && 'firefox',
        isSafariDesktop && !is_firefox && 'safari',
      )}
      ref={sculpture}
    >
      <div className="sculpture--wrap">
        <svg
          className={classNames('sculpture--composition')}
          width="735"
          height="525"
          viewBox="0 0 735 525"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="overall" ref={overall}>
            <clipPath id="first">
              <rect
                className="grow-up"
                ref={(elem) =>
                  growUpElems.current && growUpElems.current.push(elem)
                }
                x="1.88873"
                y="125.741"
                width="477.597"
                height="95.6349"
                transform="rotate(-14.3484 1.88873 125.741)"
              />
            </clipPath>
            <g
              className="grow-up_next first"
              clipPath="url(#first)"
              ref={first}
            >
              <path
                d="M10.567 127.727L33.4396 215.806L44.3865 212.963L34.3879 174.46L70.626 165.05L68.012 154.984L31.7739 164.394L24.1279 134.951L67.9156 123.58L65.3016 113.514L10.567 127.727ZM79.1392 203.939L90.4636 200.998L93.5992 174.799L131.976 164.833L147.463 186.196L159.165 183.157L102.822 103.77L89.8623 107.136L79.1392 203.939ZM94.2893 164.009L99.132 117.488L126.123 155.742L94.2893 164.009ZM146.839 139.349C153.831 166.276 174.955 179.863 200.497 173.23C220.126 168.132 231.027 153.214 229.56 134.119L218.613 136.962C218.544 150.143 210.969 159.765 197.38 163.294C178.884 168.098 163.298 156.699 158.038 136.441C152.744 116.057 160.847 98.6412 179.343 93.838C192.681 90.3744 204.358 94.9979 210.832 106.479L221.779 103.637C213.769 86.2413 196.736 78.5765 177.233 83.6412C151.69 90.2742 139.912 112.674 146.839 139.349ZM224.231 72.2423L247.104 160.321L304.858 145.323L302.244 135.257L255.437 147.412L247.726 117.717L285.348 107.947L282.734 97.8809L245.112 107.651L237.792 79.4656L282.964 67.7353L280.35 57.6691L224.231 72.2423ZM314.243 48.8678L316.857 58.9339L345.419 51.5167L365.678 129.529L376.625 126.686L356.366 48.6739L384.929 41.2567L382.315 31.1905L314.243 48.8678ZM475.801 53.9228C469.07 28.0026 446.93 13.6051 422.142 20.0421C397.355 26.4791 385.018 49.8296 391.749 75.7498C398.48 101.67 420.619 116.068 445.407 109.631C470.195 103.194 482.532 79.8431 475.801 53.9228ZM402.947 72.8418C397.687 52.5837 406.386 34.8788 424.756 30.1082C443.127 25.3376 459.342 36.5728 464.602 56.8309C469.863 77.089 461.164 94.7939 442.793 99.5645C424.422 104.335 408.208 93.0998 402.947 72.8418Z"
                fill="#2B2727"
              />
            </g>
            <clipPath id="second">
              <rect
                ref={(elem) =>
                  growUpElems.current && growUpElems.current.push(elem)
                }
                className="grow-up"
                x="437"
                y="110.616"
                width="284.12"
                height="95.6349"
                transform="rotate(-11.7 437 110.616)"
              />
            </clipPath>
            <g
              className="grow-up_next second"
              clipPath="url(#second)"
              ref={second}
            >
              <path
                d="M438.286 111.812L456.85 200.899L467.922 198.591L459.807 159.648L496.46 152.01L494.338 141.829L457.686 149.467L451.48 119.686L495.769 110.457L493.647 100.276L438.286 111.812ZM503.073 191.267L514.527 188.88L518.932 162.864L557.748 154.775L572.178 176.866L584.014 174.4L531.597 92.3678L518.489 95.0994L503.073 191.267ZM520.146 152.12L527.244 105.89L552.344 145.411L520.146 152.12ZM573.832 130.044C579.507 157.279 599.945 171.877 625.78 166.493C645.634 162.356 657.246 147.985 656.71 128.842L645.638 131.149C644.928 144.311 636.894 153.554 623.149 156.418C604.441 160.316 589.429 148.174 585.159 127.684C580.863 107.067 589.802 90.0655 608.51 86.167C622.001 83.3559 633.439 88.5415 639.347 100.324L650.419 98.0168C643.265 80.2528 626.624 71.7691 606.898 75.8797C581.063 81.2633 568.21 103.064 573.832 130.044ZM654.395 66.7788L672.959 155.865L731.374 143.692L729.253 133.511L681.91 143.377L675.651 113.342L713.704 105.412L711.582 95.231L673.529 103.161L667.589 74.6529L713.277 65.1322L711.156 54.9509L654.395 66.7788Z"
                fill="#2B2727"
              />
            </g>
            <clipPath id="third">
              <rect
                ref={(elem) =>
                  growUpElems.current && growUpElems.current.push(elem)
                }
                className="grow-up"
                x="178.616"
                y="171.038"
                width="300.986"
                height="95.6349"
                transform="rotate(3.27 178.616 171.038)"
              />
            </clipPath>
            <g
              className="grow-up_next third"
              clipPath="url(#third)"
              ref={third}
            >
              <path
                d="M179.102 175.193L200.396 267.556L213.894 268.326L238.64 197.471L255.297 270.688L268.795 271.459L300.585 182.124L288.904 181.458L263.135 256.552L245.944 179.007L234.522 178.355L207.845 253.398L190.913 175.867L179.102 175.193ZM309.175 182.614L303.992 273.467L315.284 274.111L320.467 183.258L309.175 182.614ZM328.599 183.722L328.006 194.106L357.469 195.786L352.878 276.256L364.169 276.9L368.76 196.431L398.222 198.111L398.815 187.728L328.599 183.722ZM406.975 188.064L401.785 279.046L413.076 279.69L415.416 238.677L462.4 241.357L460.06 282.37L471.352 283.015L476.542 192.033L465.251 191.388L462.992 230.974L416.009 228.293L418.267 188.708L406.975 188.064Z"
                fill="#2B2727"
              />
            </g>
            <clipPath id="fourth">
              <rect
                ref={(elem) =>
                  growUpElems.current && growUpElems.current.push(elem)
                }
                className="grow-up"
                x="326"
                y="289.157"
                width="322.276"
                height="95.6349"
                transform="rotate(-3.84 326 289.157)"
              />
            </clipPath>
            <g
              className="grow-up_next fourth"
              clipPath="url(#fourth)"
              ref={fourth}
            >
              <path
                d="M327.356 293.499L333.453 384.295L344.738 383.537L338.641 292.741L327.356 293.499ZM358.442 382.617L369.467 381.876L364.764 311.834L418.238 378.601L428.614 377.904L422.517 287.109L411.492 287.849L416.195 357.892L362.722 291.124L352.345 291.821L358.442 382.617ZM430.657 286.562L431.354 296.939L460.798 294.962L466.198 375.381L477.483 374.623L472.082 294.204L501.526 292.227L500.829 281.85L430.657 286.562ZM508.978 281.303L515.075 372.098L574.611 368.1L573.914 357.724L525.662 360.964L523.607 330.353L562.39 327.749L561.693 317.372L522.91 319.976L520.959 290.922L567.524 287.795L566.827 277.418L508.978 281.303ZM577.287 276.716L583.384 367.511L594.669 366.754L592.326 331.862L615.543 330.303L636.694 363.931L649.405 363.078L626.55 327.349C638.006 323.322 644.997 312.951 644.143 300.239C643.002 283.247 630.208 273.162 612.049 274.381L577.287 276.716ZM589.268 286.335L611.967 284.81C623.771 284.018 631.885 290.378 632.599 301.014C633.314 311.65 626.131 319.169 614.198 319.97L591.629 321.485L589.268 286.335Z"
                fill="#2B2727"
              />
            </g>
            <clipPath id="fifth">
              <rect
                ref={(elem) =>
                  growUpElems.current && growUpElems.current.push(elem)
                }
                className="grow-up"
                x="267"
                y="425.674"
                width="281.814"
                height="95.6349"
                transform="rotate(-12.85 267 425.674)"
              />
            </clipPath>
            <g
              className="grow-up_next fifth"
              clipPath="url(#fifth)"
              ref={fifth}
            >
              <path
                d="M268.398 429.332L288.637 518.053L299.664 515.537L290.816 476.754L327.319 468.427L325.006 458.287L288.503 466.614L281.738 436.956L325.845 426.894L323.531 416.755L268.398 429.332ZM334.67 507.552L346.077 504.95L349.991 478.855L388.648 470.037L403.492 491.852L415.279 489.163L361.326 408.133L348.271 411.111L334.67 507.552ZM351.003 468.091L357.229 421.735L383.069 460.776L351.003 468.091ZM404.263 445.007C410.451 472.13 431.16 486.34 456.889 480.471C476.661 475.96 488.001 461.373 487.104 442.243L476.077 444.759C475.615 457.931 467.757 467.324 454.069 470.447C435.438 474.697 420.199 462.839 415.544 442.434C410.86 421.901 419.477 404.734 438.109 400.484C451.544 397.419 463.078 402.388 469.207 414.058L480.233 411.542C472.745 393.916 455.948 385.747 436.303 390.229C410.574 396.098 398.134 418.137 404.263 445.007ZM483.62 380.235L503.859 468.956L562.035 455.684L559.722 445.545L512.573 456.301L505.749 426.389L543.646 417.744L541.333 407.604L503.436 416.249L496.96 387.859L542.461 377.479L540.148 367.339L483.62 380.235Z"
                fill="#2B2727"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="sculpture--hover sculpture--hover__left" ref={left}></div>
      <div
        className="sculpture--hover sculpture--hover__right"
        ref={right}
      ></div>
      <div
        className="sculpture--hover sculpture--hover__centre"
        ref={center}
      ></div>
    </div>
  )
}

export default Sculpture
