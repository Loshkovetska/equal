import { Link, useLocation, useNavigate } from 'react-router-dom'

import './blogArticle.scss'
import MagnetButton from '../common/MagnetButton'
import BlogRelatedSlider from '../BlogRelatedSlider'
import SplitText from '../common/SplitText'
import blog from './blog'
import parse from 'html-react-parser'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll';
import ScrollTrigger from 'gsap/ScrollTrigger'
import GlobalState from '../../stores/GlobalState'
import ScrollToTopIcon from "../../images/icons/arrow_scrollToTop.svg"
import ScrollToPlugin from 'gsap/ScrollToPlugin'

import { useEffect, Fragment, useState, useRef } from 'react'
import { isSafariDesktop, is_firefox } from '../../mocks/info'
import ReactDOMServer from 'react-dom/server'
import { runInAction } from 'mobx'

const BlogArticle = () => {
    gsap.registerPlugin(ScrollToPlugin);
    const { pathname } = useLocation()
    const topRef = useRef<HTMLDivElement>(null)
    const titlesBlock = useRef<HTMLDivElement>(null)
    const articleScroll = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            let section = document.querySelector('.article')
            let slideUp = section?.querySelectorAll('.slide-up'),
                appear = section?.querySelectorAll('.appear'),
                parallax = section?.querySelectorAll('.parallax img')

            if (!section) return
                ; (section as HTMLElement).style.opacity = '1'
            slideUp?.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        toggleActions: 'play none none none',
                    },
                    y: (item as any).innerHeight < 140 ? '110%' : '150',
                    duration: 0.8,
                    stagger: 0.15,
                })
            })

            appear?.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        toggleActions: 'play none none none',
                    },
                    transformOrigin: 'center',
                    y: 200,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                })
            })

            parallax?.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        scrub: 0,
                        onUpdate: (self) => {
                            gsap.to(item, {
                                y: self.progress * 100,
                                ease: 'ease',
                            })
                        },
                    },
                })
            })
            const articlePage = document.querySelector('.article')
            if (articlePage) {
                document.body.style.background = 'transparent'
            }
        }, 500)
    }, [])

    const splitAnchor = (l: any) => {
        const wordsCont = Array.from((l as Element).children).filter(
            (c) => !(c as HTMLElement).classList.contains('whitespace'),
        )
        const charsCont = (l as HTMLElement).querySelectorAll('.char')
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

    useEffect(() => {
        const links = document.querySelectorAll('.article__content-info ul li a')
        links &&
            links.forEach((l: any) => {
                let content = l.textContent
                if (!l.classList.contains('animated')) {
                    l.classList.add('btn--split')
                    l.classList.add('animated')
                    l.classList.add('article-link')
                        ; (l as any).style.setProperty(
                            '--word-total',
                            `${content.split(' ').length}`,
                        )
                    const chars = content.split('')
                    const res = []
                    chars.forEach((c: any) => {
                        if (c != ' ') res.push(c)
                    })
                        ; (l as HTMLElement).style.setProperty('--char-total', `${res.length}`)
                    let html = ''
                    content.split(' ').forEach((w: any, ind: number) => {
                        let middle = ``
                        w.split('').forEach((s: any, idx: number) => {
                            middle += ` <span class="char" data-char='${s}'>${s}</span>`
                        })
                        html += `<span class='word' data-word='${w}'>
            ${middle}
            <span class="full-text">${w}</span>
          </span>
            `

                        html +=
                            ind + 1 != content.split(' ').length
                                ? `<span class="whitespace"></span>`
                                : ''
                    })

                    l.innerHTML = html
                    splitAnchor(l)
                }
            })
    }, [])

    const [initialTitlesOffset, setInitialTitlesOffset] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            const articleBegin = (articleScroll.current as any);
            const windowHalfHeigth = window.innerHeight / 2;
            const currentTitlesBlock = (titlesBlock.current as any);
            const isStartAfterScroll = Math.floor((windowHalfHeigth - (currentTitlesBlock.offsetHeight / 2)))
            if (articleBegin) {
                setInitialTitlesOffset(articleBegin.offsetTop + 120)
                return (document.querySelector('.article__content-info',) as any).style.top = `${isStartAfterScroll}px`;
            }
        }, 700);
    }, [articleScroll.current, initialTitlesOffset])

    useEffect(() => {
        if (GlobalState.locoScroll) {
            ; (GlobalState.locoScroll as any).on('scroll', (args: any) => {
                const windowHalfHeigth = window.innerHeight / 2;
                const currentTitlesBlock = (titlesBlock.current as any);
                const currentArticleBlock = (articleScroll.current as any);
                const isStartAfterScroll = Math.floor((windowHalfHeigth - (currentTitlesBlock.offsetHeight / 2)))
                const isEndOfArticle = currentArticleBlock.offsetHeight + 20

                if (args.scroll.y < isEndOfArticle) {
                    (document.querySelector('.article__content-info',) as any).style.top = `${isStartAfterScroll + args.scroll.y}px`
                }
            })
        }
    }, [articleScroll.current])

    const articleItem = (blog as any).find((c: any) => pathname.includes(c.link))
    if (!articleItem) return <></>


    return (
        <div
            ref={topRef}
            className="article">
            {/* Go back */}
            <div className="slide-wrap">
                <div className="article__link-back slide-up"
                    onClick={() => (window.location.href = '/blog')}
                >
                    <SplitText text={`< Back`} path="/blog" classList="" target />
                </div>
            </div>

            <div className="article__content">
                <div className="article__content-row">
                    {/* Бокове меню */}
                    <div className="article__content-col">

                        <div ref={titlesBlock} className="article__content-info list-desk slide-wrap">
                            <p className='article__content-titles slide-up'>
                                Table of contents
                            </p>
                            {(articleItem.titles as any).map((title: string, id: number) => {
                                return (
                                    <a href='#' className="slide-up article__content-titles_title" key={id} >
                                        {title}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Основний контент */}
                    <div className="article__content-col">
                        <div className="article__content-right">
                            <div>
                                <h1 >{articleItem.title}</h1>
                                <div className="article__type">
                                    <div className="article_read-time">
                                        {articleItem.readTime} min read
                                    </div>
                                    {articleItem.types.join(' / ')}
                                </div>
                            </div>
                            <div ref={articleScroll} id="article-block">
                                {parse(articleItem.description)}

                                <button className="scrollToTop"
                                    onClick={() => {
                                        (GlobalState.locoScroll as any).scrollTo(0, 0, 2000)
                                    }}
                                >
                                    <img src={ScrollToTopIcon} width={17} height={10} alt="" />
                                </button>
                            </div>

                            <div className="article__share-list">
                                <span>Share with:</span>

                                <div className="shareItem">
                                    <SplitText
                                        target={true}
                                        text={'Twitter'}
                                        path={'./Twitter'}
                                        classList="shareItem_link"
                                    />
                                </div>
                                <div className="shareItem">
                                    <SplitText
                                        target={true}
                                        text={'Facebook'}
                                        path={'./Facebook'}
                                        classList="shareItem_link"
                                    />
                                </div>
                                <div className="shareItem">
                                    <SplitText
                                        target={true}
                                        text={'Linkedin'}
                                        path={'./Linkedin'}
                                        classList="shareItem_link"
                                    />
                                </div>
                                <div className="shareItem">
                                    <SplitText
                                        target={true}
                                        text={'Instagram'}
                                        path={'./Instagram'}
                                        classList="shareItem_link"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlogRelatedSlider relatedTypes={articleItem.types} />
            <div className="article__bottom">
                <MagnetButton
                    text="read all articles"
                    wrapperClass="article-next"
                    classList="article__btn-next "
                    path={'/blog'}
                />
            </div>
        </div >
    )
}

export default BlogArticle