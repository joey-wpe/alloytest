import { useRouter } from 'next/router';

const useLocationHash = () => {
	const { asPath } = useRouter();
	const hashIndex = asPath.indexOf('#');
	const hash = hashIndex ?  asPath.slice(hashIndex) : null;

	return hash;
  };

  export default useLocationHash;
