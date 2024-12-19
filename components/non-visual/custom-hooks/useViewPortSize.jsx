const useViewPortSize = () => {
	const W = (typeof window !== 'undefined') ? window : {};
	const width = W.innerWidth || null;
	const height = W.innerHeight || null;

	return { width, height};
};

export default useViewPortSize;
