import { useQuery } from '@tanstack/react-query';

import { API_URL, QUERY_KEYS } from '@/shared/constants';

export const useGetCurrencies = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.CURRENCIES],
		queryFn: async () => {
			const res = await fetch(`${API_URL}@latest/v1/currencies.json`);
			if (!res.ok) throw new Error('Network response was not ok');
			return res.json();
		}
	});
};
