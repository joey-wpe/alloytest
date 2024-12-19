import { useEffect, useState, useCallback, useMemo } from 'react';

const useScrollDirection = () => {
	const W = useMemo(() => (typeof window !== 'undefined') ? window : {}, []);
	const D = useMemo(() => (typeof document !== 'undefined') ? document : {}, []);
	const [y, setY] = useState(D.scrollingElement?.scrollHeight || 0);
	const [scrollDirection, setScrollDirection] = useState(null);
	
	const handleNavigation = useCallback((e) => {
		if (y > W.scrollY) {
			setScrollDirection("scroll-up");
		} else if (y < W.scrollY) {
			setScrollDirection("scroll-down");
		}
		setY(W.scrollY)
	}, [y, W]);
	
	useEffect(() => {
		if (!W.addEventListener) return;

		W.addEventListener("scroll", handleNavigation);

		return () => {
			W.removeEventListener("scroll", handleNavigation);
		};
	}, [handleNavigation, W]);

	return scrollDirection;
};

export default useScrollDirection;
