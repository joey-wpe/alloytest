import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import styles from './GlobalAlert.module.scss';

const GlobalAlert = ({ description, buttons, background }) => {
	const { color } = background;

	return (
		<Background {...background} className={`${styles['alert-wrapper']}`}>
			<div className={styles['container']} id="js-global-alert">
				<div className={styles['global-alert-wrapper']}>
					<p className={styles.p}>{description}</p>
					{buttons && <ButtonGroup alignment={buttons.alignment} buttons={buttons.buttons} />}
				</div>
			</div>
		</Background>
	);
};

GlobalAlert.propTypes = {
	description: PropTypes.string,
	buttons: PropTypes.object,
	background: PropTypes.object,
};

export default GlobalAlert;
