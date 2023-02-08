export {};
//Multiple staff editing method
//Browser side implementation

//Response data structure
interface ResponseData {
    result?: string; //Returned in case of success
    error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = "localhost";

//Authorization token
const token = 'user_token';

/******Dismissal staff example *********/

//Request data
let bodyParamsForDismiss = {
    is_active: false,
    dismissed_date: "2020-11-21" //date of dismissal
};

//id(s) of the staff to be dismissed
const idsForDismiss = '140,139';
//Server request
fetch(`http://${percoServerHost}/api/users/staff?ids=${idsForDismiss}`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bodyParamsForDismiss)
})
    .then(async response => {
        //Decode the response in json format
        let data = await response.json() as ResponseData;
        //If the server returns a code of 200, then we process the data
        //in next "then" handler
        if (response.ok) {
            return data;
        }
        //If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
        else {
            throw new Error(data.error)
        }
    })
    //handle the received data in case of a successful server response
    .then(() => {
        console.log(`Staff(s) with id=${idsForDismiss} succesfully dismissed:`)
    })
    //handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
    .catch(error => {
        console.log(error.message)
    })


/******Staff blocking example *********/

//Request data
let bodyParamsForBlock = {
    is_block: true,
};

//id(s) of the staff to be blocked
const idsForBlock = '140,139';
//Server request
fetch(`http://${percoServerHost}/api/users/staff?ids=${idsForBlock}&token=${token}`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyParamsForBlock)
})
    .then(async response => {
        //Decode the response in json format
        let data = await response.json() as ResponseData;
        //If the server returns a code of 200, then we process the data
        //in next "then" handler
        if (response.ok) {
            return data;
        }
        //If an error occurs on the server side, then we throw an error with its description (the error description is returned by the server)
        else {
            throw new Error(data.error)
        }
    })
    //handle the received data in case of a successful server response
    .then(() => {
        console.log(`Staff(s) with id=${idsForBlock} succesfully blocked`)
    })
    //handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
    .catch(error => {
        console.log(error.message)
    })
