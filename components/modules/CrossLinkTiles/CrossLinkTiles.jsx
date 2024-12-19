import styles from './CrossLinkTiles.module.scss';
import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import CardLink from '../../molecules/CardLink/CardLink';
import { useInView } from 'react-intersection-observer';

const CrossLinkTiles = ({ tiles, background }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];

	return (
		<Background {...background}>
			<div className={`${styles['container']}`}>
				<div
					className={`${styles['content-card-module']} ${tiles.length === 2 ? styles['basic'] : ''}`}
					ref={refAnimation}
				>
					{tiles.map((item, index) => {
						const classAnimDelay = `anim-delay-${+index + 1}`;
						return (
							<CardLink
								key={index}
								{...item}
								className={`${styles['anim-fade-in-up']} ${styles['card']} ${classAnimDelay} ${classAnimPlay}`}
							/>
						);
					})}
				</div>
			</div>
		</Background>
	);
};
CrossLinkTiles.propTypes = {
	tiles: PropTypes.array.isRequired,
	background: PropTypes.object,
};

export default CrossLinkTiles;
