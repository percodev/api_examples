export {};
//Method of adding new staff
//Browser side implementation

//Response data structure
interface ResponseData {
    id?: number; //Staff id (Returned in case of success)
    error?: string; //Returned in case of error
}

//Must use your percoweb host address here
let percoServerHost = "localhost";

//Request data
let bodyParams = {
	last_name: 'Feynman',
	first_name: 'Richard',
	middle_name: 'Phillips',
	tabel_number: '12345678',
	division: 5,
	position: 5,
	work_schedule: 5,
	access_template: 3,
	additional_fields: {
		text: [
			{ id: -5, text: 'feynman@mail.com' },
			{ id: -4, text: '+79654323455' },
			{ id: -2, text: '1234' },
		],
		image: [],
	},
	hiring_date: '2020-09-17'
};

//Authorization token
let token = 'master'; 

//Server request
fetch(`http://${percoServerHost}/api/users/staff?token=${token}`,{
    method: 'put',
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
//handle the received data in case of a successful server response
.then(data=>{
    console.log("Staff id: ",data.id)
})
//handle all possible errors that may occur during the execution of the "fetch" (e.g. server unavailability)
.catch(error=>{
    console.log(error.message)
})
