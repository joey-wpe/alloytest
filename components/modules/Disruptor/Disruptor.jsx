import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import styles from './Disruptor.module.scss';

const Disruptor = ({ title, titleType, description, buttons, background }) => {
	const titleSEODefault = 'h3';
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	let textColor = '';
	if (background.type === 'image') {
		textColor = background.colorScheme;
	}
	return (
		<div className={styles.disruptor}>
			<div className={styles.container}>
				<Background {...background} className={`${styles[background.color] ?? ''}`}>
					<div className={`${styles['container']} ${styles['anim-fade-in-up']} ${styles['anim-play']}`}>
						<div className={styles['disruptor-wrapper']}>
							<div className={styles['disruptor-content']}>
								<HeadingTag Tag={titleTag} className={`${styles['h5']} ${styles[textColor] ?? ''}`} text={title} />
								{description && (
									<div
										className={`${styles['p']} ${styles[textColor] ?? ''}`}
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								)}
							</div>
							{buttons && (
								<div className={styles['button-group']}>
									<ButtonGroup alignment={buttons.alignment} buttons={buttons.buttons} />
								</div>
							)}
						</div>
					</div>
				</Background>
			</div>
		</div>
	);
};

Disruptor.propTypes = {
	title: PropTypes.string.isRequired,
	titleType: PropTypes.string,
	description: PropTypes.string,
	buttons: PropTypes.object,
	background: PropTypes.object,
};

export default Disruptor;
