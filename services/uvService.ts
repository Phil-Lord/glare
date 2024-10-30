import { UvFetchResponse } from "@/types/uv";

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=uv_index&timezone=Europe%2FLondon&past_hours=6&forecast_days=1&forecast_hours=6";

const fetchUvData = async (): Promise<UvFetchResponse> => {
	try {
		const response = await fetch(API_URL);
		return await response.json() as UvFetchResponse;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		throw error;
	}
}

export default fetchUvData;