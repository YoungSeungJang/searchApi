import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 700) => {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		// 마운트
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		// 언마운트
		return () => clearTimeout(handler);
	}, [value]);

	return debounceValue;
};

export default useDebounce;
