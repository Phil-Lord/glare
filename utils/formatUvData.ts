import { UvFetchResponse } from '../services/uvService';

interface uvData {
	time: string,
	uvIndex: number
}

const formatUvData = (data: UvFetchResponse): uvData[] => {
	const hourlyUvData = data.hourly;
	const times = hourlyUvData.time;
	const uvIndicies = hourlyUvData.uv_index;

	return times.map((time, i) => ({
		time,
		uvIndex: uvIndicies[i]
	}) as uvData);
}

export default formatUvData;