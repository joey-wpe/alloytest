import PropTypes from 'prop-types';
import styles from './SecondaryNav.module.scss';
import Button from '../../atoms/Button/Button';
import { useEffect, useState } from 'react';
import { ArrowSVG } from '../../atoms/svg/Svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { removeLastTrailingSlash } from '../../../wplib/util';
import useLocationHash from '../../../components/non-visual/custom-hooks/locationHash';

const SecondaryNav = ({ logo, navigation, cta, secondaryCta, sectionRefs }) => {
	const [openDropDown, setOpenDropDown] = useState(false);
	const caretDownOrange = `<path d="M8 8L16 -9.53674e-07L11.474 -1.34121e-08L7.99976 3.47427L4.52549 4.42834e-07L3.83895e-07 9.0626e-07L8 8Z" fill="#FF6C0E"/>`;
	const offset = 60;

	const handleScrollToRef = (value) => {
		if (value) {
			const offsetPosition = value.current.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
		}
	};
	const router = useRouter();

	const currentPage = router.asPath.trim().replace(/\/$/, ''); //remove white spaces and trim slashes

	const [linkTextShow, setlinkTextShow] = useState(logo?.mobile ?? '');

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window?.location?.hash?.substring(1);
			if (hash) {
				const element = document.getElementById(hash);
				if (element) {
					setTimeout(() => {
						element.scrollIntoView({ behavior: 'smooth' });
					}, 1500);
				}
			}
		};

		window.addEventListener('hashchange', handleHashChange);
		// Check the hash when the component mounts
		handleHashChange();
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	return (
		<nav
			className={`${styles['secondary-nav']} ${logo?.desktop?.url ? styles['nav-whit-logo'] : styles['nav-simple']}`}
		>
			{(secondaryCta?.link || cta?.link) && (
				<div className={styles['secondary-nav-mobileCta']}>
					{secondaryCta?.link && (<Button {...secondaryCta} />)}
					{cta?.link && (<Button {...cta} />)}
				</div>
			)}
			<div className={styles['secondary-nav__container']}>
				<div onClick={() => setOpenDropDown(!openDropDown)} className={styles['secondary-nav__header']}>
					{logo?.desktop?.url && (
						<div className={styles['secondary-nav__logo']}>
							<Image
								className={styles.logo}
								src={logo?.desktop?.url}
								alt={logo?.desktop?.alt}
								layout="intrinsic"
								width={150}
								height={23}
								objectFit="contain"
								objectPosition="left"
							/>
						</div>
					)}
					<div className={styles['secondary-nav__mobile-logo']}>{linkTextShow}</div>
					<div
						className={`${styles['secondary-nav__caret']} ${
							openDropDown ? styles['secondary-nav__caret--rotate'] : ''
						}`}
					>
						<ArrowSVG width="16" height="8" path={caretDownOrange} viewBox="0 0 16 8" />
					</div>
				</div>
				<div
					className={`${styles['secondary-nav__dropdown']} ${
						openDropDown ? styles['secondary-nav__dropdown--open'] : ''
					} ${styles['hover-animation-basic']}`}
				>
					<ul className={styles['secondary-nav__list']}>
						{navigation &&
							navigation.map((data, index) => {
								let { linkText, target, uri, openLinkInANewTab } = data;
								// Remove trailing slashes from the link
								uri = removeLastTrailingSlash(uri);

								var showSecondaryUnderline = false;
								if (uri.trim().replace(/\/$/, '').endsWith(currentPage)) {
									showSecondaryUnderline = true;
								}

								return (
									<li
										onClick={() => {
											handleScrollToRef(sectionRefs?.current[index]);
											setOpenDropDown(false);
											setlinkTextShow(linkText);
										}}
										key={index}
										className={`${styles['secondary-nav__item']} ${styles['hover-animation-basic']}`}
									>
										{uri?.includes('http') || uri?.includes('#') || uri?.startsWith('/') ? (
											<a
												className={`${showSecondaryUnderline && styles['item--active']}`}
												href={uri}
												{...(openLinkInANewTab?.length && { target: '_blank', rel: 'noreferrer' })}
											>
												{linkText}
											</a>
										) : (
											<a
												onClick={(e) => e.preventDefault()}
												href={uri}
												{...(openLinkInANewTab?.length && { target: '_blank', rel: 'noreferrer' })}
											>
												{linkText}
											</a>
										)}
									</li>
								);
							})}
					</ul>
					{(secondaryCta?.link || cta?.link) && (
						<div className={styles['secondary-nav-cta']}>
							{secondaryCta?.link && (<Button {...secondaryCta} />)}
							{cta?.link && (<Button {...cta} />)}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

SecondaryNav.propTypes = {
	logo: PropTypes.object,
	navigation: PropTypes.arrayOf(
		PropTypes.shape({
			linkText: PropTypes.string,
			target: PropTypes.oneOf(['_blank', '']),
			uri: PropTypes.string,
		})
	),
	cta: PropTypes.shape({
		buttonStyle: PropTypes.string,
		buttonText: PropTypes.string,
		link: PropTypes.string,
		seoText: PropTypes.string,
		adaText: PropTypes.string
	}),
	secondaryCta: PropTypes.shape({
		buttonStyle: PropTypes.string,
		buttonText: PropTypes.string,
		link: PropTypes.string,
		seoText: PropTypes.string,
		adaText: PropTypes.string
	})
};

export default SecondaryNav;
