import React, { useState, useEffect, useRef } from 'react';
import styles from './ReadingProgressBar.module.scss';

const ProgressBar = ({ containerRef }) => {
	const [width, setWidth] = useState(0);
	const barRef = useRef(null);

	const scrollHeight = () => {
		// offset of container from top of page
		let offset = containerRef.current.offsetTop;
		// document element
		let el = document.documentElement;
		// scroll position of document
		let ScrollTop = el.scrollTop || document.body.scrollTop;
		// height of document
		let ScrollHeight = el.scrollHeight || document.body.scrollHeight;

		// if scrolltop > offset, get percentage page has scrolled past top of container
		let percent = offset < ScrollTop ? ((ScrollTop - offset) / (ScrollHeight - offset - el.clientHeight)) * 100 : 0;

		if (barRef.current) {
			barRef.current.style.width = `${percent}%`;
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHeight);
		return () => window.removeEventListener('scroll', scrollHeight);
	});

	return <div ref={barRef} className={styles['reading-progress-bar']}></div>;
};

export default ProgressBar;
