import { emptyReturnNull } from '../wplib/util';
import { formatWPTranslated } from './PageTemplateHelpers/moleculeHelpers';

export function transformEventsByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'eventsByID':
			return transformEventsByIDJson(restResponse);

		default:
			console.error('ERROR: transformEventsByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformEventsByIDJson(restResponse) {
	let comboboxChoices = null;
	if (Array.isArray(restResponse?.acf?.events_details?.combobox_choices)) {
		comboboxChoices =
			restResponse?.acf?.events_details?.combobox_choices?.map((comboboxChoices) => ({
				comboboxId: comboboxChoices?.combobox_id ?? null,
				comboboxLabel: comboboxChoices?.combobox_label ?? null,
				comboboxChoices: comboboxChoices?.combobox_choices?.map((subChoices) => ({
					choiceName: subChoices?.choice_name ?? null,
					choiceValue: subChoices?.choice_value ?? null,
				})),
			})) ?? null;
	}

	let consentCheckbox = null;
	if (Array.isArray(restResponse?.acf?.events_details?.consent_checkbox)) {
		consentCheckbox =
			restResponse?.acf?.events_details?.consent_checkbox?.map((checkbox) => ({
				checkboxContent: checkbox?.checkbox_content ?? null,
				checkboxId: checkbox.checkbox_id ?? null,
			})) ?? null;
	}
	//console.log('Canonical=', restResponse?.yoast_head_json?.canonical);

	return {
		data: {
			event: {
				seo: {
					__typename: 'PostTypeSEO',
					canonical: restResponse?.yoast_head_json?.canonical ?? null,
					fullHead: restResponse?.yoast_head ?? null,
					metaDesc: restResponse?.yoast_head_json?.description ?? null,
					metaRobotsNofollow: restResponse?.yoast_head_json?.robots?.follow ?? null,
					metaRobotsNoindex: restResponse?.yoast_head_json?.robots?.index ?? null,
				},
				title: restResponse?.title?.rendered ?? null,
				content: restResponse.content?.rendered ?? null,
				eventsPage: {
					showEventForm: restResponse?.acf?.show_event_form ?? null,
					eventsDetails: {
						coCode: restResponse?.acf?.events_details?.co_code ?? null,
						comboboxChoices: comboboxChoices,
						consentCheckbox: consentCheckbox,
						customThankYou: emptyReturnNull(restResponse?.acf?.events_details?.custom_thank_you ?? null),
						fremiumEmails: restResponse?.acf?.events_details?.fremium_emails ?? null,
						initiative: restResponse?.acf?.events_details?.initiative ?? null,
						nextForm: emptyReturnNull(restResponse?.acf?.events_details?.next_form ?? null),
						persona: restResponse?.acf?.events_details?.persona ?? null,
						product: restResponse?.acf?.events_details?.product ?? null,
						redirectUrl: restResponse?.acf?.events_details?.redirect_url ?? null,
						reportingTitle: restResponse?.acf?.events_details?.reporting_title ?? null,
						resourceFormCta: restResponse?.acf?.events_details?.resource_form_cta ?? null,
						selectForm: {
							__typename: 'Form',
							id: '',
							supportCPTFormFields: {
								formId: restResponse?.acf?.events_details?.select_form?.ID ?? null,
								formTitle: restResponse?.acf?.events_details?.select_form?.post_title ?? null,
							},
						},
						stage: restResponse?.acf?.events_details?.stage ?? null,
						type: restResponse?.acf?.events_details?.type ?? null,
						when: {
							fromDate: restResponse?.acf?.events_details?.when?.from_date ?? null,
							eventDateInfo: restResponse?.acf?.events_details?.when?.event_date_info ?? null,
						},
						where: {
							location: restResponse?.acf?.events_details?.where?.location ?? null,
							venue: restResponse?.acf?.events_details?.where?.venue ?? null,
						},
					},
					eventsHeader: {
						backgroundColor: emptyReturnNull(restResponse?.acf?.events_header?.background_color ?? null),
						backgroundImage: {
							image: restResponse?.acf?.events_header?.background_image ?? null,
							mobileImage: restResponse?.acf?.events_header?.mobile_image ?? null,
						},
						backgroundPattern: restResponse?.acf?.events_header?.background_pattern ?? null,
						backgroundType: restResponse?.acf?.events_header?.background_type ?? null,
						description: emptyReturnNull(restResponse?.acf?.events_header?.description ?? null),
						preheadText: restResponse?.acf?.events_header?.prehead_text ?? null,
						preheadType: restResponse?.acf?.events_header?.prehead_type ?? null,
						titleText: restResponse?.acf?.events_header?.title_text ?? null,
					},
				},
				translated: formatWPTranslated(restResponse?.wpml_translations, restResponse?.wpml_current_locale) ?? [],
			},
		},
	};
}
