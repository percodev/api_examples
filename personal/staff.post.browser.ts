export {};
//Метод редактирования сотрудника
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    result?: string; //возвращается в случае успеха
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//Данные для отправки запроса
let bodyParams = {
	last_name: 'Семенов',
	first_name: 'Семен',
	middle_name: 'Олегович',
	tabel_number: '12345678',
	division: 4,
	position: 4,
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

//авторизационный токен
const token = 'bUDkzABNuYI1QN94Z3FZQqhvK54osBk9';

//id сотрудника, данные которого редактируем
const userId = 140;

//запрос к серверу
fetch(`http://${percoServerHost}/api/users/staff/${userId}?token=${token}`,{
    method: 'post',
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
    console.log("Результат операции: ",data.result)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})
