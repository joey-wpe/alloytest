export const SimpleFormSampleData = {
	// formID: '797', // contact form
	// formID: '809', // this form includes 2 injected checkboxes
	formID: '567', //qtest form,
	// formID: '411', // tosca
	// nextFormID: null,
	// nextFormID: '1231', // tosca 2
	shouldFormPrefill: true,
	redirectURL: '/_dev/redirect-test',
	redirectCallback: () => {
		console.log('Form submitted, redirected after cb');
	},
	leadSource: 'TRI-Accelerator-Contact-Us',
	contentOffer: '',
	// used to update the buttons text
	ctaLabel: 'Submit Form',
	// these 3 labels are used to change the default text of the checkboxes
	freeAgreeLabel: '<div>default agree checkbox label</div>',
	trialAgreeLabel:
		'<div>I agree to the <a href="https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/privacy-policy" target="_blank">Privacy Policy</a> and <a href="https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com/terms-of-use" target="_blank">Terms of Use</a></div>',
	partnerAgreeLabel: 'partner agree label',
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
	channel: '',
	goal: { name: 'Contact', type: 'Accelerator', use_form_count: false },
	areaOfInterest: 'tested interest',
};
