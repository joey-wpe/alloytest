import { useState, useEffect } from 'react';
import styles from './HeaderTopMenu.module.scss';
import LanguageSelect from '../../atoms/LanguageSelect/LanguageSelect';
import Search from '../../atoms/Search/Search';
import { removeLastTrailingSlash } from '../../../wplib/util';

const HeaderTopMenu = ({ menu, className, languages, translatedPages }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);


	return (
		<div className={`${styles['top-menu']} ${className ?? styles['top-menu--desktop']}`}>
			<div className={styles['top-menu__container']}>
				<ul className={`${styles['top-menu__list']}`}>
					{menu &&
						menu.map(({ url, label, target, childItems }, index) => {
							// Remove trailing slashes from the link
							url = removeLastTrailingSlash(url)
							if (childItems?.nodes && childItems?.nodes?.length > 0) {
								return (
									<div className={styles['top-menu__dropdown']} key={index}>
										<a
											className={`${styles['top-menu__link']} ${styles['hover-animation-basic']}`}
											href={url ?? ''}
											target={target}
										>
											<div>{label ?? ''}</div>
											<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0.94 0.576538L4 3.61567L7.06 0.576538L8 1.51675L4 5.48947L0 1.51675L0.94 0.576538Z"
													fill="white"
												/>
											</svg>
										</a>
										<div className={`${styles.submenu} ${isLoaded ? '' : styles['page-loading']}`}>
											{childItems?.nodes.map(({ url, label, target }, i) => {
												// Remove trailing slashes from the link
												url = removeLastTrailingSlash(url)
												return (
													<a
														className={`${styles['submenu__link']} ${styles['hover-animation-basic']}`}
														key={i}
														href={url ?? ''}
														target={target}
													>
														{label ?? ''}
													</a>
												);
											})}
										</div>
									</div>
								);
							}
							return (
								<a
									className={`${styles['top-menu__link']} ${styles['hover-animation-basic']}`}
									key={index}
									href={url ?? ''}
									target={target}
								>
									{label ?? ''}
								</a>
							);
						})}
				</ul>
				<Search className={`${styles['top-menu__search']}`} />
				<LanguageSelect menuStyle="secondary" languages={languages} translatedPages={translatedPages} />
			</div>
		</div>
	);
};

export default HeaderTopMenu;
