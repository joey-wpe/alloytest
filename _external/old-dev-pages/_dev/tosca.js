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

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';

export default function Tosca({ globalAlertData, footerMenu, menu }) {
	// this page should only render when in dev mode, otherwise it should return a 404
	if (GlobalConstants.Options.BuildDevPages !== true) {
		return <ErrorPage statusCode={404} />;
	}

	const mastheadSettings = {
		prehead: StringConstants.PageHeadings.Tricentis,
		title: 'Tosca form test page',
		background: {
			type: 'pattern',
			color: 'dark',
		},
	};

	// NOTE:: we pass in an empty seoData array to avoid build warnings for this test page
	const seoData = [];
	return (
		<BasePageWrapper title={'Tosca form test page'} seoData={seoData}>
			<BaseTemplateWrapper globalAlertData={globalAlertData} headerMenuData={menu} footerMenu={footerMenu}>
				<MastheadMinimal {...mastheadSettings} />
				<div className={`${styles['form-test']}`}>
					<Form {...Form_SampleData_LightPattern} />
				</div>
			</BaseTemplateWrapper>
		</BasePageWrapper>
	);
}

export const getStaticProps = async ({ locale }) => {
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
			uri: '/fr/_dev/tosca',
		},
		{
			locale: {
				locale: 'de_DE',
			},
			uri: '/de/_dev/tosca',
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
	formID: '411', // Tosca Form ID
	nextFormID: '1231', // follow up form
	ContentOffer: 'Test Persona', // Persona
	COStage: 'Prospect', // Stage
	leadSource: 'TRI-Accelerator-Tosca-Trial', // Form Name
	contentOffer: '', // CO Code. This code I pulled from the live site for testing
	COTitle: 'Tosca Form Test Title', // Reporting Title
	Initiative: 'SAP testing', // Initiative
	Product: 'Tricentis Tosca', // Product
	AssetType: 'Analyst Research', // Content Type
	shouldFormPrefill: true,
	redirectURL: '/_dev/tosca-thank-you', // redirect URL
	//Perform an action after form submission. Only happens if redirectURL isn't set.
	redirectCallback: () => {
		console.log('Form submitted, redirected after cb');
	},
	// used to update the buttons text
	ctaLabel: 'Go To Next Step',
	// these 3 labels are used to change the default text of the checkboxes. They can be provided with html as a string
	freeAgreeLabel: '',
	trialAgreeLabel: '',
	partnerAgreeLabel: '',

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
	// Note example of injected comboboxes

	comboBoxOptions: [
		{
			label: 'Last Lead Source',
			//Note: I used this field because I knew it was an existing hidden field
			marketoFieldID: 'lastLeadSourceContentOfferTitle',
			options: [
				{
					label: 'Dev',
					value: 'dev',
				},
				{
					label: 'QA',
					value: 'qa',
				},
			],
		},
		{
			label: 'Desert Selection',
			//Note: because this field doesn't exist as a hidden field on the marketo form, it will be ignored by the code.
			marketoFieldID: 'c_desert_option',
			options: [
				{
					label: 'Brownie',
					value: 'brownie_option',
				},
				{
					label: 'Chips',
					value: 'frito-lay_option',
				},
			],
		},
	],
	channel: 'None', // I was not able to find a filled example of the channel field on the live site.
	goal: { name: 'Contact', type: 'Accelerator', use_form_count: false },
	areaOfInterest: 'Area of interest Test',
	marketoScriptUrl: '//lps.tricentis.com', // basepath used by the marketo scripts
	marketoScriptId: '070-PYT-570', // not to be confused with the marketo form id.
	marketoScriptEmbedSrc: '//lps.tricentis.com/js/forms2/js/forms2.min.js', // location of the marketo script min file.location of the marketo script min file.
	InvalidDomainList: [
		'@abv.bg',
		'@aim.com',
		'@alice.it',
		'@aliceadsl.fr',
		'@aol.com',
		'@arcor.de',
		'@att.net',
		'@baddata.com',
		'@bellsouth.net',
		'@bigpond.com',
		'@bigpond.net.au',
		'@bluewin.ch',
		'@blueyonder.co.uk',
		'@bol.com.br',
		'@centurytel.net',
		'@charter.net',
		'@chello.nl',
		'@club-internet.fr',
		'@comcast.net',
		'@cox.net',
		'@earthlink.net',
		'@email.com',
		'@emeil.ir',
		'@eufh-mail.de',
		'@facebook.com',
		'@free.fr',
		'@freenet.de',
		'@frontiernet.net',
		'@gmail.com',
		'@gmail',
		'@gmx.',
		'@googlemail.com',
		'@grr.la',
		'@hetnet.nl',
		'@home.nl',
		'@hotmail.',
		'@icloud.com',
		'@ig.com.br',
		'@juno.com',
		'@kabelmail.de',
		'@laposte.net',
		'@libero.it',
		'@live.',
		'@lpu.co.in',
		'@lums.edu.pk',
		'@mac.com',
		'@mail.com',
		'@mail.ru',
		'@mailinator.com',
		'@mailismagic.com',
		'@me.com',
		'@msn.com',
		'@naver.com',
		'@neuf.fr',
		'@ntlworld.com',
		'@nwytg.com',
		'@nwytg.net',
		'@optonline.net',
		'@optusnet.com.au',
		'@orange.fr',
		'@outlook.com',
		'@outlook.jp',
		'@planet.nl',
		'@qq.com',
		'@rambler.ru',
		'@rediffmail.com',
		'@rocketmail.com',
		'@sbcglobal.net',
		'@sfr.fr',
		'@sharklasers.com',
		'@shaw.ca',
		'@sky.com',
		'@skynet.be',
		'@Storiqax.top',
		'@sympatico.ca',
		'@t-online.de',
		'@telenet.be',
		'@terra.com.br',
		'@tin.it',
		'@tiscali.co.uk',
		'@tiscali.it',
		'@ukr.net',
		'@uol.com.br',
		'@verizon.net',
		'@virgilio.it',
		'@voila.fr',
		'@vpslists.com',
		'@wanadoo.fr',
		'@web.de',
		'@windstream.net',
		'@xyz.com',
		'@yahoo.',
		'@yandex.com',
		'@yandex.ru',
		'@ymail.com',
		'@yopmail.com',
		'@zonnet.nl',
		'@qmetry.com',
		'@visualstudio.com',
		'@microfocus.com',
		'@getzephyr.com',
		'@smartbear.com',
		'@practitest.com',
		'@inflectra.com',
		'@gurock.com',
		'@xpand-addons.com',
		'@plutora.com',
		'@adaptavist.com',
		'@testlodge.com',
		'@testuff.com',
		'@telerik.com',
		'@catchsoftware.com',
		'@polarion.com',
		'@zoho',
		'@126',
		'@163',
		'@sina',
	],
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
