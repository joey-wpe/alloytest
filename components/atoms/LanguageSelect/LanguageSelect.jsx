import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { deleteCookie } from 'cookies-next';

import styles from './LanguageSelect.module.scss';
import { ArrowSVG } from '../svg/Svg';
import GlobalConstants from '../../../GlobalConstants';
import { invertObject } from '../../../wplib/util';

const LanguageSelect = ({ menuStyle = 'primary', languages, translatedPages }) => {
	const caretDownPath = `<path d="M4.94 6.68628L8 9.73566L11.06 6.68628L12 7.62966L8 11.6158L4 7.62966L4.94 6.68628Z" fill="#A7BBD0"/>`;
	const router = useRouter();
	const { locale } = router;
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	const langCodeList = GlobalConstants.LangCodeList;
	// LangStringList is the same as LangCodeList, just inverted (keys are values).
	const langStringList = invertObject(langCodeList);
	const langDbCodeList = GlobalConstants.LangDbCodeList;

	const handleClick = (uri, locale) => {
		setMenuIsOpen(false);

		// NOTE:: As of June 20, 2024, we agreed to no longer set this 'NEXT_LOCALE' cookie because it causes an SSR pass for any users that
		// hit the homepage and have this cookie set - which can manifest as SSR function timeouts should the page not render in time. To avoid
		// that we will not use this cookie. (REF: TR2-665)
		// setCookie('NEXT_LOCALE', locale); // Set the selected locale as the preffered one.
	};

	// NOTE:: in an attempt to avoid SSR requests (which happen when 'NEXT_LOCALE' is set), we are forcefully removing any instance of this cookie.
	// (REF: TR2-665)
	deleteCookie('NEXT_LOCALE');

	if (translatedPages?.length > 0) {
		return (
			<div
				className={`${styles['language-select']} ${styles['language-select--' + menuStyle] ?? ''} ${
					menuIsOpen ? styles['language-select--open'] : ''
				}`}
				onClick={() => setMenuIsOpen(!menuIsOpen)}
			>
				<div className={`${styles.icon}`}>
					<Image src="/icons/language.svg" alt="Language" layout="fixed" width={14} height={14} />
				</div>
				<p className={styles.language}>{langStringList[locale]}</p>
				<ArrowSVG width="16" height="17" path={caretDownPath} viewBox="0 0 16 17" className={styles.arrow} />

				<div className={`${styles.options}`}>
					{languages &&
						languages.map(({ name }) => {
							const translatedPage = translatedPages?.filter((t) => t.locale.locale === langDbCodeList[name])[0];
							if (translatedPage) {
								return (
									name !== langStringList[locale] && (
										<p className={styles.option} key={name}>
											<a onClick={() => handleClick(translatedPage.uri, langCodeList[name])} href={translatedPage.uri}>
												{name}
											</a>
										</p>
									)
								);
							} else {
								return null;
							}
						})}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

LanguageSelect.propTypes = {
	languages: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
		})
	).isRequired,
	menuStyle: PropTypes.oneOf(['primary', 'secondary']),
};

export default LanguageSelect;
