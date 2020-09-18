export {};
//Метод добавления нового сотрудника
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль

//Структура получаемых данных
interface ResponseData {
	result?: number; //id сотрудника (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Данные для отправки запроса
let bodyParams = JSON.stringify({
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
});

//авторизационный токен
const token = 'bUDkzABNuYI1QN94Z3FZQqhvK54osBk9'; 

//id сотрудника, данные которого редактируем
const userId = 140;
//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff/${userId}?token=${token}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParams),
    },
    
};

const req = http.request(options, (response) => {
	let data = '';
	//получаем данные от сервера
	response.on('data', (chunk) => {
		data += chunk;
	});
	//обработка полученных данных
	response.on('end', () => {
        //декодируем данные в json
		let responseData = JSON.parse(data) as ResponseData;
		//если сервер вернул код ответа 200, то обрабатываем успешный ответ
		if (response.statusCode === 200) {
			console.log('Результат операции: ', responseData.result);
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(`При выполнении запроса возникла ошибка: ${responseData.error}`);
		}
	});
});

//отправляем тело запроса
req.write(bodyParams);

//обработка ошибок, возникших при выполнении запроса
req.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
req.end();
