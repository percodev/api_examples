export {};
//Method of creating new division
//Nodejs server side implementation
import http from 'http'; //in case of https request, you need to import the https module

//Response data structure
interface ResponseData {
    id?: number; //division id (Returned in case of success)
    error?: string; //Returned in case of error
}

//Request data
let bodyParams = JSON.stringify({
    accompanying: 136,
    comment: 'Division number two',
    name: 'Second division',
    staff_access_template: 51,
    tel: '+79654563423',
    visitor_access_template: 52,
    work_schedule: 5,
});

//Authorization token
let token = 'user_token';
//http(s) request parameters
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/divisions`,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParams),
        'Authorization': `Bearer ${token}`
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
            console.log('Id of created division ', responseData.id);
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
