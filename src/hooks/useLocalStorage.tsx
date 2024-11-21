import { useEffect, useState } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];

export const useLocalStorage: UseLocalStorage = (key) => {
	const [value, setValue] = useState('');

	const setItem = (val: LocalStorageSetValue) => {
		localStorage.setItem(key, JSON.stringify(val));
		setValue(val);
	};

	const removeItem = () => {
		localStorage.removeItem(key);
		setValue('');
	};

	useEffect(() => {
		const valueStorage = localStorage.getItem(key)
		if(valueStorage) {
			setValue(JSON.parse(valueStorage));
		}
	}, [key]);

	return [
		value,
		{
			setItem,
			removeItem,
		},
	];
};
