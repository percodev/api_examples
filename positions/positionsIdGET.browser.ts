export {};
import { Position } from "../types/position.model";
//Method of receiving position data
//Browser side implementation

//Response data structure
type ResponseData = ErrorData | Position;

interface ErrorData {
	error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = 'localhost';

//Authorization token
const token = 'user_token';

//Position id
const positionId = 7;

//Server request
fetch(`http://${percoServerHost}/api/positions/${positionId}?token=${token}`, {
	method: 'get',
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
			throw new Error((<ErrorData>data).error);
		}
	})
	//handle the received data in case of a successful server response
	.then((data) => {
		console.log(`Position data with id=${positionId}: `, data);
	})
	//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
	.catch((error) => {
		console.log(error.message);
	});
