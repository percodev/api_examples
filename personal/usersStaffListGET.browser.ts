import { Staff } from "../types/staff.model";
//Method of receiving staff list
//Browser side implementation

//Response data structure

interface ErrorData {
    error?: string; //Returned in case of error
}


type ResponseData = ErrorData | Staff[];

//Must use your percoweb host address here
let percoServerHost = "localhost";

//Authorization token
const token = 'user_token';

//Division(s)
let division = '3,4,5'

//Search string
let searchString = 'Richard'

// Form a string of parameters
let queryString = `token=${token}&searchString=${searchString}&division=${division}`;

//Server request
fetch(`http://${percoServerHost}/api/users/staff/list?${queryString}`,{
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
    console.log(`Staff list: `,data)
})
//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
.catch(error=>{
    console.log(error.message)
})
