import React, { useState, useEffect } from 'react';
import styles from './ROICalculatorMain.module.scss';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import { optionsInsutries, inputCheckboxes } from './ROICalculatorData';
import GlobalConstants from '../../../GlobalConstants';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const ROICalculatorMain = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const router = useRouter();
	const [counter, setCounter] = useState(0);
	const [currentCheckBox, setCurrentCheckBox] = useState(null);
	const [countCheckBox, setCountCheckBox] = useState({});
	const [checkBoxes, setCheckBoxes] = useState(inputCheckboxes);
	const [inputRevenue, setInputRevenue] = useState(null);
	const [inputSpend, setInputSpend] = useState(null);

	const handleChange = (e) => {
		setCountCheckBox({ ...countCheckBox, [e.target.value]: e.target.checked });
	};

	useEffect(() => {
		if (!currentCheckBox) return;

		const value = countCheckBox[currentCheckBox.value];
		const newCheckBox = checkBoxes.map((checkBox) =>
			parseInt(currentCheckBox.dataset.inputId) == checkBox.id
				? {
						...checkBox,
						disabled: value,
				  }
				: { ...checkBox }
		);
		setCheckBoxes(newCheckBox);

		if (counter < 5 && value) {
			setCounter(counter + 1);
		}
		if (!value) {
			setCounter(counter - 1);
		}
	}, [countCheckBox]);

	const onSubmit = (data, event) => {
		event.preventDefault();
		// router.push({
		// 	pathname: `/${GlobalConstants.FrontendRoutes.ROICalculatorMain}`,
		// 	query: data,
		// });
		window.location.href = `/${GlobalConstants.FrontendRoutes.ROICalculatorMain}?${new URLSearchParams(
			data
		).toString()}`;
	};

	const MastheadData = pageData?.template.pageHeaderROICalculatorMain.heroMinimal;
	const testimonialData = MastheadData?.testimonial?.testimonialDetails;
	const MastheadMinimalData = {
		prehead: MastheadData?.preheadText,
		preheadType: MastheadData?.preheadType,
		title: MastheadData?.titleText,
		titleType: MastheadData?.titleType,
		description: MastheadData?.description,
		background: {
			type: 'pattern',
			color: 'blaze',
		},
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			<MastheadMinimal {...MastheadMinimalData} className={styles['calculator-masthead']}>
				{testimonialData && (
					<div className={styles.testimonial}>
						<div
							className={`${styles.testimony} ${styles.p} ${styles['body-p']} `}
							dangerouslySetInnerHTML={{ __html: testimonialData?.content ?? '' }}
						></div>
						<p className={`${styles.author} ${styles.p}`}>{testimonialData?.authorName}</p>
						<div className={`${styles.description} ${styles.p}`}>
							<p>{testimonialData?.authorTitle}</p>|<p>{testimonialData?.authorCompany}</p>
						</div>
					</div>
				)}
			</MastheadMinimal>
			<div className={styles.container}>
				<form className={styles['form-calculator']} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.contentFlex}>
						<label>
							1. What industry are you in? <span className={styles.asteriskskMark}>*</span>
						</label>
						<select
							className={`${errors?.industry ? styles.inputErrors : ''}`}
							name="industry"
							{...register('industry', {
								required: { value: true, message: 'This field is required.' },
							})}
						>
							<option value="">Choose Your Industry</option>
							<option value="financial_services">Banking</option>
							<option value="energy_and_natural_resources">Energy and Utilities</option>
							<option value="financial_services">Financial Services</option>
							<option value="public_service">Government and Public Services</option>
							<option value="healthcare">Healthcare and Pharma</option>
							<option value="financial_services">Insurance</option>
							<option value="other">Manufacturing</option>
							<option value="consumer">Retail and Consumer</option>
							<option value="other">Technology</option>
							<option value="telecom">Telecom</option>
							<option value="other">Other</option>
						</select>
						{errors?.industry?.message && <span className={styles.errorMessage}> {errors.industry.message}</span>}
					</div>
					<hr className={styles.hr} />
					<div id="roi-spend-input" className={`${styles.contentFlex} ${styles['content__test']}`}>
						<label>
							2. What does your organization spend on testing each year? Think about all of the resources involved in
							testing (business analysts, test data admin, process owners, etc.) as well as your testing infrastructure.
							<span className={styles.asteriskskMark}>*</span>
						</label>
						<input
							id="spend"
							type="text"
							name="spend"
							className={`${errors?.spend && !inputRevenue ? styles.inputErrors : ''} ${
								inputRevenue ? styles['input-disabled'] : ''
							}`}
							placeholder="Enter Testing Spend"
							disabled={inputRevenue && 'disabled'}
							{...register('spend', {
								required: { value: inputRevenue ? false : true, message: 'This field is required.' },
								onChange: (e) => {
									setInputSpend(e.target.value);
								},
							})}
						/>
						<div>USD</div>
						{errors?.spend?.message && !inputRevenue && (
							<span className={styles.errorMessage}> {errors.spend.message}</span>
						)}
						<label className={styles['content__test-other-information']}>
							If you dont know your testing spend, enter your organizations <strong>annual revenue</strong> in USD. Well
							estimate your total testing spend based on industry metrics from Deloitte, Gartner, Capgemini, and Sogeti.
						</label>
						<input
							id="revenue"
							type="text"
							name="revenue"
							placeholder="Enter Revenue"
							className={`${errors?.revenue && !inputSpend ? styles.inputErrors : ''} ${
								inputSpend ? styles['input-disabled'] : ''
							}`}
							disabled={inputSpend && 'disabled'}
							{...register('revenue', {
								required: { value: inputSpend ? false : true, message: 'This field is required.' },
								onChange: (e) => {
									setInputRevenue(e.target.value);
								},
							})}
						/>
						<div>USD</div>
						{errors?.revenue?.message && !inputSpend && (
							<span className={styles.errorMessage}> {errors.revenue.message}</span>
						)}
					</div>
					<hr className={styles.hr} />

					<div className={`${styles.contentFlex} ${styles['content__aplications']}`}>
						<legend id="roi-app-check">
							3. Which of the following does your organization need to test? Check up to 5 of your most important apps.
							<span className={styles.asteriskskMark}>*</span>
						</legend>

						<div className={`${styles['content-check']}`}>
							{checkBoxes.map((itemCheck, index) => {
								return (
									<label
										htmlFor={itemCheck.inputValue}
										key={index}
										className={counter >= 5 && !itemCheck.disabled ? styles['disabled-label'] : null}
									>
										<input
											id={itemCheck.inputValue}
											className={`${errors?.apps ? styles.inputErrors : ''} `}
											type="checkbox"
											data-input-id={itemCheck.id}
											name="apps"
											value={itemCheck.inputValue}
											onClick={(e) => {
												handleChange(e);
												setCurrentCheckBox(e.target);
											}}
											disabled={counter >= 5 && !itemCheck.disabled ? true : false}
											{...register('apps', {
												required: { value: true, message: 'This field is required.' },
											})}
										/>
										{itemCheck.label}
									</label>
								);
							})}
							{errors?.apps?.message && <span className={styles.errorMessage}> {errors.apps.message}</span>}
						</div>
					</div>
					<hr className={styles.hr} />
					<div className={styles.contentFlex}>
						<label htmlFor="app-number">
							4. How many applications does your organization need to test?{' '}
							<span className={styles.asteriskskMark}>*</span>
						</label>
						<input
							id="app-number"
							type="number"
							min="0"
							name="appnumber"
							className={`${errors?.appnumber ? styles.inputErrors : ''}`}
							placeholder="Enter Number of Applications"
							{...register('appnumber', {
								required: { value: true, message: 'This field is required.' },
							})}
						/>
						{errors?.appnumber?.message && <span className={styles.errorMessage}> {errors.appnumber.message}</span>}
					</div>
					<hr className={styles.hr} />
					<div className={styles.contentFlex}>
						<label htmlFor="automation">
							5. What percentage of your end-to-end functional testing is automated (test scenarios that exercise a
							complete business process across SAP, custom apps, mainframes, APIs, browsers, etc.)? The industry average
							is 8-18%.
							<span className={styles.asteriskskMark}>*</span>
						</label>
						<select
							id="automation"
							name="automation"
							className={`${errors?.automation ? styles.inputErrors : ''}`}
							{...register('automation', {
								required: { value: true, message: 'This field is required.' },
							})}
						>
							<option value="">Choose a Percentage Range</option>
							<option value="less_than_20">{'< 20%'}</option>
							<option value="20_50">20 - 50%</option>
							<option value="50_80">50 - 80%</option>
							<option value="more_than_80">{'> 80%'}</option>
						</select>
						{errors?.automation?.message && <span className={styles.errorMessage}> {errors.automation.message}</span>}
					</div>
					<hr className={styles.hr} />
					<div className={`${styles.contentFlex} ${styles['content__hours']}`}>
						<label htmlFor="hours">
							6. How much time is spent testing each release/update (on average)?{' '}
							<span className={styles.asteriskskMark}>*</span>
							<span className={styles['hours-icon']} id="roi-formula-popup"></span>
							<span className={styles['hours-information']} id="roi-formula-popup-text">
								Hours = # of Testers * Days of Testing * Hours Per Day + # of Key Users or Business Users Asked to Test
								* Days of Testing * Hours Per Day
							</span>
						</label>
						<input
							id="hours"
							type="number"
							min="0"
							className={`${errors?.hours ? styles.inputErrors : ''}`}
							name="hours"
							placeholder="Enter Testing Hours"
							{...register('hours', {
								required: { value: true, message: 'This field is required.' },
							})}
						/>
						{errors?.hours?.message && <span className={styles.errorMessage}> {errors.hours.message}</span>}
					</div>
					<hr className={styles.hr} />
					<div className={styles.contentFlex}>
						<label htmlFor="releases">
							7. How many releases/updates do you have per year?<span className={styles.asteriskskMark}>*</span>
						</label>
						<input
							id="releases"
							type="number"
							min="0"
							name="releases"
							className={`${errors?.releases ? styles.inputErrors : ''}`}
							placeholder="Enter Number of Releases"
							{...register('releases', {
								required: { value: true, message: 'This field is required.' },
							})}
						/>
						{errors?.releases?.message && <span className={styles.errorMessage}> {errors.releases.message}</span>}
					</div>
					<button type="submit" value="Calculate Results" className={styles.submit}>
						Calculate results
					</button>
				</form>
			</div>
		</BaseTemplateWrapper>
	);
};

export default ROICalculatorMain;
