import styles from './IconCard.module.scss';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/svg/Icon';

const IconCard = ({ icon, title, description, link, buttonStyle, buttonText, className, style, fill }) => {
	return (
		<div className={`${styles['card-icon-content']} ${className ?? ''}`} style={style}>
			{icon.path && (
				<div className={styles['icon-content']}>
					<Icon width="52" height="52" viewBox="0 0 1024 1024" fill={fill}>
						{icon.path}
					</Icon>
				</div>
			)}
			<div className={styles['content-information']}>
				{title && <h4 className={`${styles.h4}`}>{title}</h4>}
				{description && <div className={`${styles.p}`} dangerouslySetInnerHTML={{ __html: description }} />}
			</div>
			{link && (
				<div className={styles['button-content']}>
					<Button link={link} buttonStyle={buttonStyle} buttonText={buttonText} />
				</div>
			)}
		</div>
	);
};

IconCard.propTypes = {
	icon: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	link: PropTypes.string,

	className: PropTypes.string, //add a specific className to the component
	style: PropTypes.object, //pass in specific CSS styles (like 'delay' in Icon Grid)
};

export default IconCard;
