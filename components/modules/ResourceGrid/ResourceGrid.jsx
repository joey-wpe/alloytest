import styles from './ResourceGrid.module.scss';
import PropTypes from 'prop-types';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import EventCard from '../../molecules/EventCard/EventCard';
import { useInView } from 'react-intersection-observer';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import { shorten } from '../../../wplib/util';

const ResourceGrid = ({
	title,
	titleType,
	prehead,
	preheadType,
	description,
	actionGroup,
	selectAType,
	selectionMethod,
	items,
	allignment,
	background,
}) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	if (selectionMethod && selectionMethod === 'none') return null;
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';
	const classAnimPlay = inView && styles['anim-play'];

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background} className={styles[background.color]}>
			<div className={`${styles['resource-grid']}`}>
				<div className={styles['container']}>
					<div className={`${styles.heading} ${styles['content-' + allignment]}`}>
						<HeadingTag Tag={preheadTag} className={styles['subhead']} text={prehead} />
						<div className={styles['heading-content']}>
							<div className={styles.copyContent}>
								<HeadingTag Tag={titleTag} className={styles['h2']} text={title} />
								{description && <div className={`${styles.p}`} dangerouslySetInnerHTML={{ __html: description }} />}
							</div>
							{actionGroup && (
								<ButtonGroup
									alignment={actionGroup.alignment}
									buttons={actionGroup.buttons}
									className={styles['button-container']}
								/>
							)}
						</div>
					</div>

					<div className={styles[`grid-${selectAType}`]} ref={refAnimation}>
						{items.map((item, index) => {
							const classAnimDelay = `anim-delay-${+index + 1}`;
							let title = item.title;
							let description = shorten(item.description, 70);
							if (selectAType === 'featured' && index > 0) {
								title = shorten(title, 200);
							}
							return (
								<EventCard
									key={index}
									{...item}
									featuredImage={(selectAType !== 'featured' || index === 0) ? item.featuredImage : null }
									description={description}
									title={title}
									type={selectAType}
									className={`${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Background>
	);
};

ResourceGrid.propTypes = {
	prehead: PropTypes.string,
	preheadType: PropTypes.string,
	title: PropTypes.string,
	titleType: PropTypes.string,
	description: PropTypes.string,
	actionGroup: PropTypes.object,
	items: PropTypes.array,
	background: PropTypes.object,
	selectAType: PropTypes.oneOf(['featured', 'basic']),
};

export default ResourceGrid;
