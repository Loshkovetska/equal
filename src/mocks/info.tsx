export const isTouch = /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
)

export const is_win = navigator.appVersion.indexOf('Win') != -1,
  is_mac = navigator.appVersion.indexOf('Mac') != -1

export let is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
  is_safari = navigator.userAgent.toLowerCase().indexOf('safari') > -1,
  isSafariDesktop =
    is_chrome && is_safari ? false : true && window.innerWidth > 1025

export let is_opera = navigator.userAgent.match(/opr\//i) ? true : false,
  is_firefox = navigator.userAgent.match(/firefox|fxios/i) ? true : false

export const zoomData = [
  {
    width: '40vw',
    height: '40vw',
    top: '50%',
    borderRadius: '800px',
    duration: 0.5,
  },
  {
    width: '70vw',
    height: '70vw',
    top: '50%',
    borderRadius: '800px',
    duration: 0.5,
  },
  {
    width: '100vw',
    height: '100vh',
    top: '50%',
    borderRadius: '0',
    duration: 0.5,
  },
  {
    width: '100vw',
    height: '100vh',
    top: '50%',
    borderRadius: '0',
    duration: 0.5,
  },
]
