import PropTypes from 'prop-types';
import { useState } from 'react';
import TextLink from '../../atoms/TextLink/TextLink';
import styles from './FooterMenuColumn.module.scss';

const FooterMenuColumn = ({ title, menu }) => {
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	// Add active class
	const handleClick = () => {
		setMenuIsOpen(!menuIsOpen);
	};

	return (
		<div className={`${styles['footer-menu-column']} ${menuIsOpen ? styles['active'] : ''}`}>
			<div className={styles.heading} onClick={handleClick}>
				<p className={styles.title}>{title}</p>

				<svg
					className={styles.arrow}
					width="16"
					height="8"
					viewBox="0 0 16 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8 8L16 0L11.474 4.22866e-07L7.99977 3.47427L4.52551 8.16842e-07L9.5399e-08 1.23971e-06L8 8Z"
					/>
				</svg>
			</div>

			<ul className={`${styles.column}`}>
				{menu &&
					menu.map((data, index) => {
						return <TextLink key={index} {...data} />;
					})}
			</ul>
		</div>
	);
};

FooterMenuColumn.propTypes = {
	title: PropTypes.string.isRequired,
	menu: PropTypes.arrayOf(
		PropTypes.shape({
			uri: PropTypes.string,
			target: PropTypes.string,
			linkText: PropTypes.string,
		})
	).isRequired,
};

export default FooterMenuColumn;
