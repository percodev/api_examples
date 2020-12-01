export {};
//Admin password setting method
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module

//Response data structure
interface ResponseData {
    error?: string; //Returned in case of error
}

//Login and password data
let bodyParams = JSON.stringify({
	login: 'admin',
    password: 'password',
    region_id: 0
});

//http(s) request parameters
const options = {
	hostname: 'localhost', //Must use your percoweb host address here
	port: 80, //In case of an https request, you must specify port 443
	path: '/api/system/auth',
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(bodyParams),
	},
};

//Server request
const req = http.request(options, (response) => {
    let data = ''
    //Get data from the server
	response.on('data', (chunk) => {
		data += chunk;
    });
    //Handling of received data
    response.on('end', () => {
        //Decode the response in json format
        let responseData = JSON.parse(data) as ResponseData;
        //If the server returns a code of 200, then we process the data
        if(response.statusCode === 200) {
            console.log("Login and password are set successfully")
        }
        //If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
        else {
            throw new Error(`An error occurred while executing the request ${responseData.error}`)
        }
    })
});

//Sending request body
req.write(bodyParams);

//Handling errors occurred during request execution
req.on('error', (error) => {
	console.error(error.message);
});

//Completing the request
req.end();
