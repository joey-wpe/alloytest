import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import styles from './MastheadMinimal.module.scss';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import Breadcrumb from '../../molecules/Breadcrumb/Breadcrumb';

const MastheadMinimal = ({
	prehead,
	preheadType,
	title,
	titleType,
	description,
	background,
	children,
	className,
	breadcrumb,
}) => {
	const { ref, inView } = useInView({
		threshold: 0,
	});

	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h2';
	const titleSEODefault = 'h1';

	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInUp = styles['anim-fade-in-up'];

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background}>
			{/* populates breadcrumbs */}
			{breadcrumb && (
				<div className={`${styles['container']} ${styles[`breadcrumb-padding-top`]}`}>
					<Breadcrumb background={background.color} breadcrumb={breadcrumb} title={title} />
				</div>
			)}

			<div
				className={`${styles.masthead} ${styles['tertiary']} ${styles[background.color] ?? ''} ${
					children ? `${styles['children-component']} ${styles['container']}` : ''
				} ${className ?? ''} ${breadcrumb !== undefined ? styles['tertiary-small'] : ''}`}
			>
				<div className={`${!children ? styles['container'] : styles.content}`}>
					<div className={styles['text-container']} ref={ref}>
						{prehead && (
							<HeadingTag
								Tag={preheadTag}
								className={` ${styles.subhead} ${'anim-delay-1'} ${classFadeInUp} ${classAnimPlay}`}
								text={prehead}
							/>
						)}

						<HeadingTag
							Tag={titleTag}
							className={`${styles.h1} ${'anim-delay-2'} ${classFadeInUp} ${classAnimPlay}`}
							text={title}
						/>

						{description && (
							<div
								className={`${styles['body-p']} ${styles.description} ${'anim-delay-3'} ${classFadeInUp} ${classAnimPlay}`}
								dangerouslySetInnerHTML={{ __html: description ?? '' }}
							/>
						)}
					</div>
				</div>
				{children}
			</div>
		</Background>
	);
};

MastheadMinimal.propTypes = {
	prehead: PropTypes.string,
	preheadType: PropTypes.string,
	title: PropTypes.string.isRequired,
	titleType: PropTypes.string,
	description: PropTypes.string,
	background: PropTypes.object,
	breadcrumb: PropTypes.object,
};

export default MastheadMinimal;
