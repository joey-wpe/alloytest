import styles from './AvatarGrid.module.scss';
import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import AvatarCard from '../../molecules/AvatarCard/AvatarCard';
import Heading from '../../molecules/Heading/Heading';
import { useInView } from 'react-intersection-observer';

const AvatarGrid = ({ copy, avatars, background, scrollRefChild }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];

	return (
		<Background {...background} scrollRefGrandChild={scrollRefChild ?? null}>
			<div className={`${styles.container} ${styles['m-avatar']}`}>
				<Heading {...copy} className={styles['content-text']} />

				<div className={`${styles['grid-avatar-container']}`} ref={refAnimation}>
					{avatars?.map((item, index) => {
						const classAnimDelay = `anim-delay-${+index + 1}`;
						return (
							<AvatarCard
								className={`${styles['anim-fade-in-up']} ${styles['card']} ${classAnimDelay} ${classAnimPlay}`}
								key={index}
								{...item}
							/>
						);
					})}
				</div>
			</div>
		</Background>
	);
};

AvatarGrid.propTypes = {
	avatars: PropTypes.array.isRequired,
	copy: PropTypes.object,
};
export default AvatarGrid;
