import {
	customFetch,
	fixCheckboxValidation,
	getUrlParameterByName,
	getVisibleInputs,
	handleReusableCheckboxes,
	hideProcessingButton,
	isAcademyForm,
	isqtest90Form,
	isqtestsea6Form,
	isqtestTpstForm,
	isToscaTrialForm,
	isTrialForm,
	onValidate,
	prefillCallback,
	prepContactForm,
	showProcessingButton,
	showSubmitButtonError,
	trialCheckUser,
	validatePass,
	validatePassUpperLowerAndNumber,
	validateSpecial,
	validateToscaSpecial,
	resendToscaVerificationEmail,
	isMapFormat,
} from './utils';
import MarketoErrors from './MarketoErrors';
import MarketoFormCleanup from './MarketoFormCleanup';
import MarketoData from './MarketoData';
import { simpleDTOSetup } from './SimpleDTO';
import GlobalConstants from '../../../../GlobalConstants';
import MarketoConstants from '../../../../MarketoConstants';

const env = process.env.NODE_ENV;

const { formApi, marketoBackendPath } = MarketoConstants.mktoFormEndpoints;

const { marketoFallbackScriptUrl, marketoFallbackScriptId, fallbackInvalidDomainList, fallbackPrefillFields } =
	MarketoConstants;

const redirectURLOptions = {
	default: ['/thank-you-qtest-free-trial/'],
	academyForm: ['/thank-you-qtest-academy-free-trial/'],
	qTest90Form: ['/qtest90/thank-you/'],
	qTest90FormDevMode: ['/_dev/qTest-thank-you/'],
	qtestTpstForm: ['/lp/tpst-trial-request/thank-you/'],
	qtestsea6Form: ['/qtest-sea6/thank-you/'],
	toscaTrialForm: ['/software-testing-tool-trial-demo/tosca-trial/get-started/'],
	toscaTrialFormDevMode: ['/_dev/tosca-thank-you/'],
};

// The core of the Marketo form. Much of this could be refactored
class MarketoCore {
	constructor(options, setFormObj, translator) {
		// options provided by the react component.
		this.options = options;
		// marketo script options with global fallback
		this.marketoScriptId = options.marketoScriptId === undefined ? marketoFallbackScriptId : options.marketoScriptId;
		this.marketoUrl = options.marketoScriptUrl === undefined ? marketoFallbackScriptUrl : options.marketoScriptUrl;
		this.formId = options.formID;
		this.nextFormId = options.nextFormID ?? null;
		// "form" should always refer to the form object provided by marketo
		this.form = null;
		// "formElement" should always refer to the actual form element
		this.formElement = null;
		// form data
		this.formData = {};
		this.formErrors = null; // Errors object initialized from MarketoErrors
		this.formNum = 1;

		this.channel = options.channel ?? 'None';
		this.lead_id = null;
		this.redirectURL = options.redirectURL ?? null;
		this.redirectCallback = options.redirectCallback ?? null;
		this.prefillFields = options.prefillFields ?? fallbackPrefillFields;

		this.ctaLabel = options.ctaLabel ?? null;
		this.trialForm = null;
		this.shouldFormPrefill = options.shouldFormPrefill;
		this.allowFreemiumEmails = options.allowFreemiumEmails ?? false;
		this.invalidDomains = options.invalidDomains ?? fallbackInvalidDomainList;
		this.setFormObj = setFormObj;
		this.t = translator;

		this.trialFormValidation = {
			domain: false,
			password: false,
		};
		this.toscaTrialData = {
			mlid: null,
			userExists: false,
			verifyEmailRequired: false,
		};

		this.validatingEmail = '';

		this.defaultAgreements = {
			free: options.freeAgreeLabel ?? '',
			partner: options.partnerAgreeLabel ?? '',
			trial: options.trialAgreeLabel ?? '',
		};
		console.log('MarketoCore.defaultAgreements', this.defaultAgreements);

		this.marketingOptInCheckbox = options.marketingOptInCheckbox;
		this.termsOptInCheckbox = options.termsOptInCheckbox;
		this.customThankYou = options.customThankYou;

		this.comboBoxOptions = options.comboBoxOptions ?? null;

		this.goal = options.goal ?? null;

		this.lastLeadSourceContentOffer = options.ContentOffer ?? ''; // Persona
		this.lastLeadSourceCOStage = options.COStage ?? ''; // Stage
		this.leadSource = options.leadSource ?? 'None'; // Form Name
		this.contentOffer = options.contentOffer ?? 'None'; // Co Code
		this.lastLeadSourceContentOfferTitle = options.COTitle ?? ''; // Reporting Title
		this.lastLeadSourceInitiative = options.Initiative ?? ''; // Initiative
		this.lastLeadSourceProduct = options.Product ?? ''; // Product
		this.lastLeadSourceAssetType = options.AssetType ?? ''; // Content Type

		this.Data = new MarketoData();

		// TODO these can likely be removed. It doesn't appear they are used anymore now that event tracking is removed
		this.source_campaign = this.Data.getParameter('utm_campaign');
		this.source_channel = this.Data.getParameter('LS');
		this.source_q = this.Data.getParameter('q');
		this.source_p = this.Data.getParameter('p');
		this.source_text = this.Data.getParameter('text');
		this.source_wd = this.Data.getParameter('wd');
		this.source_ps = this.Data.getParameter('ps');
		this.source_referrer = this.Data.getReferrer();
		this.source_form = '';
		this.source_partner = this.Data.getParameter('utm_source');
		this.source_program = 'NA';
		this.source_ppc_adgroup = this.Data.getParameter('ag');
		if (this.source_ppc_adgroup === '') {
			this.source_ppc_adgroup = 'None';
		}
		this.source_ppc_ad = this.Data.getParameter('ad');
		if (this.source_ppc_ad === '') {
			this.source_ppc_ad = 'None';
		}
		this.source_ppc_campaign = this.Data.getParameter('ca');
		if (this.source_ppc_campaign === '') {
			this.source_ppc_campaign = 'None';
		}
		this.source_ppc_keyword = this.Data.getParameter('st');
		if (this.source_ppc_keyword === '') {
			this.source_ppc_keyword = 'None';
		}
		this.trialRedirectURL = '';

		// Progressive Information Collection (PIC)
		// `profiling` variable is set globally via Google Tag Manager.
		// TODO: Solution to activate Marketo forms on specific pages
		this.progressiveInfoCollection = new Map(
			typeof profiling !== 'undefined' && isMapFormat(profiling) ? profiling : []
		);
		// Disclamer: uncoment for debugging
		// console.log(isMapFormat(profiling), profiling);
		// console.log(this.progressiveInfoCollection, window.location.href);

		this.PIC_step = null;
		this.PIC_Config = this.progressiveInfoCollection.get(window.location.href);

		this.init(setFormObj);
	}

	// using an init method to initialize the form because it needs to be asynchronous.
	async init(setFormObj) {
		const createFormObj = (form) => {
			this.form = form;
			this.formElement = form.getFormElem()[0];
		};

		// initial load of the form, and a callback to perform actions after the form is loaded
		await window.MktoForms2.loadForm(this.marketoUrl, this.marketoScriptId, this.formId, createFormObj);

		await window.MktoForms2.onFormRender(async (form) => {
			console.log('MarketoCore.onFormRender() - firing');

			const _this = this;
			const options = this.options;
			const formId = this.formId;
			const formCleanup = new MarketoFormCleanup(this.form, form.getFormElem()[0]);

			this.formErrors = new MarketoErrors();

			this.dispatchEvent('marketo_form_load', { form: this.form, form_id: formId });

			formCleanup.destyleMarketoForm(form, this.formElement);
			formCleanup.attachStylingEventListeners(this.formElement);

			const ctaLabel = this.ctaLabel;
			if (ctaLabel !== '') {
				const submitButton = this.formElement.querySelector(`button[type=submit]`);

				submitButton.innerText = ctaLabel || 'Submit';
			}

			if (parseInt(formId) === 530 || parseInt(formId) === 570) {
				this.preferenceCenter();
			} else {
				this.formElement.querySelector('.mktoButton').disabled = true;
			}

			if (this.allowFreemiumEmails) {
				this.invalidDomains = ['@none.com'];
			}

			if (this.comboBoxes !== null) {
				this.handleComboBoxes();
			}

			const accelForms = [411, 554, 1219, 1794, 2115, 2118];

			if (accelForms.includes(parseInt(formId))) {
				console.log('accelForms formId: ', parseInt(formId));
				this.handleTerms(this.form, this.t, this.formErrors);
			}

			if (!!this.PIC_Config) {
				this.PIC_step = 'step_1';
				this.applyPicConfig(this.PIC_Config, this.PIC_step, this.formElement);
				this.applyEventhandlerToInputs(this.formElement);
			}

			const copilotToggle = document.getElementById('marketo-toggle');
			if (this.formNum === 1 && copilotToggle) {
				copilotToggle.style.display = 'flex';
			} else if (this.formNum === 2 && copilotToggle) {
				copilotToggle.style.display = 'none';
			}

			// performs form prefill if the prefill option is set to true
			this.prefillForm(formCleanup, this.shouldFormPrefill && this.formNum === 1);

			if (options.areaOfInterest !== '') {
				this.form.vals({
					Primary_Area_of_Interest__c: options.areaOfInterest,
				});
				formCleanup.checkFields();
			}

			// handles checkboxes
			fixCheckboxValidation(this.form, this.t);
			handleReusableCheckboxes(this.form, this.defaultAgreements, this.formErrors, this.t);

			// handles form validation
			onValidate(this.form, this.formErrors);

			setTimeout(() => {
				prepContactForm(this.form, this.formErrors, this.t);
			}, 100);

			if (this.nextFormId) {
				this.form.onSuccess(() => {
					this.formSuccess(this.form);
					setTimeout(() => {
						if (isToscaTrialForm() && this.toscaTrialData.userExists) {
							// this portion handles resending Marketo verification emails. This is currently not working due to missing Marketo API on our backend.
							// 	if (this.toscaTrialData.verifyEmailRequired) {
							// 		this.toscaTrialFormSubmitReVerify();
							// 		return;
							// 	}

							this.toscaTrialFormSubmitExistingUser();
							return;
						}

						this.formNum = 2;
						this.processSecondForm(this.form);
					}, 1000);

					return false;
				});

				return;
			}

			this.form.onSuccess(() => {
				if (window.location.pathname.indexOf(`/${GlobalConstants.FrontendRoutes.ExploreProducts}/`) !== -1) {
					const cookieName = window.location.pathname.split('/').pop();
					const oneMonthInSeconds = 30 * 24 * 60 * 60;

					document.cookie = `PageVisited_${cookieName}=PageVisited_${cookieName}; max-age = ${oneMonthInSeconds};`;
				}

				this.formSuccess(this.form);

				if (this.redirectURL !== null && this.redirectURL !== undefined) {
					setTimeout(() => {
						window.location = this.redirectURL;
					}, 1000);

					return false;
				}

				if (this.redirectCallback !== null) {
					this.redirectCallback(this.form);
					return false;
				}
			});
		});

		// this check is for loading Recaptcha only for the first form
		if (isToscaTrialForm() && this.formNum === 1) {
			await window.MktoForms2.whenRendered((form) => {
				this.handleToscaUserCheck(form);
			});
		} else if (isTrialForm()) {
			await window.MktoForms2.whenRendered((form) => {
				this.handleqTestUserCheck(form);
			});
		}
	}

	async handleToscaUserCheck(form) {
		const _this = this;
		const formElement = document.querySelector('#mktoForm_411');

		if (formElement) {
			const recapSkip = window.location.search.indexOf('test=true') > -1;

			if (!recapSkip) {
				const submitButton = document.querySelector('.mktoButtonRow');
				// google recaptcha v2 integration for tosca trial forms only
				let recap = document.createElement('div');
				recap.id = 'recap';
				submitButton.insertAdjacentElement('beforebegin', recap);

				const recaptcha = document.getElementById('recap');

				recaptcha.style.display = 'none';

				grecaptcha.render('recap', {
					sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
				});
			}

			document.querySelector('.mktoButton').onclick = async function (e) {
				e.preventDefault();
				let recapResponse;

				if (!recapSkip) {
					const recaptcha = document.getElementById('recap');

					recaptcha.style.display = 'block';
					recapResponse = grecaptcha.getResponse();
				} else {
					recapResponse = 'test';
				}

				if (!recapSkip && recapResponse.length == 0) {
					form.submittable(false);
				} else {
					const response = await trialCheckUser(
						_this.form,
						_this.formErrors,
						_this.invalidDomains,
						_this.validatingEmail,
						_this.toscaTrialData,
						_this.t
					);

					if (!_this.toscaTrialData.verifyEmailRequired) {
						form.submittable(true);

						_this.form.submit();
					} else {
						resendToscaVerificationEmail(_this.toscaTrialData.mlid, _this.form.email).then(({ requestResponse }) => {
							if (requestResponse?.status) {
								const path = window.location.pathname;
								let redirectURL = [`${path}/get-started/`];

								window.location = redirectURL;
							}
						});
					}
				}
			};
		}
	}

	async handleqTestUserCheck(form) {
		const _this = this;

		document.querySelector('.mktoButton').onclick = async function (e) {
			e.preventDefault();

			// const response = await trialCheckUser(
			// 	_this.form,
			// 	_this.formErrors,
			// 	_this.invalidDomains,
			// 	_this.validatingEmail,
			// 	_this.toscaTrialData,
			// 	_this.t
			// );

			_this.form.submit();
		};
	}

	handleComboBoxes() {
		console.log('MarketoCore.handleComboBoxes()');
		if (this.comboBoxOptions === null) {
			console.log('MarketoCore.handleComboBoxes() - no comboBoxOptions');
			return;
		}

		const comboBoxes = this.comboBoxOptions;

		comboBoxes.forEach((comboBox, cbIndex) => {
			console.log('MarketoCore.handleComboBoxes() - iterating - index: ', cbIndex);
			const { label, marketoFieldID, options } = comboBox;
			const fieldName = marketoFieldID;

			const field = document.querySelector(`input[name="${fieldName}"]`);

			if (!field) {
				return;
			}

			const fieldParent = field?.closest('.mktoFormRow');

			const newFieldName = `${fieldName}_select`;

			const existingField = document.querySelector(`#${newFieldName}`);
			if (existingField) {
				console.log(
					`MarketoCore.handleComboBoxes() - found an existing field named ${newFieldName}, not injecting another!`
				);
				return;
			}

			let html = [];
			html.push('<div class="mktoFormAppend">');
			html.push('<div class="mktoFormRow mktoFormRow--append">');
			html.push('<div class="mktoFieldDescriptor mktoFormCol">');
			html.push('<div class="mktoFieldWrap label-up">');
			html.push('<label for="' + newFieldName + '" class="mktoLabel mktoHasWidth" style="">');
			html.push(label);
			html.push('</label>');
			html.push('<select id="' + newFieldName + '" name="' + newFieldName + '" class="mktoField mktoHasWidth">');
			for (let i in options) {
				if (options.hasOwnProperty(i)) {
					html.push(`<option value="${options[i].value}">${options[i].label}</option>`);
				}
			}
			html.push('</select>');
			html.push('</div>');
			html.push('</div>');
			html.push('</div>');
			html.push('</div>');
			html.join(',');
			html = html.join('').trim();

			const formElement = fieldParent?.closest('form');
			const formWrapper = formElement?.parentNode;
			const newSelectRow = document.createElement('div');
			newSelectRow.classList.add('mktoFormRow');

			newSelectRow.innerHTML = html;

			console.log('MarketoCore.handleComboBoxes() - inserting before formElement');
			formWrapper?.insertBefore(newSelectRow, formElement);

			const newSelect = document.querySelector('#' + newFieldName);
			newSelect?.addEventListener('change', function () {
				console.log('MarketoCore.handleComboBoxes() - changed event fired');
				const input = document.querySelector(`input[name="${fieldName}"]`);
				input.value = this.value;
			});
			const event = new Event('change');
			newSelect.dispatchEvent(event);
		});
	}

	handleTerms(form, t, formErrors) {
		const marketingOptInCheckbox = this.marketingOptInCheckbox;
		const termsOptInCheckbox = this.termsOptInCheckbox;

		console.log(
			'MarketoCore.handleTerms()',
			'marketingOptInCheckbox: ',
			marketingOptInCheckbox,
			'termsOptInCheckbox: ',
			termsOptInCheckbox
		);

		const termsText = document.querySelector('.terms-button-text');

		if (termsText !== null) {
			const submitText = document.querySelector('.mktoButton').innerText;

			termsText.innerText = submitText;
		}

		const handleCheckbox = function (checkboxOption, checkboxElement) {
			console.log('MarketoCore.handleTerms() - ', checkboxElement);
			const checkbox = document.querySelector(checkboxElement);

			if (checkbox) {
				if (checkboxOption === 'hide') {
					console.log('MarketoCore.handleTerms() - hide');
					checkbox.checked = false;
					checkbox.closest('.mktoFormRow--optin')?.classList?.add('mktoFormRow--optin--hide');

					return;
				} else if (checkboxOption === 'implicit') {
					console.log('MarketoCore.handleTerms() - implicit');
					checkbox.checked = true;
					checkbox.closest('.mktoFieldWrap')?.classList?.add('mktoFormRow--optin--hide');
					checkbox
						.closest('.mktoFormRow--optin')
						.querySelector('.mktoHtmlText')
						?.classList?.add('mktoHtmlText--nospace');

					return;
				} else {
					console.log('MarketoCore.handleTerms() - return explicit');
					if (checkboxElement === '#Free_Trial_Opt_In__c') {
						checkbox.closest('.mktoLogicalField')?.classList?.add('mktoRequired');
						formErrors.addError('trial_opt_in', 'not yet validated');
						checkbox.addEventListener('change', function () {
							if (this.checked) {
								formErrors.removeError('trial_opt_in');
							} else {
								formErrors.addError('trial_opt_in', 'not yet validated');
							}
						});
						form.onValidate(() => {
							if (!checkbox.checked) {
								let checkboxCheck = form.getFormElem().find(checkboxElement);
								form.showErrorMessage(t('mktoI18n.validationErrors.requiredField'), checkboxCheck);
								checkbox.closest('.mktoRequired')?.classList?.add('mktoInvalid');
							} else {
								checkbox.closest('.mktoRequired')?.classList?.remove('mktoInvalid');
							}
						});
					}
					return;
				}
			}
		};

		handleCheckbox(marketingOptInCheckbox, '#emailOptin');
		handleCheckbox(termsOptInCheckbox, '#Free_Trial_Opt_In__c');
	}

	prefillForm(formCleanup, prefill = true) {
		console.log('MerketoCore.prefillForm() - firing');
		console.log('MerketoCore.prefillForm() - firing with data');
		// short circuit if the prefill option is not set to true
		if (!prefill) {
			return;
		}

		// calls the simpleDTO function to get the prefill data from marketo
		simpleDTOSetup();

		// grabs any addition prefill fields provided by the component
		const defaults = {
			lastLeadSourceContentOffer: this.lastLeadSourceContentOffer, // Persona
			lastLeadSourceCOStage: this.lastLeadSourceCOStage, // Stage
			Last_Lead_Source_Form__c: this.leadSource,
			Original_Lead_Source_Form__c: this.leadSource,
			LastCOSent: this.contentOfferFill(),
			Last_Lead_Source_Content__c: this.contentOfferFill(),
			Original_Lead_Source_Content__c: this.contentOfferFill(),
			lastLeadSourceContentOfferTitle: this.lastLeadSourceContentOfferTitle, // Form Name
			lastLeadSourceInitiative: this.lastLeadSourceInitiative, // Initiative
			lastLeadSourceProduct: this.lastLeadSourceProduct, // Product
			lastLeadSourceAssetType: this.lastLeadSourceAssetType, // Type
			// ! Previously existing values not listed in doc
			originalPPCAdGroup: this.source_ppc_adgroup,
			originalPPCAd: this.source_ppc_ad,
			originalPPCCampaign: this.source_ppc_campaign,
			originalPPCSearchTerm: this.source_ppc_keyword,
			lastPPCAdGroup: this.source_ppc_adgroup,
			lastPPCAd: this.source_ppc_ad,
			lastPPCCampaign: this.source_ppc_campaign,
			lastPPCSearchTerm: this.source_ppc_keyword,
		};

		// small object with args to pass to the prefill function
		const prefillArgs = {
			form: this.form,
			formErrorsObj: this.formErrors,
			formCleanup: formCleanup,
			invalidDomains: this.invalidDomains,
			defaultAgreements: this.defaultAgreements,
			validatingEmail: this.validatingEmail,
			toscaTrialData: this.toscaTrialData,
			t: this.t,
			PIC_Config: this.PIC_Config,
		};

		const contact_details_field = this.formElement.querySelector('input[name=Contact_Me_Details__c]:is([type=hidden])');

		if (contact_details_field) {
			defaults.Contact_Me_Details__c = window.location.href;
		}

		// sets the field values to the prefill data
		this.form.vals(defaults);

		const leadid_param = getUrlParameterByName('leadid');

		if (leadid_param !== '' && parseInt(leadid_param) > 10) {
			this.Data.getData('prefill_fields', null, function (data) {
				let mkt_usr;
				let mkt_obj = JSON.parse(data);
				let status = 'false';

				if (mkt_obj !== null) {
					status = mkt_obj.success;
				}

				if (status === true) {
					let mkt_array = mkt_obj.result;
					mkt_usr = mkt_array[0];
				}

				if (mkt_usr !== undefined) {
					let form_values = {};

					for (let i in this.prefillFields) {
						if (this.prefillFields.hasOwnProperty(i) && mkt_usr.hasOwnProperty(this.prefillFields[i])) {
							form_values[i] = mkt_usr[this.prefillFields[i]];
						}
					}

					prefillCallback(prefillArgs, form_values);
				}
			});
			return;
		}

		if (this.form.getId() === 25) {
			return;
		}

		const DTO = new SimpleDTO({
			dataSrc: `https:${this.marketoUrl}/Data-Transfer-Page-20.html`,
			debug: false,
			messageSource: `https:${this.marketoUrl}`,
			messageTarget: [
				'https://local.tricentis.com:3000',
				'https://fe-develop.tricentis.com',
				'https://fe-test.tricentis.com',
				'https://www.tricentis.com',
				'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com',
				'https://hgsmpndb3wh5ll23vc7g2hbwd.js.wpenginepowered.com'
			],
			mode: 'receive',
			transport: 'message',
			cb: function (instance, mktoFields) {
				DTO.cleanup();
				this.lead_id = mktoFields.lead_id;
				prefillCallback(prefillArgs, mktoFields);
			},
		});

		// Spoofed mkt_usr to make form function without DTO
		// const mkt_usr = {
		// 	id: '8997976',
		// 	FirstName: 'Silas',
		// 	LastName: 'Cundiff',
		// 	Email: 'unique@narwhal.digital',
		// 	formCountTRI: '',
		// 	Company: 'Narwhal.digital LLC',
		// 	Role__c: '',
		// 	Country: 'United States',
		// 	ALM_Tool__c: '',
		// 	TCM_Tool__c: '',
		// 	PostalCode: '',
		// 	optionalPhoneNumber: '',
		// 	Software_Challenges__c: '',
		// 	Timeframe__c: '',
		// 	Phone: '555-555-5555',
		// 	Active_Project__c: '',
		// 	Best_Method_of_Contact__c: '',
		// 	Best_Time_to_Contact__c: '',
		// 	Reason_for_contacting__c: '',
		// 	Unsubscribed: '',
		// 	Research_Thought_Leadership__c: '',
		// 	Live_Events__c: '',
		// 	Product_Updates__c: '',
		// 	Insider_Newsletter__c: '',
		// 	Interested_in_Learning_About__c: '',
		// 	Academy_Updates__c: '',
		// 	Partner_Updates__c: '',
		// 	Customer_Communications__c: '',
		// 	primaryAreaofInterestCompanion: '',
		// 	Salutation: '',
		// 	Conversation_Track__c: '',
		// 	Lead_Qualification_Stage__c: '',
		// };
		// this.lead_id = mkt_usr.lead_id;
		// prefillCallback(prefillArgs, mkt_usr);
	}

	/**
	 * sets formData to contain form field values
	 * @param {object} fields
	 */
	collectData(fields) {
		for (let item in fields) {
			this.formData[item] = fields[item];
		}
	}

	/**
	 * Setter for contentOffer
	 * @returns {string}
	 */
	contentOfferFill() {
		if (this.contentOffer === '') {
			return 'None';
		}
		return this.contentOffer;
	}

	addLanguageToUrl(url) {
		const supportedLanguages = ['de', 'fr'];
		supportedLanguages.forEach((lang) => {
			if (window.location.pathname.indexOf(`/${lang}/`) !== -1) {
				url.unshift(`/${lang}`);
			}
		});

		return url;
	}

	campaignCheck() {
		let campaign = 'None';

		if (this.Data.getParameter('utm_campaign') !== '') {
			campaign = this.Data.getParameter('utm_campaign');
		}
		return campaign;
	}

	// Logic for the Progressive Information Collection
	getActiveInputs(config, picStep) {
		let hasReachedPicStep = false;
		return Object.keys(config).reduce((acc, current) => {
			if (!hasReachedPicStep) {
				acc = acc.concat(config[current]);
				if (current === picStep) hasReachedPicStep = true;
			}

			return acc;
		}, []);
	}
	applyPicConfig(config, picStep = this.PIC_step, formElement = this.formElement) {
		const inputs = getVisibleInputs(formElement);
		const activeInputNames = this.getActiveInputs(config, picStep);

		inputs.forEach((input) => {
			if (!activeInputNames.includes(input.name) && !activeInputNames.includes('*'))
				input.parentNode.classList.add('hidden');
			else input.parentNode.classList.remove('hidden');
		});

		dataLayer.push({ event: this.PIC_step });
		// Uncomment for debugging
		// console.log(dataLayer);
	}
	applyEventhandlerToInputs(formElement = this.formElement) {
		const inputs = getVisibleInputs(formElement);
		inputs.forEach((input) => {
			input.addEventListener('change', (event) => {
				this.handleMktoInputChange(event.target);
			});
		});
	}

	handleMktoInputChange({ name, value }) {
		const inputIds = this.PIC_Config[this.PIC_step].reduce((acc, fieldName) => {
			if (fieldName !== '*') acc.push(`#${fieldName}`);
			return acc;
		}, []);

		if (inputIds.length) {
			const inputValues = [];
			this.formElement.querySelectorAll(inputIds.join(',')).forEach(({ value }) => inputValues.push(value));
			if (inputValues.every((value) => value.length > 0)) {
				const [step, num] = this.PIC_step.split('_');
				this.PIC_step = [step, parseInt(num) + 1].join('_');

				this.applyPicConfig(this.PIC_Config, this.PIC_step);
			}
		}
	}

	// Builds the trial forms additional fields
	prepTrialForm(form) {
		this.trialForm = form;

		if (document.querySelector('#mktoAppend')) {
			return;
		}

		const preHTML = [
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<input id="fake-email" name="fake-email" maxlength="255" type="email" class="mktoField mktoTextField mktoHasWidth" disabled value="Username: ' +
				this.formData.Email +
				'" style="opacity: 0.4">',
			'</div>',
			'</div>',
			'</div>',
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol mktoUsername mkto-input-tooltip">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="Domain" class="mktoLabel mktoHasWidth label-down">',
			'<div class="mktoAsterix">*</div>',
			this.t('mktoI18n.qtestTrial.domainLabel') + ':',
			'</label>',
			'<input id="Domain" name="Domain" maxlength="255" type="text" class="mktoField mktoTextField mktoHasWidth mktoRequired">',
			'<span class="mktoFieldDescription">.qtestnet.com</span>',
			'<span class="mktoValidation"></span>',
			'<div class="mkto-tooltip__content mkto-tooltip-bottom">' + this.t('mktoI18n.qtestTrial.domainHelp') + '</div>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol mkto-input-tooltip">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="Password" class="mktoLabel mktoHasWidth label-down">',
			'<div class="mktoAsterix">*</div>',
			this.t('mktoI18n.qtestTrial.passwordLabel') + ':',
			'</label>',
			'<input id="Password" name="Password" maxlength="255" type="password" class="mktoField mktoTextField mktoHasWidth mktoRequired">',
			'<span class="mktoValidation"></span>',
			'<div class="mkto-tooltip__content mkto-tooltip-bottom">' + this.t('mktoI18n.qtestTrial.passwordHelp') + '</div>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol mkto-input-tooltip">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="PasswordConfirm" class="mktoLabel mktoHasWidth label-down">',
			'<div class="mktoAsterix">*</div>',
			this.t('mktoI18n.toscaTrial.passwordConfirmLabel') + ':',
			'</label>',
			'<input id="PasswordConfirm" name="PasswordConfirm" maxlength="255" type="password" class="mktoField mktoTextField mktoHasWidth mktoRequired">',
			'<span class="mktoValidation"></span>',
			'<div class="mkto-tooltip__content mkto-tooltip-bottom">' + this.t('mktoI18n.qtestTrial.passwordHelp') + '</div>',
			'</div>',
			'</div>',
			'</div>',
		].join('\n');

		let formEl = this.trialForm.getFormElem()[0];
		let formWrapper = formEl.parentNode;
		let newEl = document.createElement('div');
		newEl.classList.add('mktoForm');
		newEl.classList.add('secondForm');
		newEl.id = 'mktoAppend';

		newEl.innerHTML = preHTML.trim();

		if (!formWrapper) {
			return;
		}

		formWrapper.insertBefore(newEl, formEl);

		this.formErrors.addError('domain', 'not yet validated');
		this.formErrors.addError('password', 'not yet validated');

		let noticeText = this.t('mktoI18n.qtestTrial.noticeText').replace(
			'%s',
			'<a href="' +
				this.t('mktoI18n.qtestTrial.privacyPolicyUrl') +
				'" target="_blank">' +
				this.t('mktoI18n.qtestTrial.privacyPolicyText') +
				'</a>'
		);

		let notice = ['<div class="mkto-notice">', '<p>' + noticeText + '</p>', '</div>'].join('\n');

		const qTESTDataStorageLocation = document.querySelector('#qTESTDataStorageLocation');
		if (qTESTDataStorageLocation) {
			qTESTDataStorageLocation.insertAdjacentHTML('afterend', notice);
		}

		this.trialFormEvents();

		this.trialForm.vals({ Email: this.formData.Email });
	}

	// builds the tosca trial forms additional fields
	async prepToscaTrialForm(form) {
		this.trialForm = form;
		const formCleanup = this.formCleanup;

		if (document.querySelector('#mktoAppendTosca')) {
			return;
		}

		var preHTML = [
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="fake-email" class="mktoLabel mktoHasWidth">',
			this.t('mktoI18n.toscaTrial.emailLabel'),
			'</label>',
			'<input id="fake-email" name="fake-email" maxlength="255" type="email" class="mktoField mktoTextField mktoHasWidth" disabled value="' +
				this.formData.Email +
				'" style="opacity: 0.4">',
			'</div>',
			'</div>',
			'</div>',
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="Password" class="mktoLabel mktoHasWidth">',
			'<div class="mktoAsterix">*</div>',
			this.t('mktoI18n.toscaTrial.passwordLabel'),
			'</label>',
			'<input id="Password" name="Password" maxlength="255" type="password" class="mktoField mktoTextField mktoHasWidth mktoRequired">',
			'<span class="mktoFieldHelp">' + this.t('mktoI18n.toscaTrial.passwordHelp') + '</span>',
			'<span class="mktoValidation"></span>',
			'</div>',
			'</div>',
			'</div>',
			'<div class="mktoFormRow">',
			'<div class="mktoFieldDescriptor mktoFormCol">',
			'<div class="mktoFieldWrap mktoRequiredField">',
			'<label for="PasswordConfirmation" class="mktoLabel mktoHasWidth">',
			'<div class="mktoAsterix">*</div>',
			this.t('mktoI18n.toscaTrial.passwordConfirmLabel'),
			'</label>',
			'<input id="PasswordConfirmation" name="PasswordConfirmation" maxlength="255" type="password" class="mktoField mktoTextField mktoHasWidth mktoRequired">',
			'<span class="mktoValidation"></span>',
			'</div>',
			'</div>',
			'</div>',
		].join('\n');

		// Create the new form and add it to the DOM
		let formEl = this.trialForm.getFormElem()[0];
		let formWrapper = formEl.parentNode;
		let newEl = document.createElement('div');
		newEl.classList.add('mktoForm');
		newEl.id = 'mktoAppendTosca';

		newEl.innerHTML = preHTML.trim();

		if (!formWrapper) {
			return;
		}

		formWrapper.insertBefore(newEl, formEl);

		this.formErrors.addError('password', 'not yet validated');
		this.formErrors.addError('passwordConfirmation', 'passwords do not match');

		const password = document.querySelector('#Password');
		const passwordConfirmation = document.querySelector('#PasswordConfirmation');

		this.toscaTrialFormEvents(password, passwordConfirmation);

		document.querySelectorAll('.mktoField').forEach(function (field) {
			field.addEventListener('blur', function () {
				formCleanup.checkFields();
			});
			field.addEventListener('focus', function (e) {
				formCleanup.labelUp(e.target);
			});
		});

		this.trialForm.vals({ Email: this.formData.Email });

		setTimeout(() => {
			this.toggleSubmitButtonStatus('.mktoButtonRow .mktoButton', this.formErrors.errors);
		}, 500);
	}

	// attaches the events to the trial form
	trialFormEvents = function () {
		const domain = document.querySelector('#Domain');
		const password = document.querySelector('#Password');
		const passwordConfirm = document.querySelector('#PasswordConfirm');

		// For qTest trial form, the storage location should be selected.
		// If not selected, the form should not be submittable.
		// If the form is not qTest trial form, the form should be submittable.
		const qTestStorageLocation = document.querySelector('#qTESTDataStorageLocation');

		if (!domain || !password || !passwordConfirm) {
			return;
		}

		domain.addEventListener('change', () => {
			this.validateDomain();
		});
		domain.addEventListener('blur', () => {
			this.validateDomain();
		});
		domain.addEventListener('focusin', (event) => {
			this.formCleanup.labelUp(event.target);
		});

		password.addEventListener('change', () => {
			this.validatePassword();
		});
		password.addEventListener('blur', () => {
			this.validatePassword();
		});
		password.addEventListener('focusin', (event) => {
			this.formCleanup.labelUp(event.target);
		});

		passwordConfirm.addEventListener('change', () => {
			this.validatePassword();
		});
		passwordConfirm.addEventListener('blur', () => {
			this.validatePassword();
		});

		passwordConfirm.addEventListener('focusin', (event) => {
			this.formCleanup.labelUp(event.target);
		});

		const formElement = this.trialForm.getFormElem()[0];

		formElement.removeEventListener('submit', function () {});
		formElement.addEventListener('submit', (e) => {
			const isQtestStorageSelected = qTestStorageLocation ? !!qTestStorageLocation.value : true;
			if (domain.value && password.value.length && passwordConfirm.value === password.value && isQtestStorageSelected) {
				this.trialFormSubmit(e);
			} else {
				domain.dispatchEvent(new Event('blur'));
				password.dispatchEvent(new Event('blur'));
			}
		});

		const submitButton = document.querySelector('.mktoButtonRow button');

		submitButton.removeEventListener('click', () => {});
		submitButton.addEventListener('click', (e) => {
			const isQtestStorageSelected = qTestStorageLocation ? !!qTestStorageLocation.value : true;
			if (domain.value && password.value.length && passwordConfirm.value === password.value && isQtestStorageSelected) {
				this.trialFormSubmit(e);
			} else {
				domain.dispatchEvent(new Event('blur'));
				password.dispatchEvent(new Event('blur'));
			}
		});
	};

	// attaches the events to the tosca trial form
	toscaTrialFormEvents(password, passwordConfirmation) {
		if (password === null || passwordConfirmation === null) {
			return;
		}

		const buttonSelector = '.mktoButtonRow .mktoButton';

		password.addEventListener('input', () => {
			this.validateToscaPassword();
			this.toggleSubmitButtonStatus(buttonSelector, this.formErrors.errors);
		});
		password.addEventListener('blur', () => {
			this.validateToscaPassword();
			this.toggleSubmitButtonStatus(buttonSelector, this.formErrors.errors);
		});

		passwordConfirmation.addEventListener('input', () => {
			this.validateToscaPassword();
			this.toggleSubmitButtonStatus(buttonSelector, this.formErrors.errors);
		});
		passwordConfirmation.addEventListener('blur', () => {
			this.validateToscaPassword();
			this.toggleSubmitButtonStatus(buttonSelector, this.formErrors.errors);
		});

		const formElement = this.trialForm.getFormElem()[0];

		formElement.removeEventListener('submit', () => {});
		formElement.addEventListener('submit', (e) => {
			this.toscaTrialFormSubmit(e);
		});

		const submitButton = document.querySelector('.mktoButtonRow .mktoButton');

		submitButton.removeEventListener('click', () => {});
		submitButton.addEventListener('click', (e) => {
			this.toscaTrialFormSubmit(e);
		});
	}

	// changes how the default form submission behaves for the trial form
	trialFormSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		clearTimeout(trialTimer);
		const trialTimer = setTimeout(() => {
			showProcessingButton(this.t);

			this.trialForm.validate();
			if (!this.trialForm.submittable()) {
				hideProcessingButton(this.t);
			}
			this.collectData(this.trialForm.getValues());
			this.processTrialForm();
		}, 250);
		return false;
	}

	// changes how the default form submission behaves for the tosca trial form
	toscaTrialFormSubmit(e) {
		const trialForm = this.trialForm;

		e.preventDefault();
		e.stopPropagation();
		clearTimeout(this.trialTimer);
		this.trialTimer = setTimeout(
			() => {
				showProcessingButton(this.t);
				trialForm.validate();

				this.collectData(trialForm.getValues());
				this.processToscaTrialForm();
			},
			250,
			trialForm
		);
		return false;
	}

	// processes data to be sent after the trial form is submitted
	processTrialForm() {
		console.log('MKTO:: processTrialForm()');
		this.formData.Username = document.querySelector('#Domain').value;
		this.formData.Password = document.querySelector('#Password').value;
		this.formData.Email = this.formData.Email || document.querySelector('#fake-email').value;

		if (typeof this.formData.Industry == 'undefined') {
			this.formData.Industry = '';
		}

		if (typeof this.formData.TeamSize == 'undefined') {
			this.formData.TeamSize = '';
		}

		if (typeof this.formData.CompanySize == 'undefined') {
			this.formData.CompanySize = '';
		}

		let storageLocation = this.formData.qTESTDataStorageLocation;
		let clusterId = 13;

		if (storageLocation.toLowerCase() === 'europe') {
			clusterId = 6;
		}
		if (storageLocation.toLowerCase() === 'australia') {
			clusterId = 8;
		}

		// payload for the below post request
		const leadData = {
			contactFName: this.formData.FirstName,
			contactLName: this.formData.LastName,
			username: this.formData.Email,
			phone: this.formData.Phone,
			password: this.formData.Password,
			companyName: this.formData.Company,
			urlPrefix: this.formData.Username,
			testTeamSize: this.formData.TeamSize,
			companySize: this.formData.CompanySize,
			industry: this.formData.Industry,
			cid: '',
			campaignId: '',
			companyLocation: this.formData.Country,
			clusterId: clusterId,
			isNotSendWelcomeEmail: true,
		};

		let redirectURL = redirectURLOptions.default;
		console.log(`MKTO:: processTrialForm() - redirectUrl setting to default: (${redirectURL}`);

		if (isAcademyForm()) {
			redirectURL = redirectURLOptions.academyForm;
			console.log(`MKTO:: processTrialForm() - isAcademyForm() redirectUrl setting to (${redirectURL}`);
		}

		if (isqtest90Form()) {
			if (env == 'development') {
				redirectURL = redirectURLOptions.qTest90FormDevMode;
			} else {
				redirectURL = redirectURLOptions.qTest90Form;
			}

			console.log(`MKTO:: processTrialForm() - isqtest90Form() redirectUrl setting to (${redirectURL}`);
		}

		if (isqtestTpstForm()) {
			redirectURL = redirectURLOptions.qtestTpstForm;
			console.log(`MKTO:: processTrialForm() - isqtestTpstForm() redirectUrl setting to (${redirectURL}`);
		}

		if (isqtestsea6Form()) {
			redirectURL = redirectURLOptions.qtestsea6Form;
			console.log(`MKTO:: processTrialForm() - isqtestsea6Form() redirectUrl setting to (${redirectURL}`);
		}

		if (isToscaTrialForm()) {
			if (env == 'development') {
				redirectURL = redirectURLOptions.toscaTrialFormDevMode;
			} else {
				redirectURL = redirectURLOptions.toscaTrialForm;
			}

			console.log(`MKTO:: processTrialForm() - isToscaTrialForm() redirectUrl setting to (${redirectURL}`);
		}

		redirectURL = this.addLanguageToUrl(redirectURL);

		this.trialRedirectURL = redirectURL.join('');
		console.log(`MKTO:: processTrialForm() - trialRedirectURL finally set to: ${this.trialRedirectURL}`);

		this.trialForm.submit();
		// customFetch(marketoBackendPath + 'qas_form_signup_trial', 'POST', leadData).catch((error) => {
		// 	console.log(error);
		// });
		fetch(`${formApi}${GlobalConstants.FrontendRoutes.qTestSignupTrial}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			dataType: 'json',
			body: JSON.stringify(leadData),
		})
			.then((res) => {
				console.log('First then: ', res);
				return res.json();
			})
			.then((res) => {
				const { qasResponse, qbeoResponse } = res;
				console.log('Second then: ', res, qasResponse, qbeoResponse);
			});
	}

	// processes data to be sent after the tosca trial form is submitted
	processToscaTrialForm() {
		this.formData.Password = document.querySelector('#Password').value;
		this.formData.PasswordConfirmation = document.querySelector('#PasswordConfirmation').value;
		this.formData.Email = this.formData.Email || document.querySelector('#fake-email').value;

		let lead_data = {
			email: this.formData.Email,
			salutation: this.formData.Salutation,
			firstName: this.formData.FirstName,
			lastName: this.formData.LastName,
			country: this.formData.Country,
			password: this.formData.Password,
			passwordConfirmation: this.formData.PasswordConfirmation,
		};
		const path = window.location.pathname;

		let redirectURL = [`${path}/get-started/`];

		redirectURL = this.addLanguageToUrl(redirectURL);

		this.trialRedirectURL = redirectURL.join('');

		// this.trialRedirectURL = redirectURL;

		this.trialForm.submit();

		const body = {
			path: path,
			...lead_data,
		};

		const response = fetch(`${formApi}/${GlobalConstants.FrontendRoutes.ToscaCreateUser}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			dataType: 'json',
			body: JSON.stringify(body),
		})
			.then((response) => {
				// uncomment for debugging
				// console.log('processToscaTrialForm', response);
				if (response.status === 200) {
					this.processTrialFormRedirect();
					return;
				}

				showSubmitButtonError(this.t('mktoI18n.validationErrors.unexpected'));
				hideProcessingButton(this.t);
			})
			.catch((error) => {
				hideProcessingButton(this.t);
				console.error(error);
			});
	}

	// used to check if the "domain" the user entered is valid
	// also checks the db for the domain to see if it already exists
	validateDomain() {
		const formCleanup = this.formCleanup;
		const element = document.querySelector('#Domain');
		let trialDomain = element.value;
		let messageElement = element.parentNode.querySelector('.mktoValidation');

		if (trialDomain) formCleanup.labelUp(element);
		else formCleanup.labelDown(element);

		const alphanumericRegex = /^[0-9a-zA-Z]+$/;

		if (alphanumericRegex.test(trialDomain) === false) {
			var alphanumericMessage = this.t('mktoI18n.validationErrors.onlyAlphaNumeric');
			messageElement.classList.remove('valid');
			messageElement.classList.add('invalid');
			messageElement.innerHTML = alphanumericMessage;
			this.formErrors.addError('domain', alphanumericMessage);
			return;
		}

		fetch(`${formApi}/${GlobalConstants.FrontendRoutes.qTestValidateDomain}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			dataType: 'json',
			body: JSON.stringify({
				field: 'subdomain',
				value: trialDomain,
			}),
		})
			.then((res) => res.json())
			.then((validation) => {
				let message = '';

				switch (validation.code) {
					case 2600:
						message = this.t('mktoI18n.qtestTrial.domainValidation.noSubdomains');
						break;
					case 1303:
						message = this.t('mktoI18n.qtestTrial.domainValidation.maxLength').replace('%d', '15');
						break;
					case 1304:
						message = this.t('mktoI18n.qtestTrial.domainValidation.minLength').replace('%d', '2');
						break;
					case 1302:
						message = this.t('mktoI18n.qtestTrial.domainValidation.urlTaken');
						break;
					// @TODO: remove null check when the API will return proper validation code.
					case null:
						if (validation.value.length > 15) {
							message = this.t('mktoI18n.qtestTrial.domainValidation.maxLength').replace('%d', '15');
							break;
						} else if (validation.value.length < 2) {
							message = this.t('mktoI18n.qtestTrial.domainValidation.minLength').replace('%d', '2');
							break;
						}
					default:
						message = this.t('mktoI18n.qtestTrial.domainValidation.urlInvalid');
						break;
				}

				if (validation.valid) {
					message = this.t('mktoI18n.qtestTrial.domainValidation.success');
					messageElement.classList.remove('invalid');
					messageElement.classList.add('valid');
					this.formErrors.removeError('domain');
				} else {
					messageElement.classList.remove('valid');
					messageElement.classList.add('invalid');
					this.formErrors.addError('domain', message);
				}

				messageElement.innerHTML = message;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// used to check if the password the user entered is valid
	validatePassword() {
		const formCleanup = this.formCleanup;
		const element = document.querySelector('#Password');
		const passwordConfirmationField = document.querySelector('#PasswordConfirm');
		let passwordConfirmMessageEl = passwordConfirmationField.parentNode.querySelector('.mktoValidation');

		let password = element.value;
		let psswordConfirm = passwordConfirmationField.value;
		let messageElement = element.parentNode.querySelector('.mktoValidation');
		let message = '';
		let confirmationPwMessage = '';
		let valid = false;

		if (password) formCleanup.labelUp(element);
		else formCleanup.labelDown(element);

		if (psswordConfirm) formCleanup.labelUp(passwordConfirmMessageEl);
		else formCleanup.labelDown(passwordConfirmMessageEl);

		if (password === '') {
			message = 'This field is required';
			valid = false;
		} else if (password.length < 8) {
			message = this.t('mktoI18n.validationErrors.minLength').replace('%d', '8');
			valid = false;
		} else if (password.length > 16) {
			message = this.t('mktoI18n.validationErrors.maxLength').replace('%d', '16');
			valid = false;
		} else if (!validatePass(password)) {
			message = this.t('mktoI18n.validationErrors.includeAlphaNum');
			valid = false;
		} else {
			//we're valid
			message = '';
			valid = true;
		}

		if (valid === true) {
			messageElement.classList.remove('invalid');
			messageElement.classList.add('valid');
			this.formErrors.removeError('password');

			if (password !== psswordConfirm) {
				confirmationPwMessage = this.t('mktoI18n.validationErrors.passwordMismatch');
				passwordConfirmMessageEl.classList.remove('valid');
				passwordConfirmMessageEl.classList.add('invalid');
				this.formErrors.addError('PasswordConfirm', confirmationPwMessage);
				this.trialFormValidation.password = true;
			} else {
				confirmationPwMessage = '';
				passwordConfirmMessageEl.classList.add('valid');
				passwordConfirmMessageEl.classList.remove('invalid');
				this.formErrors.removeError('PasswordConfirm');
			}
		} else {
			this.trialFormValidation.password = false;
			messageElement.classList.remove('valid');
			messageElement.classList.add('invalid');
			this.formErrors.removeError('email');
			this.formErrors.addError('password', message);
		}

		messageElement.innerHTML = message;
		passwordConfirmMessageEl.innerHTML = confirmationPwMessage;
	}

	processTrialFormRedirect() {
		window.location = this.trialRedirectURL;
	}

	// used to check if the tosca password the user entered is valid
	validateToscaPassword() {
		const trialFormValidation = this.trialFormValidation;
		const formErrors = this.formErrors;

		const passwordField = document.querySelector('#Password');
		const passwordConfirmationField = document.querySelector('#PasswordConfirmation');

		if (!passwordField || !passwordConfirmationField) {
			return;
		}

		let password = passwordField.value;

		let passwordConfirmation = passwordConfirmationField.value;

		let passwordMessageElement = passwordField.parentNode.querySelector('.mktoValidation');

		let passwordConfirmMessageEl = passwordConfirmationField.parentNode.querySelector('.mktoValidation');

		let message = '';
		let confirmationPwMessage = '';
		let valid = false;

		if (password === '') {
			message = this.t('mktoI18n.validationErrors.requiredField');
			valid = false;
		} else if (password.length < 8) {
			message = this.t('mktoI18n.validationErrors.minLength').replace('%d', '8');
			valid = false;
		} else if (password.length > 64) {
			message = this.t('mktoI18n.validationErrors.maxLength').replace('%d', '64');
			valid = false;
		} else if (!validatePassUpperLowerAndNumber(password)) {
			message = this.t('mktoI18n.validationErrors.includeULAlphaNum');
			valid = false;
		} else if (!validateToscaSpecial(password)) {
			message = this.t('mktoI18n.validationErrors.invalidChar').replace('%s', '!@#$%^&*');
			valid = false;
		} else {
			message = this.t('mktoI18n.validationErrors.greatPassRemember');
			valid = true;
		}

		if (valid === true) {
			passwordMessageElement.classList.remove('invalid');
			passwordMessageElement.classList.add('valid');

			formErrors.removeError('password');

			if (password !== passwordConfirmation) {
				confirmationPwMessage = this.t('mktoI18n.validationErrors.passwordMismatch');
				passwordConfirmMessageEl.classList.remove('valid');
				passwordConfirmMessageEl.classList.add('invalid');
				formErrors.addError('passwordConfirmation', confirmationPwMessage);
				trialFormValidation.password = true;
			} else {
				confirmationPwMessage = '';
				passwordConfirmMessageEl.classList.add('valid');
				passwordConfirmMessageEl.classList.remove('invalid');
				formErrors.removeError('passwordConfirmation');
			}
		} else {
			trialFormValidation.password = false;
			passwordMessageElement.classList.remove('valid');
			passwordMessageElement.classList.add('invalid');
			formErrors.removeError('email');
			formErrors.addError('password', message);
		}

		passwordMessageElement.innerHTML = message;
		passwordConfirmMessageEl.innerHTML = confirmationPwMessage;
	}

	/**
	 * Disables or enabled a button based on error list
	 *
	 * @param {String} selector
	 * @param {MarketoErrors} errors
	 *
	 * @returns {void}
	 */
	toggleSubmitButtonStatus(selector, errors) {
		const element = document.querySelector(selector);
		if (!element) return;

		var hasErrors = Object.keys(errors).length > 0;
		if (hasErrors) element.disabled = true;
		else element.disabled = false;
	}

	// this form is for email preferences. I wasn't sure if it was going to be used still
	// but it was a fairly short functions, so I ported it.
	preferenceCenter() {
		this.invalidDomains = ['none.com'];

		let fields = document.querySelectorAll(
			'input[name=Research_Thought_Leadership__c], input[name=Academy_Updates__c], input[name=Live_Events__c], input[name=Partner_Updates__c], input[name=Product_Updates__c], input[name=Customer_Communications__c], input[name=Insider_Newsletter__c], input[name=emailSuspend90Days], input[name=LblUnsubscribed]'
		);

		fields.forEach((field) => {
			if (field.id !== '#emailSuspend90Days' || field.id !== '#LblUnsubscribed') {
				field.closest('.mktoFieldWrap').classList.add('mktoPreference');
			}
		});

		document.querySelector('input[name=Unsubscribed]').addEventListener('change', function () {
			if (this.checked) {
				fields.forEach(function (field) {
					field.checked = false;
				});

				fields.closest('.mktoFormCol').classList.add('disabled');
			} else {
				fields.closest('.mktoFormCol').classList.remove('disabled');
			}
		});
	}

	// used to load the second form for pages with a multi-step form.
	async processSecondForm(form) {
		this.setFormObj(form);

		form.getFormElem()[0].remove();

		const createFormObj = async (form) => {
			try {
				this.form = form;
				this.formElement = await form.getFormElem()[0];
			} catch (err) {
				return console.log(
					'Error loading form: this is most likely caused by a missing or invalid Marketo form ID \n',
					err
				);
			}
		};

		await window.MktoForms2.loadForm(this.marketoUrl, this.marketoScriptId, this.nextFormId, createFormObj).whenReady(
			(form) => {
				this.formCleanup = new MarketoFormCleanup(form, this.formElement);
				this.formErrors = new MarketoErrors();

				this.formCleanup.destyleMarketoForm(form, this.formElement);
				this.formCleanup.attachStylingEventListeners(this.formElement);

				if (isTrialForm()) {
					setTimeout(
						() => {
							this.prepTrialForm(form);
							hideProcessingButton(this.t);
						},
						100,
						form
					);
				} else if (isToscaTrialForm()) {
					setTimeout(
						() => {
							this.prepToscaTrialForm(form);
							hideProcessingButton(this.t);
						},
						100,
						form
					);
				}

				onValidate(form, this.formErrors);

				form.onSuccess(() => {
					console.log('MKTO:: processSecondForm.onSuccess()');
					this.formSuccess(form);

					if (isTrialForm()) {
						console.log(
							'MKTO:: processSecondForm.onSuccess() - isTrialForm() true, calling processTrialFormRedirect()'
						);
						this.processTrialFormRedirect();

						return false;
					}

					if (isToscaTrialForm()) {
						console.log(
							'MKTO:: processSecondForm.onSuccess() - isToscaTrialForm() true, calling processTrialFormRedirect()'
						);
						this.processTrialFormRedirect();

						return false;
					}

					console.log('MKTO:: processSecondForm.onSuccess() - no redirect action taken, returning with no redirect.');
				});

				if (isAcademyForm()) {
					form.vals({ Trial_Type__c: 'Academy' });
				}
			}
		);
	}

	// called when the form is successfully submitted.
	formSuccess(form) {
		this.dispatchEvent('marketo_form_success', { form: form, form_id: this.formId, lead_id: this.lead_id });

		this.Data.clearData('prefill_fields');
		const values = form.getValues();

		this.collectData(values);
	}

	/**
	 * Creates a custom event then dispatches it.
	 * @param {string} eventName
	 * @param {object} args
	 * @param {HTMLElement} element - defaults to the window if no element is provided
	 */
	dispatchEvent(eventName, args, element = window) {
		const event = new CustomEvent(eventName, {
			detail: args,
			bubbles: true,
			cancelable: true,
		});

		element.dispatchEvent(event);
	}

	async toscaTrialFormSubmitExistingUser() {
		const path = window.location.pathname;
		const body = {
			path: path,
			email: this.formData.Email,
		};

		await fetch(`${formApi}/${GlobalConstants.FrontendRoutes.ToscaStartTrial}`, {
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
				// console.log('toscaTrialFormSubmitExistingUser tosca-start-trial response: ', response);

				if (response.requestResponse.status) {
					let trialRedirect = [`${path}/next-steps/`];

					trialRedirect = this.addLanguageToUrl(trialRedirect);
					this.trialRedirectURL = trialRedirect.join('');
					this.processTrialFormRedirect();
					return;
				} else {
					showSubmitButtonError(this.t('mktoI18n.toscaTrial.errorStartingTrial'));
				}
			})
			.catch((error) => {
				showSubmitButtonError(this.t('mktoI18n.toscaTrial.errorStartingTrial'));
				console.log('ServerCommunicationError: ' + error);
			});
	}

	toscaTrialFormSubmitReVerify() {
		customFetch(marketoBackendPath + 'tosca-resend-verification', 'POST', {
			marketo_lead_id: this.toscaTrialData.mlid,
		})
			.then((response) => {
				if (response.status === true) {
					const path = window.location.pathname;

					let trialRedirect = [`${path}/get-started/`];

					trialRedirect = this.addLanguageToUrl(trialRedirect);

					this.trialRedirectURL = trialRedirect.join('');
					this.processTrialFormRedirect();
					return;
				}
				showSubmitButtonError(this.t('mktoI18n.toscaTrial.errorSendingEmail'));
			})
			.catch((error) => {
				showSubmitButtonError(this.t('mktoI18n.toscaTrial.errorSendingEmail'));
				console.log('ServerCommunicationError: ' + error);
			});
	}
}

export default MarketoCore;
