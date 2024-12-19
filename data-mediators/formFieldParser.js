import { mediateUrlPath } from '../wplib/urlHelpers';

export const parseFormFields = (t, data) => {
	let parseData = {
		shouldFormPrefill: true, // NOTE:: confirmed with VK on 7/14/2022 on Slack that this will always be true for now
		// prefillFields: additionPrefillData, // could optionally send different prefill fields - will default to fallbackPrefillFields in MarketoConstants

		// NOTE:: callback will not fire if `redirectURL` is set
		redirectCallback: () => {
			console.log('Form submitted, redirected after cb');
		},

		// NOTE:: These fields are unused, but kept as populated to avoid any unexpected errors
		channel: 'None', // NOTE:: this is not used in the front-end code as best we can tell
		goal: { name: 'PlaceholderName', type: 'PlaceholderGoalType', use_form_count: false }, // NOTE:: we are using a different GA Event tracking approach now
		areaOfInterest: 'PlaceholderAreaOfInterest', // NOTE:: This is only used to set `Primary_Area_of_Interest__c` in the front-end code, but that is not used (Per EM on 7/14/2022 on Slack)
	};

	// NOTE:: depending on the backend form source (module or tempalte) the variable names in
	// graphql slightly change, so there are multiple routes for setting the following fields:

	// CTA label (ex: 'Submit' button text)
	parseData.ctaLabel = t('generic.Submit'); // default
	parseData.formHeadline = data.formHeadline ?? null;
	parseData.formSubHeadline = data.formSubHeadline ?? null;
	if (data.resourceFormCta) {
		parseData.ctaLabel = data.resourceFormCta;
	} else if (data.formResourceFormCta) {
		parseData.ctaLabel = data.formResourceFormCta;
	}

	if (data.selectForm) {
		parseData.formID = data?.selectForm?.supportCPTFormFields.formId;
		parseData.leadSource = data?.selectForm?.supportCPTFormFields?.formTitle;
	} else if (data.formSelectForm) {
		parseData.formID = data.formSelectForm.supportCPTFormFields?.formId;
		parseData.leadSource = data.formSelectForm.title;
	}

	if (data?.nextForm) {
		parseData.nextFormID = data?.nextForm?.supportCPTFormFields?.formId;
	} else if (data.formNextForm) {
		parseData.nextFormID = data?.formNextForm?.supportCPTFormFields?.formId;
	}

	// Persona - multi-select
	if (data?.persona && Array.isArray(data?.persona)) {
		parseData.ContentOffer = data?.persona.join(',');
	} else if (data?.formPersona && Array.isArray(data?.formPersona)) {
		parseData.ContentOffer = data.formPersona.join(',');
	}

	// Initiative - multi-select
	if (data.initiative && Array.isArray(data.initiative)) {
		parseData.Initiative = data?.initiative.join(',');
	} else if (data.formInitiative && Array.isArray(data.formInitiative)) {
		parseData.Initiative = data.formInitiative.join(',');
	}

	if (data?.stage) {
		parseData.COStage = data?.stage;
	} else if (data.formStage) {
		parseData.COStage = data.formStage;
	}

	if (data?.coCode) {
		parseData.contentOffer = data?.coCode;
	} else if (data.formCoCode) {
		parseData.contentOffer = data.formCoCode;
	}

	if (data?.reportingTitle) {
		parseData.COTitle = data?.reportingTitle;
	} else if (data.formReportingTitle) {
		parseData.COTitle = data.formReportingTitle;
	}

	if (data.product) {
		parseData.Product = data?.product;
	} else if (data.formProduct) {
		parseData.Product = data?.formProduct;
	}

	if (data?.type) {
		parseData.AssetType = data?.type;
	} else if (data.formType) {
		parseData.AssetType = data?.formType;
	}

	parseData.allowFreemiumEmails = false;
	if (data.fremiumEmails || data.formFremiumEmails) {
		parseData.allowFreemiumEmails = true;
	}

	if (data.redirectUrl) {
		parseData.redirectURL = mediateUrlPath(data?.redirectUrl?.url);
	} else if (data.formRedirectUrl) {
		parseData.redirectURL = mediateUrlPath(data?.formRedirectUrl?.url);
	}

	// parse checkbox fields
	if (data.consentCheckbox && data.consentCheckbox.length === 1) {
		parseData.partnerAgreeLabel = data.consentCheckbox[0].checkboxContent.replace(/\n|\r/g, '');
	} else if (data.formConsentCheckbox && data.formConsentCheckbox.length === 1) {
		parseData.partnerAgreeLabel = data.formConsentCheckbox[0].checkboxContent.replace(/\n|\r/g, '');
	}

	// parse Marketing Opt In choice marketingOptInCheckbox
	if (data.marketingOptInCheckbox) {
		parseData.marketingOptInCheckbox = data.marketingOptInCheckbox;
	} else if (data.formMarketingOptInCheckbox) {
		parseData.marketingOptInCheckbox = data.formMarketingOptInCheckbox;
	}

	// parse Terms Opt In choice termsOptInCheckbox
	if (data.termsOptInCheckbox) {
		parseData.termsOptInCheckbox = data.termsOptInCheckbox;
	} else if (data.formTermsOptInCheckbox) {
		parseData.termsOptInCheckbox = data.formTermsOptInCheckbox;
	}

	// parse combobox choices
	if (data.comboboxChoices && data.comboboxChoices.length > 0) {
		const comboBoxOptions = data.comboboxChoices.map((choice) => {
			return comboboxOptionParser(choice);
		});
		parseData.comboBoxOptions = comboBoxOptions;
	} else if (data.formComboboxChoices && data.formComboboxChoices.length > 0) {
		const comboBoxOptions = data.formComboboxChoices.map((choice) => {
			return comboboxOptionParser(choice);
		});
		parseData.comboBoxOptions = comboBoxOptions;
	}

	// custom form thank you message
	if (data.customThankYou) {
		parseData.customThankYou = data.customThankYou;
	} else if (data.formCustomThankYou) {
		parseData.customThankYou = data.formCustomThankYou;
	}
	// Toggle
	if (data.toggle) {
		parseData.toggle = data.toggle;
	} else {
		parseData.toggle = null;
	}

	// let's log out form field data in dev mode for troubleshooting
	if (process.env.NODE_ENV === 'development') {
		console.log('formFieldParser parseData', parseData);
	}

	return parseData;
};

const comboboxOptionParser = (choice) => {
	var parsedOptions = choice.comboboxChoices?.map((option) => {
		return {
			label: option.choiceName,
			value: option.choiceValue,
		};
	});
	parsedOptions = parsedOptions ?? [];

	return {
		label: choice.comboboxLabel,
		marketoFieldID: choice.comboboxId,
		options: parsedOptions,
	};
};
