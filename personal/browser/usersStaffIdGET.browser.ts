import { Staff } from "../../types/staff.model";
//Method of receiving staff info
//Browser side implementation

//Response data structure

interface ErrorData {
    error?: string; //Returned in case of error
}


type ResponseData = ErrorData | Staff;

//Must use your percoweb host address here
let percoServerHost = "localhost";

//Authorization token
const token = 'user_token';

//Staff id
const userId = 140;

//Server request
fetch(`http://${percoServerHost}/api/users/staff/${userId}?token=${token}`,{
    method: 'get'
})
.then(async response=>{
    //Decode the response in json format
    let data = await response.json() as ResponseData ;
    //If the server returns a code of 200, then we process the data
    //in next "then" handler
    if(response.ok) {
        return data;
    }
    //If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
    else {
        throw new Error((<ErrorData>data).error)
    }
})
//handle the received data in case of a successful server response
.then(data=>{
    console.log(`Staff info with id=${userId}: `,data)
})
//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
.catch(error=>{
    console.log(error.message)
})
