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

export interface UvData {
	time: string,
	uvIndex: number
}