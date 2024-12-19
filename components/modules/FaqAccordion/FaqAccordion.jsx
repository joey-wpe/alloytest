import PropTypes from 'prop-types';
import styles from './FaqAccordion.module.scss';
import Background from '../../atoms/Background/Background';
import AccordionGroup from '../../molecules/AccordionGroup/AccordionGroup';
import Heading from '../../molecules/Heading/Heading';

const FaqAccordion = ({ commonHeaderDetails, accordionItems, background }) => {
	return (
		<Background {...background}>
			<div className={`${styles['accordion-wrapper']}`}>
				<div className={`${styles['text-wrapper']} ${styles['accordion-text']}`}>
					<Heading {...commonHeaderDetails} subHead={background.color === 'warp' && 'subhead-mist'} />
				</div>
				<AccordionGroup accordionItems={accordionItems} />
			</div>
		</Background>
	);
};

FaqAccordion.propTypes = {
	accordionItems: PropTypes.array,
	background: PropTypes.object,
	commonHeaderDetails: PropTypes.object,
};

export default FaqAccordion;
