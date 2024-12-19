import PropTypes from 'prop-types';
import FlagCta from '../../atoms/FlagCta/FlagCta';
import styles from './FooterCTA.module.scss';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';

const FooterCTA = ({ background, title, description, flagCtaUrl, flagCtaTitle, buttons }) => {
	return (
		<div className={`${styles['footer-cta-wrapper']}`}>
			<div className={styles.container}>
				<Background {...background}>
					<div className={`${styles['cta-wrapper']}`}>
						<div className={`${styles['cta-content']} ${styles['anim-fade-in-left']} ${styles['anim-play']}`}>
							<h3 className={styles.h3}>{title}</h3>
							<div className={styles['body-p']} dangerouslySetInnerHTML={{ __html: description }} />
						</div>
						{/* we're given either a collection of buttons (more than 1) .. */}
						{buttons && (
							<div className={`${styles['button-group']} ${styles['anim-fade-in-right']} ${styles['anim-play']}`}>
								<ButtonGroup alignment={buttons.alignment} buttons={buttons} />
							</div>
						)}
						{/* .. or we're given a single flag cta url to show in an orange flag */}
						{flagCtaUrl && !buttons && (
							<>
								<FlagCta flagStyle="secondary" className={styles.flag} title={flagCtaTitle} href={flagCtaUrl} />
							</>
						)}
					</div>
				</Background>
			</div>
		</div>
	);
};

FooterCTA.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	flagCtaUrl: PropTypes.string,
	flagCtaTitle: PropTypes.string,
	background: PropTypes.object,
	buttons: PropTypes.object,
};

export default FooterCTA;
