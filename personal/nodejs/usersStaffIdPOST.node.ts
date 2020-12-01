export {};
//Editing staff method
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module

//Response data structure
interface ResponseData {
	result?: number; //iReturned in case of success
	error?: string; //Returned in case of error
}

//Request data
let bodyParams = JSON.stringify({
	last_name: 'Feynman',
	first_name: 'Richard',
	middle_name: 'Phillips',
	tabel_number: '12345678',
	division: 5,
	position: 5,
	work_schedule: 5,
	access_template: 3,
	additional_fields: {
		text: [
			{ id: -5, text: 'feynman@mail.com' },
			{ id: -4, text: '+79654323455' },
			{ id: -2, text: '1234' },
		],
		image: [],
	},
	hiring_date: '2020-09-17'
});

//Authorization token
const token = 'user_token';

//Staff id
const userId = 140;
//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff/${userId}?token=${token}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParams),
    },
    
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
			console.log('Operation result: ', responseData.result);
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(`An error occurred while executing the request ${responseData.error}`);
		}
	});
});

//Sending request body
req.write(bodyParams);

//Handling errors occurred during request execution
req.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
req.end();
