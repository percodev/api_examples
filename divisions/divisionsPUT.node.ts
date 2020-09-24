export {};
//Метод создания нового подразделения
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль

//Структура получаемых данных
interface ResponseData {
	id?: number; //id подразделения (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Данные для отправки запроса
let bodyParams = JSON.stringify({
	accompanying: 136,
	comment: 'Подразделение под номером два',
	name: 'Второе подразделение',
	staff_access_template: 51,
	tel: '+79654563423',
	visitor_access_template: 52,
	work_schedule: 5,
});

//авторизационный токен
let token = 'master'; 
//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/divisions?token=${token}`,
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParams),
    },
    
};

//запрос к серверу
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
			console.log('ID созданного подразделения: ', responseData.id);
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
