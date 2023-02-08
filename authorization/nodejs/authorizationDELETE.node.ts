export {};
//Operator session deletion method
//Nodejs server side implementation
import http from 'http'; //In case of https request, you need to import the https module

//Response data structure
interface ResponseData {
    error?: string; //Returned in case of error
}

//Authorization token
let token = 'user_token'; //Must substitute a valid token
//http(s) request parameters
const options = {
	hostname: 'localhost', //Must use your percoweb host address here
	port: 80, //In case of an https request, you must specify port 443
	path: `/api/system/auth`,
	method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
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
            console.log("Session deleted")
        }
        //If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
        else {
            throw new Error(`An error occurred while executing the request ${responseData.error}`)
        }
    })
});

//Handling errors occurred during request execution
req.on('error', (error) => {
	console.error(error.message);
});

//completing the request
req.end();
