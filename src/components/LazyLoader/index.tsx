import { Fragment, useEffect, useRef, useState } from 'react'
// import { useOnScreen } from '../../mocks/hooks'
const LazyLoader = ({
  preload,
  autoplay,
  muted,
  loop,
  classList,
  src,
  srcFetch,
  type,
}: {
  classList: string
  preload: string
  autoplay: boolean
  muted: boolean
  loop: boolean
  src: string
  srcFetch?: string
  type: 'img' | 'video'
}) => {
  const [video, setVideo] = useState<any>(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (type == 'video') {
      if (window.caches) {
        caches
          .open('equal-cache')
          .then((cache) => {
            cache.add(src)
            return cache
          })
          .then((cache) => {
            return caches.match(src).then((cacheResponse: any) => {
              if (
                cacheResponse &&
                cacheResponse.status < 400 &&
                cacheResponse.headers.has('content-type') &&
                cacheResponse.headers.get('content-type').match(/^video\//i)
              ) {
                return cacheResponse
              } else {
                return fetch(src, {
                  signal: signal,
                }).then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    cache.put(src, fetchResponse.clone())
                    return fetchResponse
                  }
                })
              }
            })
          })
          .then((response) => {
            if (!response) {
              return fetch(src, {
                signal: signal,
              })
                .then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    return fetchResponse
                  }
                })
                .then((response) => response?.blob())
            }

            return response.blob()
          })
          .then((data) => {
            let reader = new FileReader()
            reader.readAsArrayBuffer(data)
            reader.onload = function (e) {
              if (e.target) {
                let buffer: any = e.target.result
                let videoBlob = new Blob([new Uint8Array(buffer)], {
                  type: 'video/mp4',
                })
                let url = window.URL.createObjectURL(videoBlob)
                setVideo(url)
              }
            }
          })
      } else {
        fetch(src, {
          signal: signal,
        })
          .then((response) => response.blob())
          .then((data) => {
            let reader = new FileReader()
            reader.readAsArrayBuffer(data)
            reader.onload = function (e) {
              if (e.target) {
                let buffer: any = e.target.result
                let videoBlob = new Blob([new Uint8Array(buffer)], {
                  type: 'video/mp4',
                })
                let url = window.URL.createObjectURL(videoBlob)

                setVideo(url)
              }
            }
          })
      }
    }

    if (type == 'img') {
      if (window.caches) {
        caches
          .open('equal-cache')
          .then((cache) => {
            cache.add(src)
            return cache
          })
          .then((cache) => {
            return caches.match(src).then((cacheResponse: any) => {
              if (
                cacheResponse &&
                cacheResponse.status < 400 &&
                cacheResponse.headers.has('content-type') &&
                cacheResponse.headers.get('content-type').match(/^image\//i)
              ) {
                return cacheResponse
              } else {
                return fetch(src, {
                  signal: signal,
                }).then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    cache.put(src, fetchResponse.clone())
                    return fetchResponse
                  }
                })
              }
            })
          })
          .then((response) => {
            if (!response) {
              return fetch(src, {
                signal: signal,
              })
                .then((fetchResponse) => {
                  if (fetchResponse.ok) {
                    return fetchResponse
                  }
                })
                .then((response) => response?.blob())
            }

            return response.blob()
          })
          .then((imageBlob) => {
            const imageObjectURL = URL.createObjectURL(imageBlob)
            setVideo(imageObjectURL)
          })
      } else {
        fetch(src, {
          signal: signal,
        })
          .then((response) => response.blob())
          .then((imageBlob) => {
            const imageObjectURL = URL.createObjectURL(imageBlob)
            setVideo(imageObjectURL)
          })
      }
    }
    return () => {
      controller.abort()
    }
  }, [src])
  return (
    <>
      {type == 'img' ? (
        <img src={video} alt="" className={classList} />
      ) : (
        <video
          disablePictureInPicture
          className={classList}
          preload={preload}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          src={video}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </>
  )
}
export default LazyLoader
