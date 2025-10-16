import { useQuery } from '@tanstack/react-query';

import { API_URL, PAST_DAYS, QUERY_KEYS } from '@/shared/constants';

type Props = {
	date: string; // format: YYYY-MM-DD
	baseCurrency: string;
};

function getPreviousDates(date: string, days: number): string[] {
	const result: string[] = [];
	const base = new Date(date);

	for (let i = 0; i < days; i++) {
		const d = new Date(base);
		d.setDate(base.getDate() - i);
		result.push(d.toISOString().split('T')[0]);
	}

	return result;
}

export const useGetCurrencyRates = ({ date, baseCurrency }: Props) => {
	return useQuery({
		queryKey: [QUERY_KEYS.CURRENCY_RATES, date, baseCurrency],
		queryFn: async () => {
			const dates = getPreviousDates(date, PAST_DAYS);

			const responses = await Promise.all(
				dates.map(async d => {
					const res = await fetch(
						`${API_URL}@${d}/v1/currencies/${baseCurrency}.json`
					);
					if (!res.ok) throw new Error(`Network response was not ok for ${d}`);
					const data = await res.json();
					return { date: d, data };
				})
			);

			return responses;
		}
	});
};
