import FooterMenuColumn from '../../molecules/FooterMenuColumn/FooterMenuColumn';
import FooterSecondaryMenu from '../../molecules/FooterSecondaryMenu/FooterSecondaryMenu';
import styles from './Footer.module.scss';
import PropTypes from 'prop-types';
import FooterActionBar from '../../molecules/FooterActionBar/FooterActionBar';
import { FacebookSvg } from '../../atoms/IconSocial/FacebookSvg';
import { LinkedinSvg } from '../../atoms/IconSocial/LinkedinSvg'
import { ShiftsyncSvg } from '../../atoms/IconSocial/ShiftsyncSvg';
import { TwitterSvg } from '../../atoms/IconSocial/Twitter';
import { YoutubeSvg } from '../../atoms/IconSocial/Youtube';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { flagCTAref } from '../../../wplib/util';

const Footer = ({
	footerMenuColumns,
	secondaryFooterMenuEntries,
	socialMedia,
	footerActionBar,
	translatedPages,
	reduced,
}) => {
	const { t } = useTranslation('common');
	const footerCtaText = t('footer.footerCtaText'); // formerly footerActioNBar?.ctaText
	const footerCtaTitle = t('footer.footerCtaTitle'); // formerly footerActionBar?.ctaTitle
	const router = useRouter();
	const { locale } = router;
	const Icons = {
		facebook: { svg: <FacebookSvg />, title: 'Facebook' },
		linkedin: { svg: <LinkedinSvg />, title: 'Linkedin' },
		twitter: { svg: <TwitterSvg />, title: 'Twitter' },
		shiftsync: { svg: <ShiftsyncSvg />, title: 'Shiftsync' },
		youtube: { svg: <YoutubeSvg />, title: 'Youtube' },
	};

	return (
		<footer className={styles.footer}>
			<div className={`${styles['container']} ${styles.content} ${reduced ? styles['hide-container'] : ''}`}>
				<div className={styles.columns}>
					{footerMenuColumns &&
						footerMenuColumns.map((data, index) => {
							return <FooterMenuColumn key={index} {...data} />;
						})}

					{socialMedia && (
						<div className={styles['social-media']}>
							<p className={styles['social-media-title']}>Follow Us</p>
							<ul className={styles['social-media-list']}>
								{socialMedia.map(({ icon, uri }, index) => {
									return (
										<a className={styles['icon-social']} title={Icons[icon].title} key={index} href={uri}>
											{Icons[icon].svg}
										</a>
									);
								})}
							</ul>
						</div>
					)}
				</div>
			</div>

			{footerActionBar && (
				<FooterActionBar
					logo={footerActionBar.logo}
					ctaTitle={footerCtaTitle}
					ctaText={footerCtaText}
					ctaHref={flagCTAref(locale)}
				/>
			)}

			{secondaryFooterMenuEntries && (
				<FooterSecondaryMenu
					text={secondaryFooterMenuEntries.text}
					menuEntry={secondaryFooterMenuEntries.menuEntry}
					languages={secondaryFooterMenuEntries.languages}
					translatedPages={translatedPages}
				/>
			)}
		</footer>
	);
};

Footer.propTypes = {
	footerMenuColumns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			menu: PropTypes.arrayOf(
				PropTypes.shape({
					uri: PropTypes.string,
					target: PropTypes.string,
					linkText: PropTypes.string,
				}).isRequired
			).isRequired,
		}).isRequired
	).isRequired,

	secondaryFooterMenuEntries: PropTypes.shape({
		text: PropTypes.string.isRequired,
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
	}),

	socialMedia: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string,
			uri: PropTypes.string,
		})
	),

	footerActionBar: PropTypes.shape({
		logo: PropTypes.string,
		href: PropTypes.string,
	}),
};

export default Footer;
