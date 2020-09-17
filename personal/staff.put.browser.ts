export {};
//Метод авторизации по логину и паролю
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    id?: number; //id сотрудника (возвращается в случае успеха)
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//Данные для отправки запроса
let bodyParams = {
	last_name: 'Семенов',
	first_name: 'Семен',
	middle_name: 'Семенович',
	tabel_number: '12345678',
	division: 5,
	position: 5,
	work_schedule: 5,
	access_template: 3,
	additional_fields: {
		text: [
			{ id: -5, text: 'semenov@mail.com' },
			{ id: -4, text: '+79654323455' },
			{ id: -2, text: '1234' },
		],
		image: [],
	},
	hiring_date: '2020-09-17'
};

console.log(bodyParams)
//авторизационный токен
let token = 'zQkj92MloJ1PrZ45hYx0YsppzC77STto'; 

fetch(`http://${percoServerHost}/api/users/staff?token=${token}`,{
    method: 'put',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParams)
})
.then(async response=>{
    //декодируем ответ в формате json
    let data = await response.json() as ResponseData ;
    //если сервер вернул код ответа 200, то передаем декодированные данные
    //в следующий обработчик then
    if(response.ok) {
        return data;
    }
    //если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
    else {
        throw new Error(data.error)
    }
})
//обрабатываем полученные данные в случае успешного ответа сервера
.then(data=>{
    console.log("ID сотрудника: ",data.id)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error)
})
