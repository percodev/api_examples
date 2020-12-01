export {};
//Operator session deletion method
//Browser side implementation

//Response data structure
interface ResponseData {
	error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = 'localhost';

//Authorization token
let token = 'user_token'; //Must substitute a valid token

//Server request
fetch(`http://${percoServerHost}/api/system/auth?token=${token}`, {
	method: 'delete',
	headers: {
		'Content-Type': 'application/json',
	}
})
	.then(async (response) => {
		//Decode the response in json format
		let data = (await response.json()) as ResponseData;
		//If the server returns a code of 200, then we process the data
		if (response.ok) {
			console.log('Operator session successfully reset');
		}
		//If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
		else {
			throw new Error(data.error);
		}
	})
	//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
	.catch((error) => {
		console.log(error.message);
	});
