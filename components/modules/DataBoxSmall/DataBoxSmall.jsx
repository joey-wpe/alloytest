import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Button from '../../atoms/Button/Button';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import styles from './DataBoxSmall.module.scss';
import CountBox from '../../atoms/CountBox/CountBox';

const DataBoxSmall = ({ prehead, preheadType, title, titleType, description, buttons, boxes, background }) => {
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const boxesQuantity = boxes.length;
	const classGrid = styles[`box-grid-${boxesQuantity}`] ?? '';
	const classCountBox = styles[`count-box-${boxesQuantity}`];

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background} className={styles[background.color]}>
			<div className={`${styles['container']} ${styles.content}`}>
				<div className={styles['text-container']}>
					<HeadingTag
						Tag={preheadTag}
						className={`${background.color !== 'rainbow' ? styles['subhead-light'] : styles.subhead}`}
						text={prehead}
					/>
					<HeadingTag Tag={titleTag} className={`${styles.h2} ${styles.title}`} text={title} />
					<div className={`${styles.p} ${styles.description}`} dangerouslySetInnerHTML={{ __html: description }} />

					{buttons && <ButtonGroup className={styles['content-btn']} alignment={'left'} buttons={buttons?.buttons} />}
				</div>

				<div className={`${styles['box-container']} ${classGrid}`}>
					{boxes.map((data, index) => {
						const classAnimDelay = `anim-delay-${+index + 1}`;

						return <CountBox key={index} className={`${classCountBox} ${classAnimDelay}`} {...data} />;
					})}
				</div>
			</div>
		</Background>
	);
};

DataBoxSmall.propTypes = {
	prehead: PropTypes.string,
	preheadType: PropTypes.string,
	title: PropTypes.string.isRequired,
	titleType: PropTypes.string,
	description: PropTypes.string,
	buttons: PropTypes.object,
	boxes: PropTypes.array,
	background: PropTypes.object,
};

export default DataBoxSmall;
