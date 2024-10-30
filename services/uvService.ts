const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=uv_index&timezone=Europe%2FLondon&past_hours=6&forecast_days=1&forecast_hours=6";
// const PARAMS = {
// 	"latitude": 53.9908,
// 	"longitude": -1.5373,
// 	"hourly": "uv_index",
// 	"timezone": "Europe/London",
// 	"past_hours": 6,
// 	"forecast_days": 1,
// 	"forecast_hours": 6
// };

export interface UvFetchResponse {
	latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        uv_index: string;
    };
	hourly: {
		time: string[];
		uv_index: number[];
	};
}

const fetchUvData = async (): Promise<UvFetchResponse> => {
	try {
		const response = await fetch(API_URL);
		// const responseJson = await response.json();
		return await response.json() as UvFetchResponse;
	} catch (error) {
		console.error('Failed to fetch weather data:', error);
		throw error;
	}
}

export default fetchUvData;