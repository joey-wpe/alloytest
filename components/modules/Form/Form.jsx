import PropTypes from 'prop-types';
import styles from './Form.module.scss';
import Head from 'next/head';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import MarketoForm from '../../molecules/MarketoForm/MarketoForm';
import GlobalConstants from '../../../GlobalConstants';
import { useRouter } from 'next/router';
// import { SimpleFormSampleData } from '../../molecules/MarketoForm/MarketoForm.sampledata';

import { useTranslation } from 'next-i18next';

const Form = ({ background, preHeader, preHeadType, heading, headingType, formOptions, className, translator }) => {
	const preHeadSEODefault = 'h4';
	const headingSEODefault = 'h3';
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preHeadType || preHeadType === 'default' ? preHeadSEODefault : preHeadType;
	const headingTag = !headingType || headingType === 'default' ? headingSEODefault : headingType;

	const { t } = useTranslation('common');
	const router = useRouter();
	const urlLocation = router?.asPath?.endsWith(GlobalConstants.FrontendRoutes.FormPreferenceCenter);
	const urlContactUs = router?.asPath?.endsWith(GlobalConstants.FrontendRoutes.FormContactUs);
	const urlDe = router?.locale?.endsWith('de');

	return (
		<Background {...background}>
			<div
				className={`
					${styles['form-module']} ${className ?? ''} 
					${urlLocation && styles['form-module-preference-center']}
					${urlContactUs && styles['form-module-contact-us']} form-module
					`}
			>
				{(preHeader || heading) && (
					<div className={`${styles['text-wrapper']} ${styles['anim-fade-in-up']} ${styles['anim-play']}`}>
						<HeadingTag Tag={preheadTag} className={`${styles.span} ${styles.subhead}`} text={preHeader} />
						<HeadingTag Tag={headingTag} className={`${styles.h2}`} text={heading} />
					</div>
				)}

				<div
					className={`${styles['form-wrapper']}  ${styles['anim-fade-in-up']} ${'anim-delay-3'} ${
						styles['anim-play']
					} form-remove-shadow`}
				>
					<div className={`${styles['form-content']}`}>
						<Head>
							{/* this is for google recaptcha integration */}
							<script
								src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
								async
								defer
							></script>
						</Head>
						<MarketoForm
							formOptions={formOptions}
							translator={t}
							className={`${urlLocation && styles['form-preference']} ${urlContactUs && styles['form-contact']} ${
								urlLocation && urlDe && styles['form-de-preference']
							}`}
						/>
					</div>
				</div>
			</div>
		</Background>
	);
};

Form.propTypes = {
	preHeader: PropTypes.string,
	preHeadType: PropTypes.string,
	heading: PropTypes.string,
	headingType: PropTypes.string,
	background: PropTypes.object,
	FormData: PropTypes.object,
};

export default Form;
