import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Accordion from '../../atoms/Accordion/Accordion';

const AccordionGroup = ({ accordionItems }) => {
	const { asPath } = useRouter();
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeID, setActiveID] = useState(false);
	const [idArray, setIdArray] = useState([]);

	useEffect(() => {
		asPath.indexOf('#') && asPath.split('#').length === 2 ? setActiveID(asPath.split('#')[1]?.toString()) : '';
	}, [asPath]);

	useEffect(() => {
		// converts the title to lowercase id format
		const accordIdArray = accordionItems.map((item, index) => {
			return (
				item.title
					.replaceAll(' ', '-')
					// regex pattern to filter only alphanumeric characters
					.replaceAll(/[^a-zA-Z0-9 -]/g, '')
					.toLowerCase()
			);
		});

		setIdArray(accordIdArray);
	}, []);

	useEffect(() => {
		const inArr = idArray.indexOf(activeID);

		inArr > -1 ? setActiveIndex(inArr) : '';
	});

	return accordionItems?.map((item, index) => {
		const accordID = idArray[index];
		let isActive = index === activeIndex;

		return (
			<Accordion
				key={index}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
				index={index}
				accordionItem={item}
				isActive={isActive}
				accordID={accordID}
			/>
		);
	});
};

AccordionGroup.propTypes = {
	accordionItems: PropTypes.array,
};
export default AccordionGroup;
