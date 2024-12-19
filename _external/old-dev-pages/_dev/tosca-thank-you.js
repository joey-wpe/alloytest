import ErrorPage from 'next/error';
import StringConstants from '../../StringConstants';
import GlobalConstants from '../../GlobalConstants';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import BaseTemplateWrapper from '../../components/page-templates/BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../components/template-parts/MastheadMinimal/MastheadMinimal';
import styles from '../../styles/pages/FormTest.module.scss';

import { GlobalAlert_SampleData_Homepage } from '../../components/template-parts/GlobalAlert/GlobalAlert.sampledata';
import { HeaderExampleData } from '../../components/template-parts/Header/Header.sampledata';
import { FooterExampleData } from '../../components/template-parts/Footer/Footer.sampledata';

export default function ThankYouPage() {
	// this page should only render when in dev mode, otherwise it should return a 404
	if (GlobalConstants.Options.BuildDevPages !== true) {
		return <ErrorPage statusCode={404} />;
	}

	const globalAlertData = GlobalAlert_SampleData_Homepage;

	const mastheadSettings = {
		prehead: StringConstants.PageHeadings.Tricentis,
		title: 'Thank you tosca test page',
		background: {
			type: 'pattern',
			color: 'dark',
		},
	};

	// NOTE:: we pass in an empty seoData array to avoid build warnings for this test page
	const seoData = [];
	return (
		<BasePageWrapper title={'Thank you tosca test page'} seoData={seoData}>
			<BaseTemplateWrapper
				globalAlertData={globalAlertData}
				headerMenuData={HeaderExampleData}
				footerMenu={FooterExampleData}
			>
				<MastheadMinimal {...mastheadSettings} />
				<div className={`${styles['form-test']}`}>
					<p style={{ marginLeft: `250px` }}>Thank you for submitting the Tosca Form</p>
				</div>
			</BaseTemplateWrapper>
		</BasePageWrapper>
	);
}
