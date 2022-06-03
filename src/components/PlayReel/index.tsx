import './play-reel.scss'
import { useEffect, useRef, useState } from 'react'
import GlobalState from '../../stores/GlobalState'
import img from '../../images/show-reel-mob.jpg'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { isSafariDesktop, isTouch, zoomData } from '../../mocks/info'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const PlayReel = observer(() => {
  const reelPreview = useRef<any>(null)
  const reelFull = useRef<any>(null)
  const scrollDown = useRef<any>(null)
  const playBox = useRef<any>(null)
  const playReel = useRef<any>(null)

  const changePlayerState = () => {
    let preview: any = document.querySelector('.reel-preview'),
      full: any = document.querySelector('.reel-full'),
      playReel: any = document.querySelector('.play-reel')

    if (!preview || !full || !playReel) return
    preview.classList.add('d-none')
    playReel.classList.add('video-started')
    ;(preview as any).pause()
    if (full.paused) {
      document.querySelector('body')?.classList.add('playing-video')
      let value = 0
      if (!isTouch) {
        if (window.innerWidth >= 1920) {
          value = (playReel.parentNode as HTMLElement)?.offsetHeight - 10
        } else if (window.innerWidth < 1920 && window.innerWidth > 1536) {
          value = (playReel.parentNode as HTMLElement)?.offsetHeight
        } else if (window.innerWidth == 1536) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y / 2
        } else if (1536 > window.innerWidth && window.innerWidth > 1440) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y +
            10
          console.log(value)
        } else if (window.innerWidth == 1440) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y +
            10
        } else if (window.innerWidth < 1440 && window.innerWidth > 1366) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y
        } else if (window.innerWidth > 1024 && window.innerWidth <= 1366) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y
        } else if (window.innerWidth <= 1024) {
          value =
            (playReel.parentNode as HTMLElement)?.offsetHeight -
            (preview as HTMLElement).getBoundingClientRect().y / 2 +
            100
        }
      } else {
        let transf = getComputedStyle(
          document.querySelector('.play-reel__video') as any,
        )
          .transform.replaceAll(')', '')
          .replaceAll('(', '')
          .replaceAll(' ', '')
          .split(',')
          .pop()

        console.log(
          (full as HTMLElement).getBoundingClientRect(),
          (full as HTMLElement).offsetTop,
        )
        value = (full as HTMLElement).offsetTop
        if (transf) {
          value += +transf < 0 ? +transf * -1 : +transf
        }

        // ;(GlobalState.locoScroll as any).scrollTo(0, 1800, 2000)
      }
      // if (!isTouch) {
      //   const val = isSafariDesktop ? 150 : -10
      //   console.log(
      //     (playReel.current?.parentNode as HTMLElement)?.offsetHeight,
      //     window.innerHeight,
      //   )
      //   const value =
      //     (playReel.current?.parentNode as HTMLElement)?.offsetHeight -
      //     window.innerHeight +
      //     val
      //   ;(GlobalState.locoScroll as any).scrollTo(0, value, 2000)
      // } else {
      //   if (window.innerWidth < 650) {
      //     const value =
      //       (reelFull.current as HTMLElement)?.offsetHeight -
      //       window.innerHeight / 2

      //     ;(GlobalState.locoScroll as any).scrollTo(0, value, 2000)
      //   } else {
      //     const value =
      //       (reelFull.current as HTMLElement)?.offsetHeight -
      //       window.innerHeight / 3
      //     ;(GlobalState.locoScroll as any).scrollTo(0, value, 2000)
      //   }
      // }
      ;(GlobalState.locoScroll as any).scrollTo(0, value, 2000)
      if (
        document.querySelector('body')?.classList.contains('video-need-replay')
      ) {
        document.querySelector('body')?.classList.remove('video-need-replay')
      }

      full.play()
    } else {
      document.querySelector('body')?.classList.remove('playing-video')
      full.pause()
    }

    ;(full as HTMLVideoElement).addEventListener('ended', () => {
      document.querySelector('body')?.classList.remove('playing-video')
      document.querySelector('body')?.classList.add('video-need-replay')
    })
  }

  useEffect(() => {
    gsap.from('.play-reel__video', {
      transformOrigin: 'center bottom',
      scale: isTouch ? 1 : 0,
      opacity: 0,
      duration: isSafariDesktop ? 0.3 : 0.6,
      delay: isTouch ? 0.1 : 0,
      ease: isSafariDesktop ? 'linear' : 'sine',
    })
  }, [])

  useEffect(() => {
    if (!isTouch) {
      setTimeout(() => {
        if (!document.querySelector('.play-reel')) return
        var tl = gsap.timeline({
          ease: 'Power0.easeNone',
          scrollTrigger: {
            pin: true,
            trigger: '.play-reel',
            start: 'center center',
            end: '+=2000',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onLeave: ({ progress, direction, isActive }) => {
              console.log('onleave')
              ;(document.querySelector(
                '.play-reel .scroll-down-translate',
              ) as any)!.style.opacity = '1'
              ;(document.querySelector(
                '#root>.scroll-down-translate',
              ) as any).style.opacity = '0'
              let video: any = document.querySelector('.reel-full')
              if (!video) return
              if (!video?.paused) {
                document
                  .querySelector('body')
                  ?.classList.remove('playing-video')
                video?.pause()
              }
              ;(GlobalState.cursorRef as any)?.classList.remove('cursor-play')
              document
                .querySelector('.cursor__ball')
                ?.classList.remove('cursor-play')
            },
            onEnterBack: () => {
              console.log('onenter back')
              let event = new Event('mousemove') // (*)
              document.querySelector('.play-reel')?.dispatchEvent(event)
              ;(document.querySelector(
                '.play-reel .scroll-down-translate',
              ) as any)!.style.opacity = '0'
              ;(document.querySelector(
                '#root>.scroll-down-translate',
              ) as any)!.style.opacity = '1'
            },
            onUpdate: ({ progress, direction, isActive }) => {
              let video: any = document.querySelector('.reel-full')
              if (!video) return

              if (progress < 0.75 && direction == -1) {
                if (!video?.paused) {
                  document
                    .querySelector('body')
                    ?.classList.remove('playing-video')
                  video?.pause()
                }
              }
              if (document.querySelector('body.video-need-replay')) {
                ;(scrollDown.current as HTMLElement).style.setProperty(
                  'display',
                  'none',
                )
              }
            },
          },
          defaults: { ease: 'none' },
        })
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.intro',
              start: 'top top-=10',
              scrub: true,
            },
          })
          .to('.intro', {
            y: -400,
            ease: !isSafariDesktop ? 'power1.inOut' : 'linear',
          })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.play-reel',
              start: 'top center+=72',
              end: 'center center-=4',
              scrub: true,
              onEnter: ({ progress, direction, isActive }) => {
                console.log('onenter')

                let item: any = document.querySelector('.play-reel')
                if (!item) return

                if (isActive) {
                  item?.classList.add('active')
                  item?.setAttribute('cursor-class', 'cursor-play')
                  ;(document.querySelector(
                    '.play-reel .scroll-down-translate',
                  ) as any)!.style.opacity = '0'
                  ;(document.querySelector(
                    '.intro .scroll-down',
                  ) as any).style.opacity = '0'
                  ;(document.querySelector(
                    '#root> .scroll-down-translate',
                  ) as any).style.opacity = '1'
                }
                let event = new Event('mousemove') // (*)
                document.querySelector('.play-reel')?.dispatchEvent(event)
              },
              onLeaveBack: ({ progress, direction, isActive }) => {
                console.log('onleave back')

                if (!isActive) {
                  let item: any = document.querySelector('.play-reel')
                  let itemChild: any = document.querySelector(
                    '.play-reel__video',
                  )

                  if (!item || !itemChild) return
                  item?.classList.remove('active')
                  itemChild?.setAttribute('cursor-class', 'cursor-dark')
                  item.setAttribute('cursor-class', 'cursor-dark')
                  ;(GlobalState.cursorRef as any)?.classList.remove(
                    'cursor-play',
                  )
                  ;(document.querySelector(
                    '.cursor__ball',
                  ) as any)?.classList.remove('cursor-play')
                  ;(document.querySelector(
                    '#root>.scroll-down-translate',
                  ) as any)!.style.opacity = '0'
                  ;(document.querySelector(
                    '.intro .scroll-down',
                  ) as any).style.opacity = '1'
                }
              },
            },
          })
          .to('.play-reel__video', {
            top: '50%',
            ease: isSafariDesktop ? 'none' : 'linear',
            duration: 0.1,
          })

        zoomData.slice(1).forEach((data) => {
          tl.to('.play-reel__video', {
            width: data.width,
            height: data.height,
            borderRadius: data.borderRadius,
            duration: data.duration,
            transform: 'translate(-50%, -50%)',
            ease: 'power1.inOut',
          })
        })
      })
    } else {
    }
    ScrollTrigger.refresh()

    return () => {
      const all = ScrollTrigger.getAll()

      all.forEach((a) => {
        if (a) {
          a.kill(true)
        }
      })
    }
  }, [])
  return (
    <section
      className={classNames('play-reel', isSafariDesktop && 'safari')}
      ref={(el) => {
        GlobalState.cursorRefs.push(el)
        playReel.current = el
      }}
      cursor-class="cursor-dark"
    >
      <div
        className="play-reel__video zoom-in_video"
        cursor-class="cursor-dark"
        onClick={changePlayerState}
        ref={(el) => {
          GlobalState.cursorRefs.push(el)
          playBox.current = el
        }}
      >
        <span className="play-reel__text">Play our reel</span>

        <img src={img} alt="" className={'reel-preview-mob'} />
        <video
          ref={reelPreview}
          className={'reel-preview'}
          preload="auto"
          autoPlay={true}
          muted={true}
          loop={true}
          disablePictureInPicture
        >
          <source
            src={'https://equal.design/videos/main.mp4'}
            type="video/mp4"
          />
        </video>

        <video
          className={'reel-full'}
          preload="none"
          ref={reelFull}
          disablePictureInPicture
        >
          <source
            type="video/mp4"
            src={'https://equal.design/videos/SHOWREEL FIXED DOT.mp4'}
          />
        </video>
        <div className="scroll-down" ref={scrollDown}>
          <span>or scroll down</span>
        </div>
        <div className="scroll-down-translate">
          <span>Scroll down</span>
        </div>
      </div>
    </section>
  )
})

export default PlayReel
