import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import styles from './DataBoxLarge.module.scss';
import CountBox from '../../atoms/CountBox/CountBox';
import Heading from '../../molecules/Heading/Heading';

const DataBoxLarge = ({ commonHeaderDetails, buttons, boxes, background, alignment }) => {
	const useReverseColor = background.color === 'blue' || background.color === 'midtone';

	return (
		<Background {...background} className={styles[background.color]}>
			<div className={styles[alignment]}>
				<div className={styles['container']}>
					<div className={`${styles['text-container']}`}>
						<Heading {...commonHeaderDetails} />
					</div>

					<div className={styles['box-container']}>
						{boxes.map((data, index) => {
							const classAnimDelay = `anim-delay-${+index + 1}`;
							// TODO:: simplify this - we should be able to use built in styles and just set a parent container class to indicate what background
							// TODO:: the button should be on, or at least break this logic out to be above the return() so that it's more readable
							// Change the value of buttonStyle
							data.buttonData?.buttonStyle && useReverseColor // Check if buttonStyle exists and background is blue/midtone is true.
								? (data.buttonData.buttonStyle = 'TertiaryReverse') // Return Tertiary reverse if condition above is true.
								: data.buttonData?.buttonStyle // Check if buttonStyle exists.
								? (data.buttonData.buttonStyle = 'TertiaryDefault') // Return light background button if condition above is true.
								: false; // Return false if all of the conditions above are false.
							return (
								<CountBox
									key={index}
									size="large"
									className={`${classAnimDelay} ${styles['content-data-num']}`}
									{...data}
									alignment={alignment}
								/>
							);
						})}
					</div>

					{buttons && <ButtonGroup alignment={buttons.alignment} buttons={buttons.buttons} />}
				</div>
			</div>
		</Background>
	);
};

DataBoxLarge.propTypes = {
	alignment: PropTypes.oneOf(['left', 'center']),
	commonHeaderDetails: PropTypes.object,
	boxes: PropTypes.array,
	background: PropTypes.object,
};

DataBoxLarge.defaultProps = {
	alignment: 'center',
};

export default DataBoxLarge;
