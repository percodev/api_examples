//Method of receiving staff list
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module
import { Staff } from "../../types/staff.model";
import querystring from "querystring";

//Response data structure
interface ErrorData {
	error?: string; //Returned in case of error
}
type ResponseData = ErrorData | Staff;

//Authorization token
const token = 'user_token';

// Form a string of parameters
let queryString = querystring.stringify({
	division: ['3','4','5'], //Division(s)
	searchString: 'Richard' //Search string
})

//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff/list?${queryString}`,
    method: 'GET',
	headers: { 'Authorization': `Bearer ${token}` }
};
console.log(options)
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
			console.log(`Staff list: `, responseData);
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
