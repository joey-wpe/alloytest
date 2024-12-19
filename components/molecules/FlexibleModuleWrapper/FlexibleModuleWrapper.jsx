import PropTypes from 'prop-types';
import React from 'react';

import styles from './FlexibleModuleWrapper.module.scss';

const FlexibleModuleWrapper = ({
	moduleName,
	verticalSpacingTop = 'none',
	verticalSpacingBottom = 'none',
	anchor,
	additionalClasses,
	internalPadding,
	children,
}) => {
	if (verticalSpacingTop === 'default') {
		verticalSpacingTop = 'medium';
	}
	if (verticalSpacingBottom === 'default') {
		verticalSpacingBottom = 'medium';
	}

	if (verticalSpacingTop === 'extra_small') {
		verticalSpacingTop = 'xsmall';
	}
	if (verticalSpacingBottom === 'extra_small') {
		verticalSpacingBottom = 'xsmall';
	}

	return (
		<section
			{...(anchor && { id: anchor })}
			className={`${styles[`module-wrapper`]} ${!internalPadding ? styles[`padding-top-${verticalSpacingTop}`] : ''} ${
				!internalPadding ? styles[`padding-bottom-${verticalSpacingBottom}`] : ''
			} ${additionalClasses ? additionalClasses : ''} ${moduleName}`}
		>
			{children}
		</section>
	);
};

FlexibleModuleWrapper.propTypes = {
	moduleName: PropTypes.string.isRequired,
	verticalSpacing: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
	anchor: PropTypes.string,
	additionalClasses: PropTypes.string,
};

export default FlexibleModuleWrapper;
