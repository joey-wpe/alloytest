import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import { CloseSVG } from '../../atoms/svg/Close';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import styles from './Disruptor.module.scss';
import { useState } from 'react';

const StickyDisruptor = ({ title, titleType, description, buttons, background }) => {
	const [open, setOpen] = useState(true);
	const titleSEODefault = 'h5';
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	let textColor = '';
	if (background.type === 'image') {
		textColor = background.colorScheme;
	}
	const handleClose = () => {
		setOpen(false);
	};

	return (
		open 
			? <div className={styles['disruptor-sticky']}>
				<Background {...background} className={`${styles[background.color] ?? ''}`}>
					<div className={``}>
						<div className={styles['disruptor-wrapper']}>
							<CloseSVG fill="white" className={styles['disruptor-sticky__close']} onClick={handleClose}/>
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
			: null
	);
};

StickyDisruptor.propTypes = {
	title: PropTypes.string.isRequired,
	titleType: PropTypes.string,
	description: PropTypes.string,
	buttons: PropTypes.object,
	background: PropTypes.object,
};

export default StickyDisruptor;
