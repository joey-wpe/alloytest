import ErrorPage from 'next/error';
import StringConstants from '../../StringConstants';
import GlobalConstants from '../../GlobalConstants';
import { getGlobalSettings } from '../../wplib/globalSettings';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import BaseTemplateWrapper from '../../components/page-templates/BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../components/template-parts/MastheadMinimal/MastheadMinimal';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import Form from '../../components/modules/Form/Form';
import styles from '../../styles/pages/FormTest.module.scss';

// import { GlobalAlert_SampleData_Homepage } from '../../components/template-parts/GlobalAlert/GlobalAlert.sampledata';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';

export default function Contact({ globalAlertData, footerMenu, menu, _nextI18Next }) {
	// this page should only render when in dev mode, otherwise it should return a 404
	if (GlobalConstants.Options.BuildDevPages !== true) {
		return <ErrorPage statusCode={404} />;
	}

	const mastheadSettings = {
		prehead: StringConstants.PageHeadings.Tricentis,
		title: 'Contact form test page',
		background: {
			type: 'pattern',
			color: 'dark',
		},
	};

	// NOTE:: we pass in an empty seoData array to avoid build warnings for this test page
	const seoData = [];
	return (
		<BasePageWrapper title={'Contact form test page'} seoData={seoData}>
			<BaseTemplateWrapper globalAlertData={globalAlertData} headerMenuData={menu} footerMenu={footerMenu}>
				<MastheadMinimal {...mastheadSettings} />
				<div className={`${styles['form-test']}`}>
					<Form {...Form_SampleData_LightPattern} />
				</div>
			</BaseTemplateWrapper>
		</BasePageWrapper>
	);
}

export const getStaticProps = async ({ locale = 'en-US' }) => {
	const isPreview = false;
	const forceUseCache = true;
	const { globalSettings, footerMenu, secondaryFooterMenu, mainMenu, topMenu } = await getGlobalSettings(
		isPreview,
		forceUseCache
	);

	// we want to manipulate our response data here, so internal components are not dependent on knowledge of the underlying data
	const mediatedFooterMenu = transformToFooterStructure(footerMenu, secondaryFooterMenu, globalSettings);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, null);

	const translatedPages = [
		{
			locale: {
				locale: 'fr_FR',
			},
			uri: '/fr/_dev/contact',
		},
		{
			locale: {
				locale: 'de_DE',
			},
			uri: '/de/_dev/contact',
		},
	];

	const menu = mainMenuToMenu(mainMenu, globalSettings, topMenu, translatedPages);

	return {
		props: {
			globalAlertData,
			footerMenu: mediatedFooterMenu,
			menu,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};

const formSampleData = {
	formID: '797',
	nextFormID: null, // follow up form
	ContentOffer: 'Test Persona', // Persona
	COStage: 'Prospect', // Stage
	leadSource: 'TRI-Accelerator-contact-Trial', // Form Name
	contentOffer: '', // CO Code. This code I pulled from the live site for testing
	COTitle: 'contact Form Test Title', // Reporting Title
	Initiative: 'SAP testing', // Initiative
	Product: 'Tricentis contact', // Product
	AssetType: 'Analyst Research', // Content Type
	shouldFormPrefill: true,
	redirectURL: '/_dev/contact-thank-you', // redirect URL
	allowFreemiumEmails: false,
	//Perform an action after form submission. Only happens if redirectURL isn't set.
	redirectCallback: () => {
		console.log('Form submitted, redirected after cb');
	},
	// used to update the buttons text
	ctaLabel: 'Contact me',
	// these 3 labels are used to change the default text of the checkboxes. They can be provided with html as a string
	freeAgreeLabel: '<div>I agree to the free trial terms and conditions</div>',
	trialAgreeLabel:
		'<div>I agree to the <a href="https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/privacy-policy" target="_blank">Privacy Policy</a> and <a href="https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/terms-of-use" target="_blank">Terms of Use</a></div>',
	partnerAgreeLabel: '<div>I agree to the partner terms</div>',

	// additional prefill field options
	prefillFields: {
		ALM_Tool__c: 'ALM_Tool__c',
		Academy_Updates__c: 'Academy_Updates__c',
		Active_Project__c: 'Active_Project__c',
		Best_Method_of_Contact__c: 'Best_Method_of_Contact__c',
		Best_Time_to_Contact__c: 'Best_Time_to_Contact__c',
		Company: 'company',
		Conversation_Track__c: 'Conversation_Track__c',
		Country: 'country',
		Customer_Communications__c: 'Customer_Communications__c',
		Email: 'email',
		FirstName: 'firstName',
		Insider_Newsletter__c: 'Insider_Newsletter__c',
		LastName: 'lastName',
		Lead_Qualification_Stage__c: 'Lead_Qualification_Stage__c',
		Live_Events__c: 'Live_Events__c',
		Partner_Updates__c: 'Partner_Updates__c',
		Phone: 'phone',
		PostalCode: 'postalCode',
		Product_Updates__c: 'Product_Updates__c',
		Reason_for_contacting__c: 'Reason_for_contacting__c',
		Research_Thought_Leadership__c: 'Research_Thought_Leadership__c',
		Role__c: 'Role__c',
		Salutation: 'salutation',
		Software_Challenges__c: 'Software_Challenges__c',
		TCM_Tool__c: 'TCM_Tool__c',
		Timeframe__c: 'Timeframe__c',
		Unsubscribed: 'unsubscribed',
		formCountTRI: 'formCountTRI',
		optionalPhoneNumber: 'optionalPhoneNumber',
		primaryAreaofInterestCompanion: 'primaryAreaofInterestCompanion',
	},
	channel: 'None', // I was not able to find a filled example of the channel field on the live site.
	goal: { name: 'Contact', type: 'Accelerator', use_form_count: false },
	areaOfInterest: 'Area of interest Test',
};

const Form_SampleData_LightPattern = {
	preHeader: 'Preheader',
	preHeadType: 'default',
	heading: 'Form Module Headline',
	headingType: 'h2',
	background: {
		type: 'pattern',
		color: 'light',
	},
	formOptions: formSampleData,
};
