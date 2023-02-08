import { DeviceCommandBlock } from '../../types/devices.model';
//Method for receiving all available device commands
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module

//Response data structure
type ResponseData = ErrorData | DeviceCommandBlock[];

interface ErrorData {
	error?: string; //Returned in case of error
}


//Authorization token
let token = 'user_token';

//device id
const deviceId = 696590;

//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/devices/${deviceId}/commandList`,
    method: 'GET',
	headers: { 'Authorization': `Bearer ${token}` }
};

//Server request
const req = http.request(options, (response) => {
	let data = '';
	//Get data from the server
	response.on('data', (chunk) => {
		data += chunk;
	});
	//Handling of received data
	response.on('end', () => {
        //Decode the response in json format
		let responseData = JSON.parse(data) as ResponseData;
		//If the server returns a code of 200, then we process the data
		if (response.statusCode === 200) {
			console.log(`device command list with id=${deviceId}: `, responseData);
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(`An error occurred while executing the request ${(<ErrorData>responseData).error}`);
		}
	});
});

//Handling errors occurred during request execution
req.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
req.end();
