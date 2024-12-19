import React, { useState, useEffect } from 'react';
import styles from './NavigationLinksListing.module.scss';
import { useTranslation } from 'next-i18next';
import { ArrowIcon } from '../../atoms/svg/ArrowIcon';

const NavigationLinksListing = ({ navigation }) => {
	const { t } = useTranslation('common');

	const [btnTab, setBtnTab] = useState(0);
	const [dropdownLinks, setDropdownLinks] = useState(false);

	const scrollToElement = () => {
		const id = window.location.hash;
		const element = document.querySelector(id);
		if (element) {
			const headerHeight = document.querySelector('header').offsetHeight;
			const elPos = element.getBoundingClientRect().top;
			const offsetPos = elPos + window.pageYOffset - headerHeight;
			const navDistanceOffset = 180;

			window.scrollTo({
				top: offsetPos + navDistanceOffset,
				behavior: 'smooth',
			});
		}
	};

	const handleClick = (e, url) => {
		setTimeout(() => {
			scrollToElement();
		}, 100);
	};

	useEffect(() => {
		navigation.map(({ url, textLink }, index) => {
			if (url === window.location.hash) {
				setBtnTab(index);
			}
		});
	}, []);

	return (
		<nav
			className={styles['content-nav']}
			onClick={() => {
				setDropdownLinks(!dropdownLinks);
			}}
		>
			<ul className={`${styles['navigation-link']} ${dropdownLinks && styles['open-nav']}`}>
				{navigation &&
					navigation.map(({ url, textLink }, index) => {
						return (
							<li
								className={`${styles['navigation-link__item']} ${
									btnTab === index && styles['navigation-link__item--active']
								} ${dropdownLinks && styles['dropdown-open-item']}`}
								key={index}
								onClick={() => setBtnTab(index)}
							>
								<a onClick={(e) => handleClick(e, url)} href={url}>
									{textLink}
								</a>
							</li>
						);
					})}
			</ul>
			<div className={`${styles['content-arrow']} ${dropdownLinks && styles['content-arrow--active']}`}>
				<ArrowIcon />
			</div>
		</nav>
	);
};

export default NavigationLinksListing;
