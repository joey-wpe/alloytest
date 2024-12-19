import PropTypes from 'prop-types';
import styles from './FooterSecondaryMenu.module.scss';
import LanguageSelect from '../../atoms/LanguageSelect/LanguageSelect';
import { removeLastTrailingSlash } from '../../../wplib/util';

const FooterSecondaryMenu = ({ text, menuEntry, translatedPages, languages }) => {
	return (
		<div className={styles['footer-secondary-menu']}>
			<div className={`${styles['container']} ${styles.content}`}>
				<p className={styles.text}>{text}</p>

				<ul className={styles.list}>
					{menuEntry &&
						menuEntry.map(({ uri, target, linkText }, index) => {
							// Remove trailing slashes from the link
							uri = removeLastTrailingSlash(uri)
							return (
								uri && (
									<a
										className={`${styles.text} ${styles.link} ${styles['hover-animation-basic']}`}
										target={target}
										key={index}
										href={uri}
									>
										{linkText}
									</a>
								)
							);
						})}
				</ul>

				<LanguageSelect languages={languages} translatedPages={translatedPages} />
			</div>
		</div>
	);
};

FooterSecondaryMenu.propTypes = {
	text: PropTypes.string,
	menuEntry: PropTypes.arrayOf(
		PropTypes.shape({
			uri: PropTypes.string,
			target: PropTypes.string,
			linkText: PropTypes.string,
		})
	),
	languages: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
		})
	).isRequired,
};

export default FooterSecondaryMenu;
