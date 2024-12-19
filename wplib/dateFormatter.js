import { format, parse } from 'date-fns';

// The list of date formats.
export const STANDARD_FORMAT = 'MMM. dd, yyyy';
export const FULL_YEAR = 'yyyy';

/**
 * Check if the argument can be transformed in a Date object.
 *
 * @param {Date|String} date
 *
 * @returns {Date}
 * @throws {Error}
 */
const dateParser = (date) => {
	// removes time portion from date variable (a `T`) because Safari does not parse times properly in this format. ref: https://github.com/mdn/browser-compat-data/issues/15401
	date = date.match(/([^\s]+)/)[0];

	try {
		if (date instanceof Date) return date;
		
		if (typeof date === 'string') {
			return new Date(date);
		}
	} catch (error) {
		throw new Error('The argument "date" should be of Date or String type.');
	}
}

/**
 * Return the formatted date string in the given format.
 * @description Import the format constants from /wplib/dateFormatter.js
 *
 * @param {Date} date
 * @param {String} formatString Date-fns format. Default: 'MMM. dd, yyyy'.
 *
 * @returns {String}
 */
export const formatDate = (date, formatString = STANDARD_FORMAT) => {
	const d = dateParser(date);

	return format(d, formatString);
};

/**
 * Return the full year of a given date.
 *
 * @param {Date} date
 *
 * @returns {Number}
 */
export const formatYear = (date) => parseInt(format(date, FULL_YEAR));

/**
 * Formats a date string in the format 'yyyyMMdd' to 'MMM. dd, yyyy'.
 * Returns the formatted date string, the original date string, or null.
 *
 * @param {string} date - The date string to format.
 * @param {String} formatString Date-fns format. Default: 'MMM. dd, yyyy'.
 *
 * @returns {string|null} The formatted date string, original date string, or null.
 */
export function formatNewsDate(date, formatString = STANDARD_FORMAT) {
	const datePattern = /^\d{8}$/;

	if (date !== null && datePattern.test(date)) {
		const parsedDate = parse(date.toString(), 'yyyyMMdd', new Date());

		return format(parsedDate, formatString);
	} else if (date !== null && date !== '') {
		return date;
	}

	return null;
}

export default formatDate;