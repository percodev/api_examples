export {};
import { Position } from "../models/position.model";
//Метод получения списка должностей
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль

//Структура получаемых данных
type ResponseData = ErrorData | Position[];

interface ErrorData {
	error?: string; //возвращается в случае ошибки
}


//авторизационный токен
let token = 'master'; 

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/positions/list?token=${token}`,
    method: 'GET'
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
			console.log(`Список  должностей: `, data);
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(`При выполнении запроса возникла ошибка: ${(<ErrorData>responseData).error}`);
		}
	});
});

//обработка ошибок, возникших при выполнении запроса
req.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
req.end();