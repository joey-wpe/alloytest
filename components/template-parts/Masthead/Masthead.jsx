import Image from 'next/image';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import styles from './Masthead.module.scss';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import { useRouter } from 'next/router';
import { TrophySvg } from '../../atoms/svg/Trophy';

const Form = dynamic(() => import('../../modules/Form/Form'), {
	loading: () => <div />,
});
const ButtonGroup = dynamic(() => import('../../molecules/ButtonGroup/ButtonGroup'), {
	loading: () => <div />,
});
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
	loading: () => <div />,
});

const Masthead = ({
	prehead,
	preheadLogo,
	title,
	description,
	action,
	mediaContent,
	background,
	children,
	postTypeTerms,
}) => {
	const { image, video, form } = mediaContent || {};
	const { ref, inView } = useInView({
		threshold: 0,
	});

	const preHeadSEODefault = 'h2';
	const titleSEODefault = 'h1';
	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInLeft = styles['anim-fade-in-left'];
	const classFadeInRight = styles['anim-fade-in-right'];
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !prehead?.Tag || prehead?.Tag === 'default' ? preHeadSEODefault : prehead?.Tag;
	const titleTag = !title.Tag || title.Tag === 'default' ? titleSEODefault : title.Tag;

	// Adding Partner Certificates for partner single page
	const postType = useRouter().asPath.split('/')[1];
	const partnerCertificates = (postTypeTerms || []).reduce((cert, term) => {
		if (term.taxonomy === 'partner_cert') {
			cert.push(term.name);
		}

		return cert;
	}, []);

	return (
		<Background {...background}>
			<div className={`${styles.masthead} ${styles[background.color] ?? ''}`}>
				<div className={`${styles['container']} ${styles.content}`}>
					<div className={styles['text-container']} ref={ref}>
						{prehead?.text ? (
							<HeadingTag
								Tag={preheadTag}
								className={`${styles.subhead} ${'anim-delay-1'} ${classFadeInLeft} ${classAnimPlay}`}
								text={prehead.text}
							/>
						) : preheadLogo?.src ? (
							<div className={`${styles['content-logo']} ${'anim-delay-1'} ${classFadeInLeft} ${classAnimPlay}`}>
								<Image
									className={styles.logo}
									layout="responsive"
									width={146}
									height={20}
									src={preheadLogo.src}
									alt={preheadLogo.alt}
									objectFit="contain"
									objectPosition="left"
									priority={true}
								/>
							</div>
						) : (
							''
						)}
						{title ? (
							<HeadingTag
								Tag={titleTag}
								className={`${styles.h1} ${'anim-delay-2'} ${classFadeInLeft} ${classAnimPlay}`}
								text={title.text}
							/>
						) : (
							''
						)}

						{description ? (
							<div
								className={`${styles['body-p']} ${
									styles.description
								} ${'anim-delay-3'} ${classFadeInLeft} ${classAnimPlay}`}
								dangerouslySetInnerHTML={{ __html: description?.text ?? '' }}
							/>
						) : (
							''
						)}
						{action && action.buttons.length > 0 && (
							<div className={`${styles['button-container']} ${'anim-delay-3'} ${classFadeInLeft} ${classAnimPlay}`}>
								<ButtonGroup alignment={action.alignment} buttons={action.buttons} />
							</div>
						)}

						{/* Adding Partner Certificates for partner single page */}
						{postType === 'partners' && partnerCertificates.length > 0 && (
							<div
								className={`${styles['partner-certificates']} ${'anim-delay-4'} ${classFadeInLeft} ${classAnimPlay}`}
							>
								<TrophySvg width="30" height="30" />
								<div className={styles['partner-certificates--content']}>
									<div>Certified Solution Partner</div>
									<div>{partnerCertificates.join(' . ')}</div>
								</div>
							</div>
						)}
					</div>

					{mediaContent && (
						<div className={`${styles['media-content']} ${classFadeInRight} ${classAnimPlay}`}>
							{image && (
								<Image
									src={image.src}
									alt={image.alt}
									width={626}
									height={427}
									layout="responsive"
									objectFit="contain"
									priority={true}
								/>
							)}

							{video && (
								<ReactPlayer
									className={styles.video}
									url={video.url}
									light={video.thumbnail ?? false}
									playing={false}
									thumbnail={video.thumbnail}
									controls={true}
								/>
							)}

							{form && <Form formOptions={form} />}
						</div>
					)}
					{children}
				</div>
			</div>
		</Background>
	);
};

Masthead.propTypes = {
	prehead: PropTypes.shape({
		Tag: PropTypes.string,
		text: PropTypes.string,
	}),
	title: PropTypes.shape({
		Tag: PropTypes.string,
		text: PropTypes.string,
	}).isRequired,
	description: PropTypes.shape({
		Tag: PropTypes.string,
		text: PropTypes.string,
	}).isRequired,
	action: PropTypes.object,
	mediaContent: PropTypes.shape({
		image: PropTypes.shape({
			src: PropTypes.string,
			alt: PropTypes.string,
		}),
		video: PropTypes.shape({
			url: PropTypes.string,
			thumbnail: PropTypes.string,
		}),
	}),
	background: PropTypes.object,
	postTypeTerms: PropTypes.array,
};

export default Masthead;
