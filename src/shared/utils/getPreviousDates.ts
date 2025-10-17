export const getPreviousDates = (date: string, days: number): string[] => {
	const result: string[] = [];
	const base = new Date(date);

	for (let i = 0; i < days; i++) {
		const d = new Date(base);
		d.setDate(base.getDate() - i);
		result.push(d.toISOString().split('T')[0]);
	}

	return result;
};
