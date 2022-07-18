import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import LazyLoader from '../LazyLoader'
import { observer } from 'mobx-react'
import { runInAction } from 'mobx'
import GlobalState from '../../stores/GlobalState'
import ScrollTrigger from 'gsap/ScrollTrigger'

const formats = {
  img: 'png.webp',
  video: 'mp4',
}

const BlogItem = observer(({ item }: { item: any }) => {
  useEffect(() => {
    setTimeout(() => {
      const parallax = document.querySelectorAll('.blog-item .parallax')
      if (window.innerWidth > 767) {
        parallax.forEach((item) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              scrub: 0.5,

              onUpdate: (self) => {
                gsap.to(item, {
                  y: self.progress * 100,
                  ease: 'ease',
                })
              },
            },
          })
        })
      }
      ScrollTrigger.refresh()

    })
  }, [])

  useEffect(() => {
    const blog = document.querySelectorAll('.blog-item__img')

    blog.forEach((c) => {
      c.addEventListener('mousemove', () => {
        const classname: any = c.getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.add(classname)
      })

      c.addEventListener('mouseleave', () => {
        const classname: any = c.getAttribute('cursor-class')
        document.querySelector('.cursor__ball')?.classList.remove(classname)
      })
    })

    return () => {
      blog.forEach((c) => {
        c.removeEventListener('mousemove', () => {
          const classname: any = c.getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.add(classname)
        })

        c.removeEventListener('mouseleave', () => {
          const classname: any = c.getAttribute('cursor-class')
          document.querySelector('.cursor__ball')?.classList.remove(classname)
        })
      })
    }
  }, [])

  return (
    <Link
      to={`/article/${item.id}`}
      className="blog-item__img"
      cursor-class="cursor-blog"
      ref={(el) =>
        runInAction(() => {
          GlobalState.cursorRefs.push(el)
        })
      }
    >
      <div className="blog-item_read-time">
        {item.readTime} min read
      </div>

      <div className="blog-item__info">
        <div className="blog-item__title">{item.title}</div>
        <div className="blog-item__type">{item.types.join(' / ')}
          <div className="blog-item_read-time_mobile">
            {item.readTime} min read
          </div>
        </div>
      </div>

      <div className='item__img'>
        {formats.img.includes(item.src.split('.').pop()) ? (
          <LazyLoader
            classList="item__img"
            preload="auto"
            autoplay
            muted
            loop
            src={item.src}
            type="img"
          />
        ) : (
          <LazyLoader
            classList=""
            preload="auto"
            autoplay={true}
            muted={true}
            loop={true}
            src={item.src}
            type="video"
          />
        )}
      </div>

    </Link>
  )
})

export default BlogItem
