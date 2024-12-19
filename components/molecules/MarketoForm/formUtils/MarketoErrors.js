class MarketoErrors {
	constructor() {
		this.errors = {};
	}

	addError(errorKey, message) {
		this.errors[errorKey] = message;
	}

	removeError(errorKey) {
		delete this.errors[errorKey];
	}

	hasErrors() {
		for (let key in this.errors) {
			if (this.errors.hasOwnProperty(key)) {
				return true;
			}
		}
		return false;
	}
}

export default MarketoErrors;
