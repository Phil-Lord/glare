import formatUvData from './formatUvData';
import { UvFetchResponse } from '@/types/uv';

describe('formatUvData', () => {
	const mockUvFetchResponse: UvFetchResponse = {
		latitude: 0.0,
		longitude: 0.0,
		generationtime_ms: 0.0,
		utc_offset_seconds: 0,
		timezone: 'Europe/London',
		timezone_abbreviation: 'GMT',
		elevation: 10.0,
		hourly_units: {
			time: 'iso8601',
			uv_index: ''
		},
		hourly: {
			time: ['2024-10-30T12:00', '2024-10-30T13:00'],
			uv_index: [1.50, 1.00]
		}
	}

	it('should format data correctly', async () => {
		// Given
		const expectedOutput = [
			{ time: '2024-10-30T12:00', uvIndex: 1.50 },
			{ time: '2024-10-30T13:00', uvIndex: 1.00 }
		];

		// When
		const result = formatUvData(mockUvFetchResponse);

		// Then
		expect(result).toEqual(expectedOutput);
	})
})