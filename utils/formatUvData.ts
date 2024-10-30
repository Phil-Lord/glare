import { UvFetchResponse } from '../types/uv';
import { UvData } from '../types/uv';

const formatUvData = (data: UvFetchResponse): UvData[] => {
	const hourlyUvData = data.hourly;
	const times = hourlyUvData.time;
	const uvIndicies = hourlyUvData.uv_index;

	return times.map((time, i) => ({
		time,
		uvIndex: uvIndicies[i]
	}) as UvData);
}

export default formatUvData;