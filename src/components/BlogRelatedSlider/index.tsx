import React from "react";
import { useEffect, useState, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'
import ScrollToTopIcon from "../../images/icons/arrow_scrollToTop.svg"
import BlogItem from '../BlogItem'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './blogRelated.scss'
import { observer } from 'mobx-react'
import Slider from "react-slick";
import { Animated } from 'react-animated-css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'animate.css/animate.css'
import { api } from '../../api'

const BlogRelatedSlider = observer(({ relatedTypes }: { relatedTypes: any }) => {
	const [blogData, setState] = useState<any>(null)
	const [currentPosition, setCurrentPosition] = useState<Number>(1)
	const { pathname } = useLocation()
	const { id } = useParams()
	const sliderRef = useRef<Slider | null>(null)


	useEffect(() => {
		setTimeout(() => {
			const title = document.querySelectorAll('.selected-blog__title-text')
			if (!title || !document.querySelector('.blog-page')) return
			var tl = gsap.timeline({
				ease: 'power2',
				scrollTrigger: {
					trigger: `.blog-page`,
					start: isTouch ? 'top bottom' : 'top center',
					toggleActions: 'play none none none',
				},
			})
			tl.from(title, {
				autoAlpha: 0,
				yPercent: 100,
				duration: 0.6,
				stagger: 0.2,
			})

			const casePage = document.querySelector('.blog-page')
			if (casePage) {
				document.body.style.background = 'transparent'
			}
		})
	}, [])

	const settings = {
		dots: false,
		infinite: false,
		draggable: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const isFirstSlide = currentPosition === 1
	const isLastSlide = blogData && currentPosition === blogData.length
	const isOnlyOneSlide = blogData && blogData.length > 1

	const articleData = async () => {
		if (!blogData) {
			const blog = await api.blog.getBlog();
			if (blog) {
				const withoutCurrent = blog.filter((article: any) => {
					if (article.id != id) {
						return article
					} else {
						return
					}
				})
				setState(withoutCurrent)
			}
		}
	}

	useEffect(() => {
		if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()
		articleData();

		ScrollTrigger.refresh()
	}, [pathname])


	if (blogData) {
		if (blogData.length === 0) {
			return <></>
		}
	}
	return (
		<>
			<section className="blog-slider">
				<div className="blog-slider_row">
					<h4 className="blog-slider_title">
						Related articles
					</h4>

					{isOnlyOneSlide && <div className="blog-slider_controls">
						<button
							className={`blog-slider_controls-btn control_left ${isFirstSlide && 'disable'}`}
							onClick={() => {
								(sliderRef.current as any).slickPrev();
								setCurrentPosition(+currentPosition - 1)
							}}
						>
							<img src={ScrollToTopIcon} width={17} height={10} alt="" />
						</button>
						<button
							className={`blog-slider_controls-btn control_right ${isLastSlide && 'disable'}`}
							onClick={() => {
								(sliderRef.current as any).slickNext();
								setCurrentPosition(+currentPosition + 1)

							}}
						>
							<img src={ScrollToTopIcon} width={17} height={10} alt="" />
						</button>
					</div>}
				</div>

				<div className="blog-slider_block">
					<Slider
						ref={sliderRef}
						{...settings}>
						{blogData &&
							blogData.map((c: any, idx: number) => {
								return <Animated
									animationIn="fadeInUp"
									animationOut="fadeIn"
									animationInDuration={1500}
									animationOutDuration={1500}
									isVisible={true}
									key={idx}
									style={{ width: '100%' }}
								>
									<div className='blog-item'
										style={{ borderTop: '1px solid transparent' }}>
										{' '}
										<BlogItem item={c} />
										{' '}
									</div>
								</Animated>
							})}
					</Slider>
				</div>

				{isOnlyOneSlide && <div className="blog-slider_controls-mobile">
					<button
						className={`blog-slider_controls-btn control_left ${isFirstSlide && 'disable'}`}
						onClick={() => {
							(sliderRef.current as any).slickPrev();
							setCurrentPosition(+currentPosition - 1)
						}}
					>
						<img src={ScrollToTopIcon} width={17} height={10} alt="" />
					</button>
					<button
						className={`blog-slider_controls-btn control_right ${isLastSlide && 'disable'}`}
						onClick={() => {
							(sliderRef.current as any).slickNext();
							setCurrentPosition(+currentPosition + 1)

						}}
					>
						<img src={ScrollToTopIcon} width={17} height={10} alt="" />
					</button>
				</div>}
			</section >
		</>
	)
})

export default BlogRelatedSlider
