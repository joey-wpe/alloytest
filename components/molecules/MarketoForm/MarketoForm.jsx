import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Toggle from '../../atoms/Toggle/Toggle';
import styles from './MarketoForm.module.scss';
import { loadScript } from './formUtils/utils';
import MarketoCore from './formUtils/MarketoCore';

const MarketoForm = ({ formOptions, translator, className }) => {
	const { formID, nextFormID, toggle: toogleOptions, formHeadline, formSubHeadline } = formOptions;
	const { scriptStatus, formStatus } = useMarketoFormLoader(formID, formOptions, translator);

	const handleChange = (option) => {
		window.location.hash = option.value;
	};

	return (
		<>
			{(formHeadline || formSubHeadline) && (
				<div className={styles['form-header-wrapper']}>
					{formHeadline && <h4 className={`${styles['h4']} ${styles['form-heading']}`}>{formHeadline}</h4>}
					{formSubHeadline && <p className={`${styles['sub-p']} ${styles['form-subheading']}`}>{formSubHeadline}</p>}
				</div>
			)}

			{toogleOptions && (
				<Toggle
					id="marketo-toggle"
					style={{ display: 'none' }}
					options={toogleOptions}
					onChange={handleChange}
					className={styles['marketo-toggle']}
				/>
			)}
			<form
				id={`mktoForm_${formID}`}
				className={`${styles['marketo-form']} ${className} ${styles[`marketo_${formID}`]}`}
			>
				{scriptStatus.error ? <div>{scriptStatus.errorMsg}</div> : null}
				{formStatus.error ? <div>{formStatus.errorMsg}</div> : null}
			</form>
			<Script src="/static/formsPlus.min.js" />
			{nextFormID ? (
				<form id={`mktoForm_${nextFormID}`} className={`${styles['marketo-form']} ${styles[`marketo_${nextFormID}`]}`}>
					{scriptStatus.error ? <div>{scriptStatus.errorMsg}</div> : null}
					{formStatus.error ? <div>{formStatus.errorMsg}</div> : null}
				</form>
			) : null}
		</>
	);
};

MarketoForm.propTypes = {
	formOptions: PropTypes.object,
};

export default MarketoForm;

/**
 * Loads the Marketo form script if it is not already loaded. Then loads the form.
 * Provides access to the Marketo class object and the Marketo form api.
 * @param {string} options The option args to pass to the MarketoCore constructor.
 * @returns {{formStatus: {status: string, error: boolean, errorMsg: string}, scriptStatus: {status: string, error: boolean, errorMsg: string}, , marketo: {MarketoObject} formObj: {formAPI}}} provides access to the form/script status objects
 */
export const useMarketoFormLoader = (formID, options, translator) => {
	const router = useRouter();

	// This hook is used to load the Marketo form script and then load the form.
	const { marketoScriptEmbedSrc } = options;
	const marketoScriptId = 'mktoForms';

	// provided access to loading states for use within the component
	const [scriptStatus, setScriptStatus] = useState({
		status: 'not-loaded',
		error: false,
		errorMsg: '',
	});
	const [formStatus, setFormStatus] = useState({
		status: 'not-loaded',
		error: false,
		errorMsg: '',
	});
	const [marketo, setMarketo] = useState(null);
	const [formObj, setFormObj] = useState(null);

	// Loads the Marketo script
	useEffect(() => {
		if (scriptStatus.status !== 'loaded') {
			loadScript(scriptStatus, setScriptStatus, marketoScriptId, marketoScriptEmbedSrc);
		}
	}, []);

	// if the script is loaded, initialize the Marketo class object and load the form
	useEffect(() => {
		if (scriptStatus.status === 'loaded' && !(formStatus.status === 'loaded')) {
			setFormStatus({
				status: 'loading',
				error: false,
				errorMsg: '',
			});
			if (!window.MktoForms2) {
				setScriptStatus({
					status: 'error',
					error: true,
					errorMsg: `Error loading Marketo form script.`,
				});
				return;
			}
		}
	}, [scriptStatus, formID]);

	useEffect(() => {
		if (scriptStatus.status === 'loaded' && !(formStatus.status === 'loaded')) {
			const frm = window.MktoForms2.getForm(formID);
			if (marketo === null && !frm) {
				// initialize the Marketo class object and save it to state
				// the Marketo class handles the bulk of the forms logic using vanilla js with several helper classes to provide additional functionality
				setMarketo(new MarketoCore(options, setFormObj, translator));
			} else if (marketo === null && frm) {
				// NOTE:: this situation - where marketo is null, but the form is not, was not previously handled. When the form would
				// end up in this state (typically from navigating to the page via a <Link> and not a direct full page load) this state could
				// occcur (where marketo is null but the frm is not) - this caused the qTest trial form to be unstyled and not function properly.
				// The only quick solution is to force a full page refresh as this only seems to occur on JS navigations, and the only known
				// solution is to refresh the page - so we're just automating that
				console.log('mform.useEffect - marketo null, but form set - FORCING FULL PAGE RELOAD');

				window.location.reload();
				// router.reload(window.location.pathname);
			}

			if (marketo !== null) {
				setFormStatus({
					status: 'loaded',
					error: false,
					errorMsg: '',
				});
			}

			// grabs the newly loaded form that was injected into the dom and provides the formObj that can used to access the form api methods
			if (window.MktoForms2.getForm(formID)) {
				window.MktoForms2.getForm(formID).render();
				setFormStatus({
					status: 'loaded',
					error: false,
					errorMsg: '',
					formObj: window.MktoForms2.getForm(formID),
				});
				return;
			}
		}
	}, [scriptStatus, marketo]);

	return {
		formStatus,
		scriptStatus,
		marketo,
		formObj,
	};
};

/**
 * A React hook that returns the form object with the provided formID. Can be used to access the form API methods such as onSuccess(), getFormElem(), etc.
 * possible methods found in the "Form Methods section" -- https://developers.marketo.com/javascript-api/forms/api-reference/
 * @param {string} formID
 * @returns {object} formObj
 */
export const useMarketoFormAPI = (formID) => {
	// This hook is used to access the form api methods.
	// this functionality is partly redundant with the useMarketoFormLoader hook, but doesn't involve loading the scripts or form.
	const [formObj, setFormObj] = useState(null);

	useEffect(() => {
		// prevent hook from setting state again if formObj is already set
		if (formObj !== null) {
			return {
				formObj,
			};
		}

		if (window === undefined || window.MktoForms2 === undefined) {
			return;
		}
		if (window.MktoForms2.getForm(formID)) {
			setFormObj(window.MktoForms2.getForm(formID));
		}
	});

	return {
		formObj,
	};
};
