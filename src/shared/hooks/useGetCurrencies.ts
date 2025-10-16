import { useQuery } from '@tanstack/react-query';

import { API_URL, QUERY_KEYS } from '@/shared/constants';

type Props = {
	triggerToast?: (
		message: string,
		severity: 'info' | 'success' | 'warning' | 'error'
	) => void;
};
export const useGetCurrencies = ({ triggerToast }: Props) => {
	return useQuery({
		queryKey: [QUERY_KEYS.CURRENCIES],
		queryFn: async () => {
			const res = await fetch(`${API_URL}@latest/v1/currencies.json`);
			if (!res.ok) {
				triggerToast?.('Failed to fetch currencies.', 'error');
				throw new Error('Network response was not ok');
			}
			return res.json();
		}
	});
};
