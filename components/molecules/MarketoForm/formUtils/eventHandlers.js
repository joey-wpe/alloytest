/**
 * custom onEvent handler that adds a custom event listener at the document level
 * @param {string} eventType
 * @param {function} listener
 */
export const on = (eventType, listener) => {
	document.addEventListener(eventType, listener);
};

/**
 * custom onEvent handler that removes a custom event listener at the document level
 * @param {string} eventType
 * @param {function} listener
 */
export const off = (eventType, listener = () => {}) => {
	document.removeEventListener(eventType, listener);
};

/**
 * custom onEvent handler that adds and executes an even once and then removes it
 * @param {string} eventType
 * @param {function} listener
 */
export const once = (eventType, listener) => {
	on(eventType, handleEventOnce);

	const handleEventOnce = (event) => {
		listener(event);
		off(eventType, handleEventOnce);
	};
};

/**
 * custom event handler that can be used to create a custom event and dispatch it
 * @param {string} eventType
 * @param {object} data
 */
export const trigger = (eventType, data) => {
	const event = new CustomEvent(eventType, { detail: data });
	document.dispatchEvent(event);
};
