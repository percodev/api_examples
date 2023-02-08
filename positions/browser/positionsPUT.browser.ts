export {};
//Method of creating new position
//Browser side implementation

//Response data structure
interface ResponseData {
	id?: number; //Position id (Returned in case of success)
	error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = 'localhost';

//Request data
let bodyParams = {
	comment: "Software development",
	name: "Software engineer"
};

//Authorization token
let token = 'user_token';

//Server request
fetch(`http://${percoServerHost}/api/positions`, {
	method: 'put',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	},
	body: JSON.stringify(bodyParams),
})
	.then(async (response) => {
		//Decode the response in json format
		let data = (await response.json()) as ResponseData;
		//If the server returns a code of 200, then we process the data
		//in next "then" handler
		if (response.ok) {
			return data;
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(data.error);
		}
	})
	//handle the received data in case of a successful server response
	.then((data) => {
		console.log('Id of created division: ', data.id);
	})
	//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
	.catch((error) => {
		console.log(error.message);
	});
