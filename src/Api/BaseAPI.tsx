import axios from 'axios';

let baseUrl = 'http://localhost:3000/';
const response = (data: any, error: any) => ({ data, error });

async function post(endpointURL: any, data: any, config: any) {
	try {
		const serverResponse = await axios.post(
			`${baseUrl}${endpointURL}`,
			data,
			config
		);
		return response(serverResponse, '');
	} catch (error: any) {
		return response('', error.message);
	}
}

async function get(endpointURL: any, config: any) {
	try {
		const serverResponse = await axios.get(`${baseUrl}${endpointURL}`, config);
		return response(serverResponse, '');
	} catch (error: any) {
		return response('', error.message);
	}
}

export default { post, get };
