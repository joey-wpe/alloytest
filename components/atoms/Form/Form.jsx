import React from 'react';
import styles from './Form.module.scss';

const Form = ({ children, className, handleSubmit }) => {
	return (
		<form className={`${styles.form} ${className ?? ''}`} onSubmit={handleSubmit}>
			{children?.map((child, i) => {
				return React.cloneElement(child, {
					key: i,
					className: child.props.datawidth ? styles['w-50'] : styles[child.props.className],
				});
			})}
		</form>
	);
};

export default Form;
