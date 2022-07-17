import React from "react";
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { isTouch } from '../../mocks/info'
import GlobalState from '../../stores/GlobalState'
import blog from '../BlogArticle/blog'
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

const BlogRelatedSlider = observer(({ relatedTypes }: { relatedTypes: any }) => {
	const [casesData, setState] = useState<any>(null)
	const [currentPosition, setCurrentPosition] = useState<Number>(1)
	const { pathname } = useLocation()
	const sliderRef = useRef<Slider | null>(null)
	// const filterByType = (dt: any) => {
	// 	const tab = pathname.includes('-')
	// 		? pathname.split('/').pop()?.split('-').join(' ')
	// 		: pathname.split('/').pop()
	// 	switch (tab) {
	// 		case 'blog':
	// 			setState(dt)
	// 			break
	// 		case `${tab}`:
	// 			const res = dt.filter((d: any) => {
	// 				let flag = false
	// 				d.types.forEach((t: string) => {
	// 					if (t.toLocaleLowerCase().includes(tab.toLocaleLowerCase())) {
	// 						flag = true
	// 					}
	// 				})

	// 				if (flag) return d
	// 			})

	// 			setState(res)
	// 			break
	// 	}
	// }
	useEffect(() => {
		if (GlobalState.locoScroll) (GlobalState.locoScroll as any).update()
		setState(blog)
		ScrollTrigger.refresh()
	}, [pathname])

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
	const isLastSlide = casesData && currentPosition === casesData.length

	return (
		<>
			<section className="blog-slider">
				<div className="blog-slider_row">
					<h4 className="blog-slider_title">
						Related articles
					</h4>

					<div className="blog-slider_controls">
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
					</div>
				</div>
				<Slider
					ref={sliderRef}
					{...settings}>
					{casesData &&
						casesData.map((c: any, idx: number) => {
							return <div className='blog-item' key={idx}>
								<Animated
									animationIn="fadeInUp"
									animationOut="fadeIn"
									animationInDuration={1500}
									animationOutDuration={1500}
									isVisible={true}
									key={idx}
									style={{ width: '100%' }}
								>
									{' '}
									<BlogItem item={c} />
									{' '}
								</Animated>
							</div>
						})}
				</Slider>

				<div className="blog-slider_controls-mobile">
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
				</div>
			</section >
		</>
	)
})

export default BlogRelatedSlider
