import PropTypes from 'prop-types';
import styles from './Background.module.scss';
import Image from 'next/image';

const Background = ({
	type,
	color,
	children,
	className,
	desktopBackgroundImage,
	mobileBackgroundImage,
	isPriorityImage,
	scrollRefGrandChild,
	paddings,
}) => {
	const themeColors = {
		blaze: 'dark-theme',
		blue: 'dark-theme',
		midtone: 'midtone-theme',
		rainbow: 'light-theme',
		white: 'light-theme',
		warp: 'midtone-theme',
		accelerate: 'midtone-theme',
		transparent: 'transparent',
	};
	const themeColor = themeColors[color] ?? '';
	const scrollRef = scrollRefGrandChild ?? null;
	const verticalPaddingTop = paddings?.verticalPadding === 'default' ? 'medium' : paddings?.verticalPadding;
	const verticalPaddingBottom = paddings?.bottomPadding === 'default' ? 'medium' : paddings?.bottomPadding;
	const customClassName = className ?? '';

	// validate valid properties passed in
	if (type === 'image' && !desktopBackgroundImage) {
		console.error(
			'Error: Background type of "image" requires desktopBackgroundImage value, falling back to blaze pattern!'
		);
		type = 'pattern';
		color = 'blaze';
	}

	if (isPriorityImage && mobileBackgroundImage) {
		console.warn(
			'Warning: Background "image" type cannot use priority if both a desktop and a mobile image are provided as it is unclear which should be priority, and if both are priority PSI will ping us for not using an image that was preloaded!'
		);
	}

	// handling for images
	if (type === 'image') {
		const desktopImageSrc = desktopBackgroundImage;
		const mobileImageSrc = mobileBackgroundImage ? mobileBackgroundImage : null;
		const desktopOnly = mobileImageSrc === null;

		return (
			<div
				className={`${styles['content-bg']} ${themeColor} ${
					verticalPaddingTop ? styles[`padding-top-${verticalPaddingTop}`] : ''
				} ${verticalPaddingBottom ? styles[`padding-bottom-${verticalPaddingBottom}`] : ''}`}
				ref={scrollRef}
			>
				<div className={`${styles['image-bg']} ${customClassName}`}>
					{/* if there's only a desktop image then the Image tag is straightforward, if we have desktop and mobile then
					    we have to show hide them individually via CSS */}
					{desktopOnly ? (
						<Image
							src={desktopImageSrc}
							layout="fill"
							objectFit="cover"
							objectPosition="center"
							alt="Background"
							priority={isPriorityImage}
						/>
					) : (
						<>
							{/* NextJS doesn't currently support swapping images based on screen size, and traditional checking of
									a window size does not work in statically built pages. As such we have two Image components and control
									their visibility with CSS
									ref: https://github.com/vercel/next.js/discussions/19880
									*/}
							<Image
								className={styles['image-bg-desktop']}
								src={desktopImageSrc}
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								alt="Background"
							/>
							<Image
								className={styles['image-bg-mobile']}
								src={mobileImageSrc}
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								alt="Background"
							/>
						</>
					)}
				</div>
				{children}
			</div>
		);
	} else if (type === 'pattern') {
		// TODO:: TR-402 - we want to replace this approach with an SVG instead

		// for the rainbow pattern we contain instead of cover, and we use an image instead of an SVG
		if (color === 'rainbow') {
			const patternImage = `/img/backgrounds/rainbow-pattern.png`;
			return (
				<div
					className={`${styles['content-bg']} ${themeColor} ${
						verticalPaddingTop ? styles[`padding-top-${verticalPaddingTop}`] : ''
					} ${verticalPaddingBottom ? styles[`padding-bottom-${verticalPaddingBottom}`] : ''}`}
					ref={scrollRef}
				>
					<div className={`${styles['image-bg']} ${customClassName}`}>
						<Image
							src={patternImage}
							layout="fill"
							objectFit="contain"
							objectPosition="center"
							alt="Background"
							priority={isPriorityImage}
						/>
					</div>
					{children}
				</div>
			);
		} else {
			const style = {
				backgroundImage: `url(/img/backgrounds/pattern-${color}.svg)`,
				backgroundSize: 'cover',
			};
			return (
				// an SVG pattern
				<div className={`${styles['content-bg']} ${themeColor}`} ref={scrollRef}>
					<div
						className={`${customClassName} ${themeColor} ${
							verticalPaddingTop ? styles[`padding-top-${verticalPaddingTop}`] : ''
						} ${verticalPaddingBottom ? styles[`padding-bottom-${verticalPaddingBottom}`] : ''}`}
						style={style}
					>
						{children}
					</div>
				</div>
			);
		}
	} else {
		// for gradients we append -gradient to the main class name (ex: warp-gradient) as there are both
		// solid and gradient versions of the warp color
		var styleName = color;
		if (type === 'gradient') {
			styleName = `${color}-gradient`;
		}

		// type is 'solid' or 'gradient', and handled just by CSS styles
		return (
			<div
				className={`${styles.background} ${styles[styleName] ?? ''} ${customClassName} ${themeColor} ${
					verticalPaddingTop ? styles[`padding-top-${verticalPaddingTop}`] : ''
				} ${verticalPaddingBottom ? styles[`padding-bottom-${verticalPaddingBottom}`] : ''}`}
				ref={scrollRef}
			>
				{children}
			</div>
		);
	}
};

Background.propTypes = {
	// NOTE:: `gradient` should only be used by the GlobalAlert as it has special allowed colors
	type: PropTypes.oneOf(['pattern', 'solid', 'image', 'gradient']),
	// NOTE:: `accelerate` and `warp` should only be used by the GlobalAlert as it has special allowed colors
	color: PropTypes.oneOf(['white', 'light', 'rainbow', 'blaze', 'blue', 'accelerate', 'warp', 'transparent']),
	children: PropTypes.node,
	className: PropTypes.string,
	desktopBackgroundImage: PropTypes.string,
	mobileBackgroundImage: PropTypes.string,
	isPriorityImage: PropTypes.bool,
};

export default Background;
