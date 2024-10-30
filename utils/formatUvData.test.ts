import formatUvData from './formatUvData';
import fetchUvData from "@/services/uvService";

describe('formatUvData', () => {
	it('should format data correctly', async () => {
		const expectedOutput = [{ time: '2024-10-29 00:00', index: 1 }];

		const data = await fetchUvData();

		const result = formatUvData(data);
		expect(result).toEqual(expectedOutput);
	})
})