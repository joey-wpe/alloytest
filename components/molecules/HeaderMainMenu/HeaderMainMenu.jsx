import Image from 'next/image';
import styles from './HeaderMainMenu.module.scss';
import HeaderMegaMenu from '../../molecules/HeaderMegaMenu/HeaderMegaMenu';
import FlagCta from '../../atoms/FlagCta/FlagCta';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import HeaderTopMenu from '../../molecules/HeaderTopMenu/HeaderTopMenu';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { flagCTAref, getHomeUrl } from '../../../wplib/util';

const HeaderMainMenu = ({ logos, headerMegaMenu, headerTopData, translatedPages, flag, reduced }) => {
	const { t } = useTranslation('common');
	const [openMenu, setOpenMenu] = useState(false);
	const [subMenuView, setSubMenuView] = useState(false);
	const router = useRouter();
	const { locale, locales } = router;
	const url = router.asPath;

	useEffect(() => {
		setOpenMenu(false);
	}, [url]);

	useEffect(() => {
		const body = document.querySelector('body');
		const globalAlert = document.getElementById('js-global-alert');
		// Overflow hidden on body so page doesn't scroll
		openMenu ? body.classList.add('overflow-hidden') : body.classList.remove('overflow-hidden');
		// Hide global alert on mobile so it doesn't break fixed navbar
		globalAlert && (openMenu ? (globalAlert.style.maxHeight = 0) : (globalAlert.style.maxHeight = 'initial'));
	}, [openMenu]);
	return (
		<div className={`${styles['main-menu']} ${reduced ? styles['main-menu--reduced'] : ''}`}>
			<div className={styles['main-menu__nav']}>
				<div className={styles['main-menu__logo']}>
					{logos && logos?.logo?.uri && (
						<a href={getHomeUrl(locale)}>
							<Image src={logos?.logo?.uri} width={155} height={32} layout="fixed" alt={logos?.logo?.altText ?? ''} />
						</a>
					)}
				</div>
				{headerMegaMenu && (
					<div
						className={styles['main-menu__hamburger']}
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
					>
						<Hamburger className={`${openMenu ? styles['hamburgers__change'] : styles['hamburgers__default']}`} />
					</div>
				)}
			</div>
			{/* Wrapped in a container for mobile view  */}
			<div
				className={`${styles['main-menu__menus-container']} ${
					reduced ? styles['main-menu__menus-container--reduced'] : ''
				} ${openMenu ? styles['main-menu__menus-container--open'] : ''} ${
					subMenuView ? styles['main-menu__menus-container--inactive'] : ''
				}`}
			>
				{headerMegaMenu && (
					<ul className={`${styles['main-menu__columns']}`}>
						{headerMegaMenu.map((data, index) => {
							return (
								<HeaderMegaMenu
									onClick={(e) => {
										setSubMenuView(!subMenuView);
									}}
									className={`${styles.column}`}
									key={index}
									{...data}
								/>
							);
						})}
					</ul>
				)}
				{/* Top Menu displayed on mobile view */}
				{headerTopData && (
					<HeaderTopMenu className={styles['main-menu__top']} translatedPages={translatedPages} {...headerTopData} />
				)}
				<FlagCta
					flagStyle="tertiary"
					className={`${styles['main-menu__flag']} ${reduced ? styles['main-menu__flag--mobile'] : ''}`}
					title={t('flagCTA.trialsDemo')}
					href={flagCTAref(locale)}
				/>
			</div>
		</div>
	);
};

export default HeaderMainMenu;
