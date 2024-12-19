import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.scss';
import { ArrowSVG } from '../svg/Svg';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { removeLastTrailingSlash } from '../../../wplib/util';
import { handleScrollOrNavigate } from '../../../wplib/urlHelpers';

const Button = ({
	buttonStyle,
	buttonText,
	buttonIcon,
	target,
	link,
	disabled,
	className,
	adaText,
	seoText,
	action,
	isDecorative,
}) => {
	// console.log(`button with text ${buttonText} has ${adaText} and ${seoText}`);
	const customClassName = className ?? '';

	if (!link && !action && !isDecorative) {
		console.warn('Button component requires a link prop or action - button text was:', buttonText);
		return <div className="bad-link"></div>;
	}

	let parsedLink = null;
	if (link) {
		parsedLink = mediateUrlPath(link);
		parsedLink = removeLastTrailingSlash(parsedLink); // Remove trailing slashes from the link
	}

	const buttonContent = () => {
		return (
			<>
				{`${buttonText ?? '[Placeholder text]'} `}
				{buttonIcon && <>{buttonIcon}</>}
				{adaText && <span className={`${styles['screen-reader-text']}`}>{adaText}</span>}
				{(buttonStyle === 'TertiaryDefault' || buttonStyle === 'TertiaryReverse') && (
					<span className={`${styles.arrowIcon}`}>
						<ArrowSVG />
					</span>
				)}
			</>
		);
	};

	return (
		<>
			<div
				onClick={
					action
						? () => {
								if (action) {
									// console.log('trying to fire action');
									action();
								}
						  }
						: null
				}
				className={`${styles.button_wrapper} ${customClassName} ${styles[buttonStyle]} ${
					disabled ? styles[disabled] : ''
				}`}
			>
				{parsedLink && !isDecorative && (
					<a
						className={`
							${buttonStyle === 'TertiaryDefault' || buttonStyle === 'TertiaryReverse' ? styles['button-underline'] : styles.button}
							`}
						onClick={(event) => {
							// Only handle internal navigation if not opening in new tab
							if (!target || target !== '_blank') {
								handleScrollOrNavigate(event, parsedLink);
							}
						}}
						href={parsedLink}
						title={seoText ? seoText : buttonText}
						{...(target && { target: target })}
					>
						{buttonContent()}
					</a>
				)}
				{!parsedLink && action && (
					<div className={`${styles.button}`} title={seoText ? seoText : buttonText}>
						{buttonContent()}
					</div>
				)}
				{!action && isDecorative && (
					<span
						className={`${styles['is-decorative']} 
							${buttonStyle === 'TertiaryDefault' || buttonStyle === 'TertiaryReverse' ? styles['button-underline'] : styles.button}
							`}
						title={seoText ? seoText : buttonText}
					>
						{buttonContent()}
					</span>
				)}
			</div>
		</>
	);
};

Button.propTypes = {
	buttonStyle: PropTypes.oneOf([
		'PrimaryDefault',
		'PrimaryReverse',
		'SecondaryDefault',
		'SecondaryReverse',
		'TertiaryDefault',
		'TertiaryReverse',
		'SecondaryReverse-white',
	]),
	buttonText: PropTypes.string,
	buttonIcon: PropTypes.node,
	link: PropTypes.string,
	target: PropTypes.oneOf(['_blank', '']),
	disabled: PropTypes.bool,
	className: PropTypes.string, //add a specific className to the component
	adaText: PropTypes.string,
	seoText: PropTypes.string,
	isDecorative: PropTypes.bool,
};

Button.defaultProps = {
	buttonStyle: 'primary',
	color: 'default',
	target: '',
};

export default Button;
