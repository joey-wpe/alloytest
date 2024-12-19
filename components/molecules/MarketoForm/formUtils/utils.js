import GlobalConstants from '../../../../GlobalConstants';
import MarketoConstants from '../../../../MarketoConstants';
import { trigger } from './eventHandlers';
const env = process.env.NODE_ENV;
const { formApi, marketoBackendPath, URLbasePath } = MarketoConstants.mktoFormEndpoints;
const { marketoFallbackScriptEmbedSrc } = MarketoConstants;

// retrieves the marketo script that's used to load the form
export const loadScript = (scriptStatus, setScriptStatus, marketoFormEmbedId, marketoScriptEmbedSrc) => {
	if (document.getElementById(marketoFormEmbedId)) {
		setScriptStatus({
			status: 'loaded',
			error: false,
			errorMsg: '',
		});
		return;
	}

	setScriptStatus({ ...scriptStatus, status: 'loading' });

	const scriptEmbed = document.createElement('script');
	scriptEmbed.id = marketoFormEmbedId;
	scriptEmbed.type = 'text/javascript';
	scriptEmbed.async = true;
	scriptEmbed.src = marketoScriptEmbedSrc === undefined ? marketoFallbackScriptEmbedSrc : marketoScriptEmbedSrc;
	scriptEmbed.onreadystatechange = function () {
		if (this.readyState === 'complete' || this.readyState === 'loaded') {
			setScriptStatus({
				status: 'loaded',
				error: false,
				errorMsg: '',
			});
		}
	};
	scriptEmbed.onload = () => {
		setScriptStatus({
			status: 'loaded',
			error: false,
			errorMsg: '',
		});
	};

	document.getElementsByTagName('head')[0].appendChild(scriptEmbed);
};

export const getUrlParameterByName = (paramName) => {
	paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const getVisibleInputs = (formElement) => {
	const formRow = formElement.querySelectorAll('.mktoFormRow');
	const inputs = [];

	formRow.forEach((formRowElement) => {
		const rowNodeList = formRowElement.querySelectorAll('input:not([type="hidden"])');
		const rowNodeListSelect = formRowElement.querySelectorAll('select');
		const rowNodeListTextarea = formRowElement.querySelectorAll('textarea');

		if (rowNodeList.length > 0) {
			inputs.push(...rowNodeList);
		}
		if (rowNodeListSelect.length > 0) {
			inputs.push(...rowNodeListSelect);
		}
		if (rowNodeListTextarea.length > 0) {
			inputs.push(...rowNodeListTextarea);
		}
	});

	return inputs;
};

// basic email validation
export const basicEmailCheck = (form, formErrors, invalidDomains, t) => {
	const formElement = form.getFormElem();
	const emailEl = formElement.find('#Email');
	const mktoSubmit = formElement.find('.mktoButton');

	mktoSubmit !== null ? (mktoSubmit.disabled = true) : '';

	if (!emailEl) {
		console.error('basicEmailCheck() - emailEl not found');
		return;
	}

	const email = emailEl[0].value;
	let message = '';

	if (isAcademyForm()) {
		mktoSubmit !== null ? (mktoSubmit.disabled = false) : '';

		return true;
	}

	if (!email.length) {
		formErrors.addError('email', 'Email is required');
		return false;
	} else {
		formErrors.removeError('email');
	}

	const regex =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!regex.test(email)) {
		message = t('mktoI18n.validationErrors.wrongEmailFormat');
		formErrors.addError('email', message);
		form.showErrorMessage(message, emailEl);

		return false;
	}

	if (isEmailDomainBlacklisted(email, invalidDomains)) {
		message = t('mktoI18n.validationErrors.enterValidBusEmail');
		formErrors.addError('email', message);
		form.showErrorMessage(message, emailEl);

		return false;
	}

	mktoSubmit !== null ? (mktoSubmit.disabled = false) : '';

	return true;
};

export const prepContactForm = (form, formErrors, t) => {
	const id = '#Reason_for_contacting__c';
	const element = document.querySelector(id);
	if (!isContactForm() && element) {
		element.closest('.mktoFormRow').classList.add('mktoHidden');
		return;
	}

	if (!element) {
		return;
	}

	element.closest('.mktoFieldWrap').classList.add('mktoRequiredField');

	const checkIfReasonIsValid = () => {
		const value = element.value;

		if (value === '') {
			formErrors.addError('reasonForContact', 'not yet validated');
			const emailElem = form.getFormElem().find(id);
			form.showErrorMessage(t('mktoI18n.reasonForContacting'), emailElem);
		} else {
			formErrors.removeError('reasonForContact');
		}
	};

	element.addEventListener('change', checkIfReasonIsValid);
	formErrors.addError('reasonForContact', 'not yet validated');
	setTimeout(() => {
		checkIfReasonIsValid();
	}, 1000);
};

const isPathInWindowUrl = (path) => {
	const result = window.location.pathname.toLocaleLowerCase().search(path) !== -1;
	// console.log(
	// 	`MKTO:: isPathInWindowUrl() - compared window location of '${window.location.pathname.toLocaleLowerCase()}' to '${path}' - result: ${result}`
	// );
	return result;
};

/**
 * The following isXForms functions are used to allow other
 * parts of the codebase to quickly check what type of form
 * is being used.
 *
 * They all return a boolean value.
 **/
export const isTrialForm = () => {
	let isTrialForm = false;

	const trialFormUrls = [
		// from old site
		'/lp/ppc-qtest-agile-test-management',
		'/lp/ppc-agile-test-management-qtest',
		'/lp/agile-test-management-qtest-ret',
		'/agile-test-management-qtest-social',
		'/agile-test-management-qtest',
		'/software-testing-tool-trial-demo/qtest-trial',
		'/de/software-testing-tool-trial-demo/qtest-trial',
		'/fr/software-testing-tool-trial-demo/qtest-trial',
		'/lp/mqat-qtest-trial-request',
		'/academy/training-certifications/qtest-trial',
		'/lp/tpst-trial-request',
		'/lp/qtest-vs-testrail-trial',

		// for new site
		'/_dev/qtest-trial',
		'/test-form-qtest',
	];

	trialFormUrls.forEach((url) => {
		if (isPathInWindowUrl(url)) {
			isTrialForm = true;
		}
	});
	return isTrialForm;
};

export const isToscaTrialForm = () => {
	let isToscaTrialForm = false;

	const ToscaTrialForm = [
		// from old site
		'_dev/tosca',
		'test-form-tosca-trial',
		'tosca-trial',
		'tosca-on-prem-trial',
		'/lp/sap-testing-tool',
		'tosca-copilot-trial',
	];

	ToscaTrialForm.forEach((url) => {
		if (isPathInWindowUrl(url)) {
			isToscaTrialForm = true;
		}
	});
	return isToscaTrialForm;
};

export const isNeoLoadTrialForm = () => {
	return isPathInWindowUrl(
		/neoload-trial|performance-load-testing-ppc|test-automation-salesforce-trial|testim-trial|products\/tricentis-test-automation/g
	);
};

export const isSHanaForm = () => {
	return isPathInWindowUrl('s4hana-assessment');
};

export const isAcademyForm = () => {
	return isPathInWindowUrl('academy/training-certifications/qtest-trial');
};

export const isqtest90Form = () => {
	if (isPathInWindowUrl('_dev/qtest-trial')) {
		return true;
	}
	if (isPathInWindowUrl('qtest90')) {
		return true;
	}
	if (isPathInWindowUrl('test-form-qtest')) {
		return true;
	}
	return false;
};

export const isqtestTpstForm = () => {
	return isPathInWindowUrl('lp/tpst-trial-request');
};

export const isqtestsea6Form = () => {
	return isPathInWindowUrl('qtest-sea6');
};

export const isContactForm = () => {
	return isPathInWindowUrl('contact');
};

export const isNominateForm = () => {
	return isPathInWindowUrl('testing-awards/');
};

export const validateBusinessEmail = (form, formErrors, invalidDomains, t) => {
	const email = form.vals().Email;

	if (form.getId() === 567) {
		const mktoSubmit = document.querySelector('.mktoButton');

		mktoSubmit !== null ? (mktoSubmit.disabled = true) : '';
	}

	if (!email) return;

	if (isEmailDomainBlacklisted(email, invalidDomains)) {
		form.submittable(false);

		const emailElem = form.getFormElem().find('#Email');
		form.showErrorMessage(t('mktoI18n.validationErrors.enterValidBusEmail'), emailElem);
		formErrors.addError('business_email', 'not properly formatted');

		return;
	}

	formErrors.removeError('business_email');

	if (form.getId() === 567) {
		mktoSubmit !== null ? (mktoSubmit.disabled = false) : '';
		!formErrors.hasErrors() && form.submittable(true);
	}
};

// previously "isGoodEmail". Renamed and update to be more clear on what it does where it's called
export const isEmailDomainBlacklisted = (email, invalidDomains) => {
	email = email.toLowerCase();

	for (let invalidDomain of invalidDomains) {
		let domain = invalidDomain.trim();

		// verifies if email address contains freemail with regex pattern if * (wildcard) is found. Otherwise string matches the domain
		if (domain.indexOf('.*') > -1) {
			const domainParts = domain.replace('@', '').split('.*');
			// prettier-ignore
			const regex = new RegExp('(?<=[@])(?<![\w\d])' + domainParts[0] + '(?![\w\d])(?=[\.])', 'gi');

			if (email.match(regex)) {
				return true;
			}
		} else if (email.endsWith(domain)) {
			return true;
		}
	}

	return false;
};

// regex functions to check if the password provided is strong enough
export const validatePass = (pass) => {
	return /\d/.test(pass) && /[a-zA-Z]/.test(pass);
};

export const validatePassUpperLowerAndNumber = (pass) => {
	return /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass);
};

export const validateSpecial = (pass) => {
	return !/[^a-zA-Z0-9]/.test(pass);
};

export const validateToscaSpecial = (pass) => {
	return !/[^a-zA-Z0-9!@#$%^&*]/.test(pass);
};

// used to manually call onValidate
export const onValidate = (form, formErrors) => {
	form.onValidate(() => {
		if (formErrors.hasErrors()) {
			form.submittable(false);

			return;
		}
		form.submittable(true);
	});
};

// trigger email validation on change
export const checkEmail = (form, formErrors, invalidDomains, t) => {
	form.onValidate(() => {
		validateBusinessEmail(form, formErrors, invalidDomains, t);
	});

	const formEl = form.getFormElem()[0];
	const emailEl = formEl.querySelector('#Email');

	if (!emailEl) {
		return;
	}

	emailEl.addEventListener('keydown', async () => {
		// this disable is to prevent copy and pasting email values
		const mktoSubmit = document.querySelector('.mktoButton');

		mktoSubmit !== null ? (mktoSubmit.disabled = true) : '';
	});

	emailEl.addEventListener('blur', async () => {
		await validateBusinessEmail(form, formErrors, invalidDomains, t);

		await serviceObjectsEmail(form, formErrors, t);
	});

	validateBusinessEmail(form, formErrors, invalidDomains, t);
};

export const prefillCallback = async (prefillArgs, mkt_usr) => {
	const {
		form,
		formErrorsObj,
		formCleanup,
		invalidDomains,
		defaultAgreements,
		validatingEmail,
		toscaTrialData,
		t,
		PIC_Config,
	} = prefillArgs;

	const formId = form.getId();
	const isPrefCenter = parseInt(formId) != 530 && parseInt(formId) != 570;
	const form_values = {};

	for (let value in mkt_usr) {
		form_values[value] = mkt_usr[value];
	}

	form.vals(form_values);

	localStorage.setItem('marketo_lead_id', mkt_usr.id);

	formCleanup.checkFields();

	if (PIC_Config) {
		const inputNames = Object.values(PIC_Config).flat();
		inputNames.forEach((name) => {
			if (form_values[name]) {
				const el = document.querySelector(`#${name}`);
				el.dispatchEvent(new Event('change'));
			}
		});
	}

	// console.log('MKTO:: prefillCallback - logic branching..', mkt_usr);
	if (isTrialForm()) {
		// console.log('MKTO:: prefillCallback - logic branching - isTrialForm() true');
		trialEmail(form, formErrorsObj, validatingEmail, {}, invalidDomains, t);
	} else if (isToscaTrialForm()) {
		// console.log('MKTO:: prefillCallback - logic branching - isToscaTrialForm() true');
		trialEmail(form, formErrorsObj, validatingEmail, toscaTrialData, invalidDomains, t);
	} else if (isNeoLoadTrialForm()) {
		// console.log('MKTO:: prefillCallback - logic branching - isNeoLoadTrialForm() true');
		checkEmail(form, formErrorsObj, invalidDomains, t);
	} else {
		// console.log('MKTO:: prefillCallback - logic branching - none of the above - calling hideTrialFields()');
		if (isPrefCenter) {
			checkEmail(form, formErrorsObj, invalidDomains, t);
		}
	}

	if (isNominateForm()) {
		nominateFormFields(form, formErrorsObj);
	}

	if (isSHanaForm()) {
		S4HanaFields(form, formErrorsObj);
	}

	if (isPrefCenter) {
		if (form_values['Email'].length > 0 && mkt_usr.Service_Objects_Email_Score__c > 2) {
			await serviceObjectsEmail(form, formErrorsObj, t);
		} else if (form_values['Email'].length && !formErrorsObj.hasErrors()) {
			const mktoSubmit = document.querySelector('.mktoButton');

			mktoSubmit.disabled = false;
		}
	}

	fixCheckboxValidation(form, t);

	handleReusableCheckboxes(form, defaultAgreements, formErrorsObj, t);

	const reasonField = document.querySelector('#Reason_for_contacting__c');

	if (reasonField) {
		setTimeout(() => {
			trigger('change', reasonField);
		}, 100);
	}
};

// checks email score with Service Objects API
export const serviceObjectsEmail = async (form, formErrors, t) => {
	const formEl = form.getFormElem()[0];
	const email = form.getFormElem().find('#Email');
	const emailValue = email.val();
	const mktoSubmit = formEl.querySelector('.mktoButton');
	let sbValuesEmail;
	let sbValuesArray = [];
	const sbEmailScoreInput = document.querySelector('input[name="Service_Objects_Email_Score__c"]');
	const sbEmailNotesInput = document.querySelector('input[name="Service_Objects_Email_Notes__c"]');

	const body = {
		email: emailValue,
	};

	const gmbhRegex = new RegExp('@(.*.gmbh)', 'gm');

	if (emailValue.indexOf('@tricentis.com') !== -1 || emailValue.match(gmbhRegex) != null) {
		mktoSubmit.disabled = false;

		return true;
	}

	const response = await fetch(`${formApi}/${GlobalConstants.FrontendRoutes.ServiceObjectsEmailVerification}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		dataType: 'json',
		body: JSON.stringify(body),
	})
		.then((response) => response.text())
		.then((result) => {
			const response = JSON.parse(result);

			return response;
		})
		.catch((error) => {
			console.log('error: ', error);
		});

	if (!response.Error) {
		let sb = (({ Domain, EmailCorrected, IsDeliverable, NotesCodes, WarningDescriptions }) => ({
			Domain,
			EmailCorrected,
			IsDeliverable,
			NotesCodes,
			WarningDescriptions,
		}))(response.ValidateEmailInfo);

		Object.keys(sb).map((key) => {
			const valueRow = `${key} / ${sb[key]}`;
			sbValuesArray.push(valueRow);
		});

		sbValuesEmail = sbValuesArray.join(' | ');

		sbEmailScoreInput.value = response.ValidateEmailInfo.Score;
		sbEmailNotesInput.value = sbValuesEmail;

		if (sbEmailScoreInput.value > 2 && emailValue.indexOf('@tricentis.com') === -1) {
			form.showErrorMessage(t('mktoI18n.validationErrors.enterValidBusEmail'), email);
			mktoSubmit.disabled = true;
		} else {
			mktoSubmit.disabled = false;
		}
	}
	// else if(response.Error.TypeCode === '1' && response.Error.DescCode === '5') {
	else if (response.Error) {
		sbEmailNotesInput.value = response.Error.Desc;

		return false;
	} else {
		sbEmailNotesInput.value = response;
	}

	return true;
};

const showMessage = (valid, message, emailElement) => {
	const emailSiblings = emailElement.parentNode.querySelectorAll('.mktoValidation');
	if (emailSiblings.length > 0) {
		emailSiblings.forEach((sibling) => {
			sibling.remove();
		});
	}
	let className = valid ? 'valid' : 'invalid';
	const emailParent = emailElement.parentNode;

	emailParent.insertAdjacentHTML(
		'beforeend',
		`<span id="mktoCustomEmailValidationMessage" class="mktoValidation ${className}">${message}</span>`
	);
};

const debounce = (wait, func) => {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
};

const trialEmail = (form, formErrorsObj, validatingEmail, toscaTrialData = {}, invalidDomains, t) => {
	const phone = document.querySelector('#Phone');
	if (phone) {
		phone.attributes.maxlength.value = 25;
	}

	basicEmailCheck(form, formErrorsObj, invalidDomains, t);

	const emailElement = document.querySelector('#Email');

	if (!emailElement) {
		return;
	}

	emailElement.addEventListener('keydown', async () => {
		// this disable is to prevent copy and pasting email values
		const mktoSubmit = document.querySelector('.mktoButton');

		mktoSubmit !== null ? (mktoSubmit.disabled = true) : '';

		await validateEmail(form, formErrorsObj, validatingEmail, toscaTrialData, invalidDomains, t);
	});

	emailElement.addEventListener('blur', async () => {
		await validateEmail(form, formErrorsObj, validatingEmail, toscaTrialData, invalidDomains, t);

		await serviceObjectsEmail(form, formErrorsObj, t);
	});

	validateEmail(form, formErrorsObj, validatingEmail, toscaTrialData, invalidDomains, t);
};

// the original code appears to use a 'X-WP-Nonce' header to validate the nonce.
// when I tried to perform http requests without the header, the requests still returned 200 codes and the data
// if it turns out that those headers are required, I'll need to add them to this function
/**
 * Provides a reuseable way to make ajax requests using fetch api
 * @param {string} endpoint example valid endpoint: '/wp-admin/admin-ajax.php'
 * @param {string} method
 * @param {object} payload
 * @param {string} dataType - if not provided, defaults to 'json'
 * @returns response (promise)
 */
export const customFetch = async (endpoint, method, payload, dataType = 'json') => {
	let fullUrl = `${URLbasePath}${endpoint}`;

	if (method === 'GET') {
		const queryString = Object.keys(payload)
			.map((key) => `${key}=${payload[key]}`)
			.join('&');
		const getUrl = fullUrl + '?' + queryString;

		const response = await fetch(getUrl, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: method,
			dataType: dataType,
		});
		const data = await response.json();

		return data;
	}

	if (method === 'POST') {
		const response = await fetch(fullUrl, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: method,
			body: JSON.stringify(payload),
			dataType: dataType,
		});
		const data = await response.json();

		return data;
	}

	return;
};

export const resendToscaVerificationEmail = async (marketoLeadId) => {
	const emailElement = document.querySelector('#Email') || document.querySelector('#fake-email');
	const emailValue = emailElement.value;

	const body = { email: emailValue, marketoLeadId };
	const response = await fetch(`${formApi}/${GlobalConstants.FrontendRoutes.ToscaEmailVerification}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		dataType: 'json',
		body: JSON.stringify(body),
	});
	const res = await response.json();

	return res;
};

export const trialCheckUser = async (form, formErrorsObj, invalidDomains, currentlyCheckedEmail, toscaTrialData, t) => {
	const emailElement = document.querySelector('#Email') || document.querySelector('#fake-email');
	const emailValue = emailElement.value;
	let valid;
	let message = '';
	const path = window.location.pathname;
	const body = {
		email: emailValue,
		path: path,
	};

	if (isToscaTrialForm()) {
		let loadingMessage = t('mktoI18n.toscaTrial.loadingEmailCheck');

		formErrorsObj.addError('email', loadingMessage);
		showMessage(false, loadingMessage, emailElement);
		clearSubmitButtonError();

		const response = await fetch(`${formApi}/${GlobalConstants.FrontendRoutes.ToscaCheckUser}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			dataType: 'json',
			body: JSON.stringify(body),
		})
			.then((response) => response.text())
			.then((result) => {
				const response = JSON.parse(result);

				// uncomment for testing
				// console.log('tosca response', response);

				toscaTrialData.userExists = response.userExists;
				toscaTrialData.verifyEmailRequired = response.error === 'verifyEmailRequired';
				toscaTrialData.mlid = response.mlid ?? null;
				if (response.error) {
					valid = false;

					if (response.error === 'invalidEmail') {
						message = t('mktoI18n.validationErrors.enterValidBusEmail');
					} else if (response.error === 'recentTrial') {
						message = t('mktoI18n.toscaTrial.emailIneligibleError');
					}

					showSubmitButtonError(message);
					formErrorsObj.addError('email', message);
				} else {
					valid = true;
					formErrorsObj.removeError('email');
					message = t('mktoI18n.validationErrors.validEmail');
				}

				showMessage(valid, message, emailElement);
			})
			.catch((error) => {
				let message = t('mktoI18n.validationErrors.unexpectedReload');
				formErrorsObj.addError('email', message);
				showMessage(false, message, emailElement);
				showSubmitButtonError(message);
			});
	} else {
		await customFetch(marketoBackendPath + 'qtest_validate_username', 'GET', {
			username: emailValue,
		}).then((response) => {
			// uncomment for testing
			// console.log('qTest response: ', response);

			if (response.success !== false) {
				valid = true;
				message = t('mktoI18n.validationErrors.validEmail');
				formErrorsObj.removeError('email');
			} else {
				valid = false;
				formErrorsObj.addError('email', 'email already exists');
				message = t('mktoI18n.qtestTrial.emailExistsError').replace('%s', emailValue);
			}
			showMessage(valid, message, emailElement);
		});
	}
};

const validateEmail = debounce(
	1000,
	function (form, formErrorsObj, currentlyCheckedEmail, toscaTrialData, invalidDomains, t) {
		const emailElement = document.querySelector('#Email');
		const emailValue = emailElement.value;

		if (emailValue === currentlyCheckedEmail) {
			return;
		}

		currentlyCheckedEmail = emailValue;

		if (!basicEmailCheck(form, formErrorsObj, invalidDomains, t)) {
			return;
		}
	}
);

const nominateFormFields = (formErrorsObj) => {
	const checkbox = document.querySelector('input[name=testingHeroesUpdates]');

	if (!checkbox) {
		return;
	}

	checkbox.closest('.mktoFieldWrap').classList.add('mktoRequired');
	checkbox
		.closest('.mktoFieldDescriptor')
		.parentNode.querySelector('.mktoFormCol')
		.querySelector('.mktoHtmlText').style.fontWeight = 'bold';

	formErrorsObj.addError('testing_hero_updates', 'not yet validated');

	const testingHerosLabel = document.querySelector('label[for=testingHeroesUpdates]');
	if (testingHerosLabel) {
		testingHerosLabel.querySelector('.mktoAsterix').style.display = 'none';
	}

	checkbox.addEventListener('change', function () {
		if (this.checked) {
			formErrorsObj.removeError('testing_hero_updates');
		} else {
			formErrorsObj.addError('testing_hero_updates', 'not yet validated');
		}
	});
};

const S4HanaFields = (form) => {
	const checkbox = document.querySelector('input[name=Free_Trial_Opt_In__c]');

	if (!checkbox.length) {
		return;
	}

	checkbox.closest('.mktoFormRow').show();
	checkbox.closest('.mktoLogicalField').addClass('mktoRequired');

	this.formErrors.addError('trial_opt_in', 'not yet validated');

	const asterix = document.querySelector('label[for=Free_Trial_Opt_In__c] .mktoAsterix');
	if (asterix) {
		asterix.style.display = 'none';
	}

	checkbox.change(function () {
		if (this.checked) {
			this.formErrors.removeError('trial_opt_in');
		} else {
			this.formErrors.addError('trial_opt_in', 'not yet validated');
		}
	});

	form.onValidate(function () {
		const checkbox = document.querySelector('input[name=Free_Trial_Opt_In__c]');
		if (checkbox.checked) {
			// Need to use find() here because the showErrorMessage method is expecting a jQuery object
			const checkbox_elem = form.getFormElem().find('#Free_Trial_Opt_In__c');
			form.showErrorMessage(t('mktoI18n.validationErrors.requiredField'), checkbox_elem);
			checkbox.closest('.mktoRequired').classList.add('mktoInvalid');
			checkbox.closest('.mktoRequired').classList.remove('mktoValid');
		} else {
			checkbox.closest('.mktoRequired').classList.remove('mktoInvalid');
			checkbox.closest('.mktoRequired').classList.add('mktoValid');
		}
	});
};

export const showSubmitButtonError = (errMsg) => {
	const buttonRowEl = document.querySelector('.mktoButtonRow');
	const buttonMsgEl = document.createElement('span');
	buttonMsgEl.classList.add('mktoMessage');
	buttonMsgEl.innerHTML = errMsg;

	buttonRowEl.style.position = 'relative';
	buttonRowEl.appendChild(buttonMsgEl);
};

export const clearSubmitButtonError = () => {
	const buttonRowEl = document.querySelector('.mktoButtonRow');

	const mktoMsg = buttonRowEl.querySelector('.mktoMessage');
	if (mktoMsg) {
		mktoMsg.remove();
	}
};

export const showProcessingButton = (t) => {
	let message = t('mktoI18n.qtestTrial.provisioningMessage');
	if (isToscaTrialForm()) {
		message = t('mktoI18n.toscaTrial.provisioningMessage');
	}

	const submitButton = document.querySelector('.mktoButtonRow button');
	submitButton.disabled = true;
	submitButton.innerHTML = setProcessingButtonInnerHTML();
	const mktoMessage = document.createElement(`span`);
	mktoMessage.classList.add(`mktoMessage`);
	mktoMessage.innerHTML = message;
	submitButton.after(mktoMessage);
};

export const setProcessingButtonInnerHTML = () => {
	let spinnerUrl = URLbasePath;
	if (env == 'development') {
		spinnerUrl = 'https://local.tricentis.com:3000';
	}

	return `Processing... <img src="${spinnerUrl}/loading.gif" style="margin-left: 8px; width: 16px; height: 16px;" alt="" />`;
};
export const hideProcessingButton = (t) => {
	const submitButton = document.querySelector('.mktoButtonRow button');
	if (submitButton) {
		submitButton.disabled = false;
		submitButton.innerHTML = t('mktoI18n.qtestTrial.submitButtonLabel');
	}
	const mktoMsg = document.querySelector('.mktoButtonRow button + .mktoMessage');
	if (mktoMsg) {
		mktoMsg.remove();
	}
};

export const fixCheckboxValidation = (form, t) => {
	form.onValidate((native) => {
		const formElement = form.getFormElem()[0];
		const topInvalid = formElement.querySelector('.mktoInvalid');
		const topInvalidCheckbox = formElement.querySelector('.mktoInvalid.mktoCheckboxList');
		const errorMessage = t('mktoI18n.validationErrors.requiredField');
		if (!native && topInvalidCheckbox === topInvalid) {
			form.showErrorMessage(errorMessage, window.MktoForms2.$(topInvalidCheckbox));
		}
	});
};

/**
 * Checks if form should add injected checkboxes and calls checkboxSetup for each checkbox that should be added
 * @param {formObj} form
 * @param {object} defaultAgreements - Object containing labels provided through the options passed to Marketo
 * @param {formErrorsObj} formErrors
 */
export const handleReusableCheckboxes = (form, defaultAgreements, formErrors, t) => {
	const { free, trial, partner } = defaultAgreements;

	let freeRow = undefined,
		trialRow = undefined,
		partnerRow = undefined;

	if (document.querySelector('input[name=defaultAgreeFree]')) {
		freeRow = document.querySelector('input[name=defaultAgreeFree]').closest('.mktoFormRow');
	}
	// Note: the below checks for a input for "defaultAgreeTrial", however the original code included the typo that was made on the Marketo backend
	// I have left the original check for the typo so the form continues to function, but added an additional check for the correct spelling
	// to ensure the form functions with the proper spelling.
	if (document.querySelector('input[name=drfaultAgreeTrial]')) {
		trialRow = document.querySelector('input[name=drfaultAgreeTrial]').closest('.mktoFormRow');
	}

	// Note: This and the above if statement are both technically looking for the same input, but the above had a typo in the original code
	if (document.querySelector('input[name=defaultAgreeTrial]')) {
		trialRow = document.querySelector('input[name=defaultAgreeTrial]').closest('.mktoFormRow');
	}

	if (document.querySelector('input[name=partnerOptin]')) {
		partnerRow = document.querySelector('input[name=partnerOptin]').closest('.mktoFormRow');
	}

	if (free === '' && freeRow !== undefined) {
		freeRow.style.display = 'none';
	}
	if (partner === '' && partnerRow !== undefined) {
		partnerRow.style.display = 'none';
	}
	if (trial === '' && trialRow !== undefined) {
		trialRow.style.display = 'none';
	}

	if (free !== '' && freeRow !== undefined) {
		checkboxSetup(freeRow, form, formErrors, 'defaultAgreeFree', 'free_opt_in', free, t);
	}

	if (trial !== '' && trialRow !== undefined) {
		checkboxSetup(trialRow, form, formErrors, 'drfaultAgreeTrial', 'default_trial_opt_in', trial, t);
	}

	if (partner !== '' && partnerRow !== undefined) {
		checkboxSetup(partnerRow, form, formErrors, 'partnerOptin', 'default_partner_opt_in', partner, t);
	}
};

/**
 *	Adds the checkbox classes, label, and event listeners to the checkbox
 * @param {formObj} form
 * @param {formErrorsObj} formErrors
 * @param {string} name - the name value/id of the checkbox
 * @param {string} errKey - should be a unique string for the error message
 * @param {string} label - label provided through the options passed to Marketo
 */
const checkboxSetup = (checkboxRow, form, formErrors, name, errKey, label, t) => {
	checkboxRow.querySelector('.mktoFieldWrap').classList.add('mktoRequiredField');
	checkboxRow.querySelector('.mktoCheckboxList').classList.add('mktoRequired');
	checkboxRow.querySelector('.mktoLabel').innerHTML = `<div class="mktoAsterix">*</div> ${label}`;
	checkboxRow.querySelector('.mktoLabel').classList.add('mktoHtmlText');

	const checkbox = document.querySelector(`input[name=${name}]`);

	formErrors.addError(errKey, 'not yet validated');

	checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
			formErrors.removeError(errKey);
		} else {
			formErrors.addError(errKey, 'not yet validated');
		}
	});

	// When the Marketo form validation is triggered, check if the free checkbox is checked
	form.onValidate(function () {
		const isCheckboxChecked = checkbox.checked;
		if (isCheckboxChecked === false) {
			formErrors.addError(errKey, 'not yet validated');

			// ? you MUST use .find() to get the element because showErrorMessage() is expecting a jQuery object
			const checkboxElement = form.getFormElem().find(`#${name}`);
			form.showErrorMessage(t('mktoI18n.validationErrors.requiredField'), checkboxElement);

			checkbox.closest('.mktoRequired').classList.add('mktoInvalid');
			checkbox.closest('.mktoRequired').classList.remove('mktoValid');
		} else {
			checkbox.closest('.mktoRequired').classList.remove('mktoInvalid');
			checkbox.closest('.mktoRequired').classList.add('mktoValid');
		}
	});
};

/**
 * Checks is a value can be passed to a Map constructor. Ex: const myMap = new Map(value);
 *
 * @param {*} value
 *
 * @returns {Boolean} Returns true, if the value matches the format: [ [ 'key', { a: 'val', ... } ], ...].
 */
export const isMapFormat = (value) => {
	// Should not be undefined and of type Array
	if (typeof value === 'undefined' && !Array.isArray(value)) return false;
	// Checkt if the Array items are Arrays of the following format [string, object]
	if (
		!value.every(
			(profile) =>
				Array.isArray(profile) &&
				profile.length === 2 &&
				typeof profile[0] === 'string' &&
				typeof profile[1] === 'object'
		)
	)
		return false;

	return true;
};
