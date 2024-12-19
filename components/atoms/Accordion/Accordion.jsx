import PropTypes from 'prop-types';
import styles from './Accordion.module.scss';

const Accordion = ({ accordionItem, index, setActiveIndex, accordID, isActive }) => {
	const minusSymbol = <>&#8722;</>;
	const plusSymbol = <>&#43;</>;

	return (
		<>
			<div className={styles.accordion} id={accordID}>
				<div
					className={`${styles['accordion-header']} ${isActive ? styles.active : ''}`}
					onClick={() => {
						isActive ? setActiveIndex('') : setActiveIndex(index);
					}}
				>
					<h5 className={styles.h5}>{accordionItem.title}</h5>
					<span className={`${styles.h5}`}>{isActive ? minusSymbol : plusSymbol}</span>
				</div>

				<div
					className={`${styles['accordion-body']} ${styles['primary-typography']} ${
						isActive ? styles['active'] : styles['hide']
					}`}
				>
					<div
						className={`${styles['accordion-content']} ${styles['primary-bullet-style']}`}
						dangerouslySetInnerHTML={{ __html: accordionItem.body }}
					></div>
				</div>
			</div>
		</>
	);
};

Accordion.propTypes = {
	accordionItems: PropTypes.object,
};

export default Accordion;
