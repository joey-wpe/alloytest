import React from 'react';
import dynamic from 'next/dynamic';
import styles from './LeftRight.module.scss';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import Background from '../../atoms/Background/Background';
import ReactPlayer from 'react-player/lazy';
import Image from 'next/image';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';
import Breadcrumb from '../../molecules/Breadcrumb/Breadcrumb';

const Form = dynamic(() => import('../Form/Form'), {
	loading: () => <div />,
});

const LeftRight = ({
	prehead,
	title,
	description,
	buttons,
	background,
	mediaContent,
	orientation,
	useResourceDetailWysiwygStyles,
	showThankyou,
	thankYouMessage,
	breadcrumb,
}) => {
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';
	const { image, video, form } = mediaContent || {};
	const line = '/img/blue-angle-bottom-left.svg';
	const right = orientation === 'right';
	const { t } = useTranslation('common');
	const preheadTag = !prehead.Tag || prehead.Tag === 'default' ? preHeadSEODefault : prehead.Tag;
	const titleTag = !title.Tag || title.Tag === 'default' ? titleSEODefault : title.Tag;

	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];
	// chevron angle variables
	const contentImg = (mediaContent?.chevronAngle === false || mediaContent?.chevronAngle === null) ? 'content-image-without-angle' : 'content-image';
	const contentForm = mediaContent?.chevronAngle ? `content-form-${orientation}` : `content-form-${orientation}-without-angle`;
	const contentVideo = mediaContent?.chevronAngle ? ' ' : `content-video-without-angle`;

	return (
		<Background {...background} className={`${styles['left-right']}`}>
			{breadcrumb && (
				<div
					className={`${styles['container']} ${styles['breadcrumb-padding-top']} ${styles['breadcrumb-padding-bottom']}`}
				>
					<Breadcrumb background={background.color} breadcrumb={breadcrumb} title={title.text} />
				</div>
			)}
			<div className={`${styles.container} light-theme`} ref={refAnimation}>
				<div
					className={`${
						image
							? styles[right ? `image-module-right` : 'image-module']
							: styles[right ? `content-information-right` : 'content-information']
					} ${useResourceDetailWysiwygStyles ? styles['primary-bullet-style'] : ''}`}
				>
					<div className={`${styles['text-content']} ${styles[`anim-fade-in-${orientation}`]} ${classAnimPlay}`}>
						{prehead ? <HeadingTag className={`${styles.subhead}`} Tag={preheadTag} text={prehead.text} /> : ''}
						{title ? <HeadingTag className={`${styles.h2}`} Tag={titleTag} text={title.text} /> : ''}
						{description
							? description.map((text, index) => {
								return (
									<div
										key={index}
										className={`${styles['p']} ${styles.wysiwyg} ${styles['primary-bullet-style']}`}
										dangerouslySetInnerHTML={{ __html: text.text }}
									/>
								);
							})
							: ''}

						{buttons ? <ButtonGroup className={styles['content-button']} {...buttons} /> : ''}
					</div>

					{mediaContent && (
						<div
							className={`${styles['media-container']} ${
								styles[`anim-fade-in-${orientation === 'left' ? 'right' : 'left'}`]
							} ${classAnimPlay} ${form && !showThankyou && styles['media-container-form']}`}
						>
							{image && image.src && (
								<div className={`${styles[`${contentImg}`]}`}>
									<Image className={styles.image} src={image.src} alt={image.alt} layout='fill' objectFit='contain' />
								</div>
							)}
							{video && (
								<div className={`${styles[`content-video-${orientation}`]} ${styles[`${contentVideo}`]}`}>
									<ReactPlayer
										className={styles.video}
										url={video.url}
										light={video.thumbnail ?? false}
										playing={false}
										thumbnail={video.thumbnail}
										controls={true}
									/>

									<div className={`${styles[`content-video-${orientation}__mask-line`]} ${styles['__mask-line']}`}>
										<Image src={line} alt={'decorative angle'} width={180} height={180} layout='intrinsic' />
									</div>
								</div>
							)}
							{form && !showThankyou && (
								<div className={`${styles[`${contentForm}`]}`}>
									<div className={styles['content-form__form']}>
										<Form className={styles['form']} formOptions={form} />
									</div>
								</div>
							)}
							{showThankyou && (
								<div className={styles['thank-you-wrapper']}>
									<h4 className={styles['h4']}>{t('generic.thankYou')}</h4>
									<p className={styles['body-p']}>{thankYouMessage ?? t('generic.thankYouMessage')}</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</Background>
	);
};

export default LeftRight;
