import { getVisibleInputs } from './utils';

class MarketoFormCleanup {
	constructor(form, formElement) {
		this.form = form;
		this.formElement = formElement;
		this.checkFields();
		this.cleanSelects();

		const checkboxListWrapper = document.querySelectorAll('.mktoCheckboxList');
		const checkboxlistParents = checkboxListWrapper.parentNode;
		// Check this if for execution. The `checkboxlistParents` will  always be `undefined` because `parentNode` is not a property of `NodeList` object (it should be iterated to access the actual nodes).
		if (checkboxlistParents) {
			checkboxlistParents.classList.add('checkbox-list');
			checkboxlistParents.closest('.mktoFormRow').classList.add('mktoFormRow--checkboxes');

			checkboxlistParents.forEach((checkboxlistParent) => {
				const labelText = checkboxlistParent.querySelector('.mktoLabel').innerHTML;
				if (labelText.length > 2) {
					checkboxlistParent.closest('.mktoFormRow').classList.add('mktoFormRow--preference');
				}
			});
		}

		checkboxListWrapper.forEach((checkboxlist) => {
			const checkboxes = checkboxlist.querySelectorAll('input[type="checkbox"]')
			if (checkboxes.length > 1) {
				checkboxlist.closest('.mktoFormRow').classList.add('mktoFormRow--checkboxes_group');
			}
		});

		const labels = document.querySelectorAll('.mktoLabel');
		labels.forEach((label) => {
			let html = label.innerHTML;
			let newHTML = html.replace(/\\n/g, '<br />');

			if (newHTML !== html) {
				label.innerHTML = newHTML;
			}
		});

		const mktoClear = document.querySelectorAll('.mktoClear');
		if (mktoClear) {
			mktoClear.forEach((element) => {
				element.remove();
			});
		}

		const optinCheckboxes = document.querySelectorAll('#emailOptin, #partnerOptin, #testingHeroesUpdates, #Free_Trial_Opt_In__c, .optin-checkbox');
		if (optinCheckboxes) {
			optinCheckboxes.forEach((checkbox) => {
				checkbox.closest('.mktoFormRow')?.classList?.add('mktoFormRow--optin');
				checkbox.closest('.mktoFieldWrap').classList.add('mktoRequiredField');

				if (checkbox.id === 'partnerOptin') {
					checkbox.closest('.mktoFormRow')?.classList?.add('mktoFormRow--secOptin');
				}
			});
		}
	}

	checkFields() {
		const visibleFormFields = this.formElement.querySelectorAll('.mktoField:not([type="hidden"])');
		visibleFormFields.forEach((field) => {
			field.value === '' ? this.labelDown(field) : this.labelUp(field);
		});
	}

	labelDown(field) {
		const label = field.parentNode.querySelector('.mktoLabel');
		if (!label || field.value !== '') {
			return;
		}
		label.classList.remove('label-up');
		label.classList.add('label-down');
	}

	labelUp(field) {
		const label = field.parentNode.querySelector('.mktoLabel');
		if (!label) {
			return;
		}
		label.classList.remove('label-down');
		label.classList.add('label-up');
	}

	cleanSelects() {
		const selectEmptyOption = this.formElement.querySelectorAll('select.mktoField option[value=""]');
		selectEmptyOption.forEach((element) => {
			if (element) {
				element.innerHTML = '';
			}
		});
	}

	multiSelects() {
		const selectMultiOption = this.formElement.querySelectorAll('select.mktoField[multiple]:not(.mkto-active)');

		selectMultiOption.forEach((element) => {
			element.addClass('mkto-active');

			const row = element.parentNode;

			row.addClass('mktoFormRow--multi-select');

			row.querySelector('.mktoLabel').addClass('label-up');

			function option_selection(e) {
				e.preventDefault();
				this.selected = !this.selected;
				return false;
			}

			const options = element.querySelectorAll('option');
			options.forEach((option) => {
				option.addEventListener('click', option_selection);
			});
		});
	}

	destyleMarketoForm(form, formElement = this.formElement) {
		console.log('dsm');
		form.getFormElem().attr('style', '');
		const formElementChildren = Array.from(formElement.querySelectorAll('*')).concat(formElement);
		formElementChildren.forEach((element) => {
			if (element.attributes['style']) {
				element.removeAttribute('style');
			}
		});

		const formLabels = document.querySelectorAll('.mktoLabel:not([type="hidden"])');
		const formInputs = document.querySelectorAll('.mktoField:not([type="hidden"])');

		formLabels.forEach((label) => (label.style.width = ''));
		formInputs.forEach((input) => (input.style.width = ''));

		const stylesheets = Array.from(document.styleSheets);
		stylesheets.forEach((stylesheet) => {
			if (
				[mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(stylesheet.ownerNode) !== -1 ||
				formElement.contains(stylesheet.ownerNode)
			) {
				stylesheet.disabled = true;
			}
		});
		formElement.setAttribute('data-styles-ready', 'true');

		return true;
	}

	attachStylingEventListeners(formElement = this.formElement) {
		const inputs = getVisibleInputs(formElement);

		inputs.forEach((input) => {
			input.addEventListener('focus', (event) => {
				this.labelUp(event.target);
			});
			input.addEventListener('blur', (event) => {
				this.labelDown(event.target);
			});
			input.addEventListener('change', (event) => {
				if (input.value === '') {
					this.labelDown(event.target);
				} else {
					this.labelUp(event.target);
				}
			});
			if (input.type === 'select') {
				input.addEventListener('change', () => {
					setTimeout(this.cleanSelects(), 100);
					setTimeout(this.multiSelects(), 100);
				});
			}
		});

		this.multiSelects();

		const mktoHtmlText = document.querySelectorAll('.mktoHtmlText');

		mktoHtmlText.forEach((element) => {
			let row = element.parentNode;

			if (row.querySelector('input, select, textarea')) {
				row.classList.add('mktoFormRow--heading');
			}
		});
	}
}

export default MarketoFormCleanup;
