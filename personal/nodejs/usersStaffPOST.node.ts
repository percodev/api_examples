export {};
//Multiple staff editing method
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module
import querystring from "querystring";

//Response data structure
interface ResponseData {
	result?: number; //Staff id (Returned in case of success)
	error?: string; //Returned in case of error
}

//Authorization token
const token = 'user_token';

/******Dismissal staff example *********/

let bodyParamsForDismiss = JSON.stringify({
	is_active: false,
    dismissed_date: "2020-11-21"
});

//id(s) of the staff to be dismissed
let idsForDismiss = ['140','139'];

// Form a string of parameters
let queryStringForDismiss = querystring.stringify({
	ids:idsForDismiss
})

//http(s) request parameters
const optionsForDismiss = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff?${queryStringForDismiss}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParamsForDismiss),
		'Authorization': `Bearer ${token}`
    },
    
};

//Server request
const reqForDismiss = http.request(optionsForDismiss, (response) => {
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
			console.log(`Staff(s) with id=${idsForDismiss} succesfully dismissed:`)
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(`An error occurred while executing the request ${responseData.error}`);
		}
	});
});

//Sending request body
reqForDismiss.write(bodyParamsForDismiss);

//Handling errors occurred during request execution
reqForDismiss.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
reqForDismiss.end();

/******Staff blocking example *********/

let bodyParamsForBlock = JSON.stringify({
	is_block: true,
});

//id(s) of the staff to be blocked
let idsForBlock = ['140','139'];

// Form a string of parameters
let queryStringForBlock = querystring.stringify({
	token: 'user_token', //Authorization token
	ids:idsForBlock
})

//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff?${queryStringForBlock}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParamsForBlock),
    },
    
};

//Server request
const reqForBlock = http.request(options, (response) => {
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
			console.log(`Staff(s) with id=${idsForBlock} succesfully blocked`)
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(`An error occurred while executing the request ${responseData.error}`);
		}
	});
});

//Sending request body
reqForBlock.write(bodyParamsForBlock);

//Handling errors occurred during request execution
reqForBlock.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
reqForBlock.end();
