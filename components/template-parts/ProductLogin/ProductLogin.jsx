import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import { useInView } from 'react-intersection-observer';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import styles from './ProductLogin.module.scss';
import Button from '../../atoms/Button/Button';
import Image from 'next/image';

const ProductLogin = ({ prehead, title, description, action, customLinks, siteUrl, trial, productLogo }) => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [value, setValue] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault();
		value && (document.location.href = `https://${value}${siteUrl}`);
	};

	const preHeadSEODefault = 'h2';
	const titleSEODefault = 'h1';
	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInLeft = styles['anim-fade-in-left'];
	const classFadeInRight = styles['anim-fade-in-right'];

	const preheadTag = !prehead?.Tag || prehead?.Tag === 'default' ? preHeadSEODefault : prehead?.Tag;
	const titleTag = !title.Tag || title.Tag === 'default' ? titleSEODefault : title.Tag;

	return (
		<div className={styles['product-login']}>
			<div className={styles.container}>
				<div className={styles['product-login__left']} ref={ref}>
					<Background
						type="pattern"
						color="blaze"
						className={`${styles['product-login__background']} ${styles.background}`}
					/>
					{prehead ? (
						<HeadingTag
							Tag={preheadTag}
							className={`${styles.subhead} ${'anim-delay-1'} ${classFadeInLeft} ${classAnimPlay}`}
							text={prehead.text}
						/>
					) : (
						''
					)}
					{title ? (
						<HeadingTag
							Tag={titleTag}
							className={`${styles.title} ${styles.h1} ${'anim-delay-2'} ${classFadeInLeft} ${classAnimPlay}`}
							text={title.text}
						/>
					) : (
						''
					)}
					{description ? (
						<div
							className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} ${'anim-delay-3'} ${classFadeInLeft} ${classAnimPlay} `}
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					) : (
						''
					)}

					<div className={`${'anim-delay-4'} ${classFadeInLeft} ${classAnimPlay}`}>
						{action && (
							<ButtonGroup alignment={action.alignment} buttons={action.buttons} className={styles['button-group']} />
						)}
					</div>
				</div>
				<div className={styles['product-login__right']}>
					<Background type="pattern" color="light" className={styles['product-login__background']} />
					{/* BOX */}
					<div
						className={`${styles['product-login__box']} ${'anim-delay-1'} ${classFadeInRight} ${classAnimPlay} `}
					>
						{productLogo && productLogo.src && (
							<div
								className={`${styles['product-login__logo-container']} ${'anim-delay-2'} ${classFadeInRight} ${classAnimPlay} `}
							>
								<Image
									src={productLogo.src}
									alt={productLogo?.alt}
									layout="fill"
									className={styles['product-login__logo']}
								/>
							</div>
						)}
						<form className={styles['product-login__form']} onSubmit={onSubmit}>
							<h6 className={`${styles.h6} ${'anim-delay-2'} ${classFadeInRight} ${classAnimPlay} `}>
								Sign In
							</h6>
							<div
								className={`${styles['product-login__field']} ${'anim-delay-2'} ${classFadeInRight} ${classAnimPlay}  `}
							>
								<label className={styles['product-login__field-label']}>Enter your teams qTest Domain</label>
								<input
									className={styles['product-login__field-input']}
									value={value}
									onChange={(e) => setValue(e.target.value)}
									name="mail"
									type="text"
									placeholder="Placeholder"
								/>
								<span>{siteUrl}</span>
							</div>
							<div
								className={`${styles['product-login__submit']} ${'anim-delay-3'} ${classFadeInRight} ${classAnimPlay} `}
							>
								<input type="submit" value="Continue" />
							</div>
						</form>
					</div>
					{/* End BOX */}
					<div
						className={`${styles['product-login__trial']} ${'anim-delay-4'} ${classFadeInRight} ${classAnimPlay} `}
					>
						<p className={styles['product-login__trial-text']}>{trial?.trialText}</p>
						<Button
							buttonStyle={'TertiaryDefault'}
							buttonText={trial?.trialCta?.title}
							target={trial?.trialCta?.target}
							link={trial?.trialCta?.url}
						/>
					</div>
					<ul
						className={`${styles['additional__links']} ${'anim-delay-4'} ${classFadeInRight} ${classAnimPlay}  `}
					>
						{customLinks &&
							customLinks.map((link, index) => {
								const customLink = link?.link;
								return (
									<li key={index} className={styles['additional__link']}>
										<a href={customLink?.url} target={customLink?.target}>
											{customLink?.title}
										</a>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductLogin;
