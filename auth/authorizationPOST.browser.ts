export {};
//Password-Based user authentication method
//Browser side implementation

//Response data structure
interface ResponseData {
    token?: string; //Returned in case of success
    error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = "localhost";

//Login and password data
let bodyParams = {
    login: "admin",
    password: "admin1",
};

//Server request
fetch(`http://${percoServerHost}/api/system/auth`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParams)
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
        throw new Error(data.error)
    }
})
//handling response data in case of a successful response
.then(data=>{
    console.log("Authorization token: ",data.token)
})
//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
.catch(error=>{
    console.log(error)
})
