import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import styles from './CountBox.module.scss';
import Button from '../Button/Button';
import { useRouter } from 'next/router';

const CountBox = ({
	size,
	className,
	statTrailingCharacter,
	number,
	description,
	title,
	prehead,
	alignment,
	buttonData,
}) => {
	// this module gets either a single number (ex: 1800) or a slashed number (ex: 7/10). When there is a slash
	// we break it into two numbers to animate instead of 1
	const symbolString = isNaN(number) ? number.search('/') : '';
	const numberFraction = isNaN(number) ? number : '';
	const numberOne = numberFraction.slice(0, symbolString);
	const numberTwo = numberFraction.slice(symbolString + 1);
	const customClassName = className ?? '';
	const separator = useRouter().locale === 'de' ? '.' : ',';

	return (
		<InView threshold={0.25} triggerOnce={true}>
			{({ ref, inView }) => (
				<div
					className={` ${inView && styles['anim-play']} ${customClassName} ${styles['wrap-animation']} ${
						styles[size]
					} ${styles[alignment] ?? ''}`}
					ref={ref}
				>
					<div className={styles['count-box']}>
						{isNaN(number) ? (
							<div className={styles['fraction-number']}>
								<CountUp end={numberOne} duration={2} separator={separator}>
									{({ countUpRef, start }) => (
										<InView as="div" onChange={start} triggerOnce={true}>
											<p className={`${styles.number} ${styles.h1}`} ref={countUpRef} />
										</InView>
									)}
								</CountUp>
								<span className={`${styles.number} ${styles.h1}`}>/</span>
								<CountUp end={numberTwo} duration={2} separator={separator}>
									{({ countUpRef, start }) => (
										<InView as="div" onChange={start} triggerOnce={true}>
											<p className={`${styles.number} ${styles.h1}`} ref={countUpRef} />
										</InView>
									)}
								</CountUp>
							</div>
						) : (
							<>
								{size === 'large' ? (
									<>
										<CountUp end={number} duration={2} separator={separator} useEasing={true}>
											{({ countUpRef, start }) => (
												<InView
													as="div"
													className={`${styles['count-content']} ${styles['count-content--' + alignment] ?? ''}`}
													onChange={start}
													triggerOnce={true}
												>
													<div className={styles['content-number']}>
														<p className={`${styles.number} ${styles.h1}`} ref={countUpRef} />
														<span className={styles['span-symbol']}>{statTrailingCharacter}</span>
													</div>
													<p className={styles.title}>{title}</p>
												</InView>
											)}
										</CountUp>
										<div className={styles['count-box-text']}>
											<span className={styles.subhead}>{prehead}</span>
										</div>
									</>
								) : (
									<CountUp end={number} duration={2} separator={separator}>
										{({ countUpRef, start }) => (
											<InView as="div" onChange={start} triggerOnce={true}>
												<p className={`${styles.number} ${styles.h1}`} ref={countUpRef} />
											</InView>
										)}
									</CountUp>
								)}
							</>
						)}
						<p className={styles.description}>{description}</p>
						{size === 'large' && buttonData ? (
							<Button {...buttonData} className={styles['button--' + alignment]} />
						) : (
							false
						)}
					</div>
				</div>
			)}
		</InView>
	);
};

CountBox.propTypes = {
	number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignment: PropTypes.oneOf(['left', 'center']),
	size: PropTypes.oneOf(['small', 'large']),
	description: PropTypes.string,
	title: PropTypes.string,
	prehead: PropTypes.string,
};

CountBox.defaultProps = {
	size: 'small',
	alignment: 'left',
};

export default CountBox;
