import Image from 'next/image';
import PropTypes from 'prop-types';
import FlagCta from '../../atoms/FlagCta/FlagCta';
import styles from './FooterActionBar.module.scss';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getHomeUrl } from '../../../wplib/util';

const FooterActionBar = ({ logo, ctaTitle, ctaText, ctaHref }) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const { locale } = router;

	return (
		<div className={styles['footer-action-bar']}>
			<div className={`${styles['container']} ${styles.content}`}>
				<a className={styles.logo} href={getHomeUrl(locale)}>
					<Image src={logo} width={194} height={40} layout="fixed" alt={t('footer.tricentisLogo')} />
				</a>

				<FlagCta
					flagStyle="secondary"
					className={styles.flag}
					title={ctaTitle ?? '[Placeholder title]'}
					text={ctaText ?? '[Placeholder text]'}
					href={ctaHref ?? 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com'}
				/>
			</div>
		</div>
	);
};

FooterActionBar.propTypes = {
	logo: PropTypes.string,
	ctaTitle: PropTypes.string,
	ctaText: PropTypes.string,
	ctaHref: PropTypes.string,
};

export default FooterActionBar;
