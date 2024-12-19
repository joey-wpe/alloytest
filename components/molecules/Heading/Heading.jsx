import styles from './Heading.module.scss';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';

const Heading = ({ prehead, preheadType, title, titleType, description, className, subHead }) => {
	const { ref, inView } = useInView();
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInUp = styles['anim-fade-in-up'];

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<div className={`${styles['content-copy']} ${className ?? ''} ${classAnimPlay} ${classFadeInUp} `} ref={ref}>
			<HeadingTag Tag={preheadTag} className={` ${styles['subhead']} ${styles[subHead] ?? ''}`} text={prehead} />
			<HeadingTag Tag={titleTag} className={`${styles.h2}`} text={title} />
			<div className={`${styles.p}`} dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};

Heading.propTypes = {
	prehead: PropTypes.string,
	preheadType: PropTypes.string,
	title: PropTypes.string,
	titleType: PropTypes.string,
	description: PropTypes.string,
};

export default Heading;
