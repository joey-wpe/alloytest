import { getUrlParameterByName, customFetch } from './utils';
import MarketoConstants from '../../../../MarketoConstants';

const { marketoBackendPath } = MarketoConstants.mktoFormEndpoints;

class MarketoData {
	constructor() {
		this.query_key = 'marketo_params';
	}

	fetchData(key, fields, callback) {
		var options = {
			action: 'get_marketo_fields',
			leadId: getUrlParameterByName('leadId'),
		};

		if (fields !== null) {
			options.fields = fields;
		}

		customFetch(marketoBackendPath, 'POST', options)
			.then(function (data) {
				const item = {
					time: Date.now(),
					fields: data,
				};

				const response = JSON.parse(data);

				if (response.success !== false) {
					localStorage.setItem(key, JSON.stringify(item));
				}
				this.sendData(item, callback);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getStorage(key) {
		var item = localStorage.getItem(key);

		if (item === null) {
			return null;
		}

		return JSON.parse(item);
	}

	getData(key, fields, callback) {
		var item = this.getStorage(key);

		if (this.dataIsFresh(item)) {
			this.sendData(item, callback);
		} else {
			this.fetchData(key, fields, callback);
		}
	}

	dataIsFresh(item) {
		if (item === null) {
			return false;
		}

		var time = Date.now();

		return time - item.time <= 900000; //Older than 15 minutes
	}

	clearData(key) {
		localStorage.removeItem(key);
	}

	sendData(data, callback) {
		callback(data.fields);
	}

	// get param from local storage
	getParameterFromStorage(name) {
		var parameter_storage = localStorage.getItem(this.query_key);

		if (parameter_storage === null) {
			return null;
		}

		var storage_object = JSON.parse(parameter_storage);

		if (!storage_object.hasOwnProperty(name)) {
			return null;
		}

		return storage_object[name];
	}

	// saving param to storage
	saveParameterToStorage(name, value) {
		var parameter_storage = localStorage.getItem(this.query_key);

		if (parameter_storage === null) {
			parameter_storage = {};
		} else {
			parameter_storage = JSON.parse(parameter_storage);
		}

		parameter_storage[name] = {
			value: value,
			timestamp: Math.round(new Date().getTime() / 1000),
			expiration: Math.round(new Date().getTime() / 1000) + 172800, //  2 day expiration
		};

		localStorage.setItem(this.query_key, JSON.stringify(parameter_storage));
	}

	// check if param is expired
	isParameterExpired(name) {
		var currentTime = Math.round(new Date().getTime() / 1000);

		var param_expiration = this.getParameterFromStorage(name).expiration;

		if (currentTime > param_expiration) {
			return 'expired';
		}
	}

	// get param using getUrl param and other methods
	getParameter(name) {
		var query_param = getUrlParameterByName(name);

		if (query_param === null) {
			return '';
		}

		if (query_param !== '') {
			if (this.getParameterFromStorage(name) === null) {
				this.saveParameterToStorage(name, query_param);
				return query_param;
			}

			if (typeof this.getParameterFromStorage(name).expiration === 'undefined') {
				localStorage.removeItem(this.getParameterFromStorage(name));
				this.saveParameterToStorage(name, query_param);
				return query_param;
			}

			var paramTimeValid = this.isParameterExpired(name);

			if (paramTimeValid === 'expired') {
				localStorage.removeItem(this.getParameterFromStorage(name));
				this.saveParameterToStorage(name, query_param);
				return query_param;
			}

			return this.getParameterFromStorage(name).value;
		}
	}

	setReferrerStorage() {
		var source = document.referrer;
		var referral;

		if (source === '') {
			referral = 'Direct';
		}

		var refDomain = source.split('/');
		var domain = refDomain[2];

		if (source !== '') {
			referral = domain;
		}

		var object = {
			domain: referral,
			timestamp: Math.round(new Date().getTime() / 1000),
			expiration: Math.round(new Date().getTime() / 1000) + 1000,
		};

		localStorage.setItem('referrer', JSON.stringify(object));
	}

	//
	getReferrerStorage() {
		var referrerObject = JSON.parse(localStorage.getItem('referrer'));

		if (referrerObject === null) {
			return '';
		}

		return referrerObject;
	}

	getReferrer() {
		var currentTime = Math.round(new Date().getTime() / 1000);

		if (this.getReferrerStorage() === '') {
			this.setReferrerStorage();
		}

		if (currentTime > this.getReferrerStorage().expiration) {
			localStorage.removeItem('referrer');
			this.setReferrerStorage();
			return this.getReferrerStorage().domain;
		}

		return this.getReferrerStorage().domain;
	}
}

export default MarketoData;
