import Image from 'next/image';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Logo from '../../atoms/Logo/Logo';
import styles from './LogoSlider.module.scss';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Slider = dynamic(() => import('react-slick'), {
	loading: () => <div />,
});

function Arrow(props) {
	let arrowClass = props.type === 'next' ? `${styles['next-arrow']}` : styles['prev-arrow'];
	const char =
		props.type === 'next' ? (
			<Image src="/icons/arrow-next.svg" alt="Next arrow" width="20" height="20" layout="fixed" />
		) : (
			<Image src="/icons/arrow-prev.svg" alt="Previous arrow" width="20" height="20" layout="fixed" />
		);
	return (
		<span className={arrowClass} onClick={props.onClick}>
			{char}
		</span>
	);
}
const LogoSlider = ({ slides, logosPerRow, alignment }) => {
	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: parseInt(logosPerRow),
		slidesToScroll: 1,
		autoplay: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					centerPadding: '25%',
					centerMode: true,
				},
			},
		],
	};

	return (
		<Slider
			{...settings}
			className={styles['slider-wrapper']}
			nextArrow={<Arrow type="next" />}
			prevArrow={<Arrow type="prev" />}
		>
			{slides?.map((slide, index) => {
				return (
					<div className={`${styles[`text-${alignment}`]}`} key={index}>
						<Logo
							logoURL={slide.url}
							image_width="150"
							image_height="69"
							alt={slide?.alt}
							image_path={slide?.image_path}
							key={index}
							isFirstLoad={index < 6}
						/>
					</div>
				);
			})}
		</Slider>
	);
};
LogoSlider.propTypes = {
	alignment: PropTypes.oneOf(['left', 'center', 'right']),
	slides: PropTypes.array,
	logosPerRow: PropTypes.oneOf([2, 3, 4, 5]),
};

export default LogoSlider;
