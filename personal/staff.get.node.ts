//Метод добавления нового сотрудника
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль
import { Staff } from "../models/staff.model";

//Структура получаемых данных
interface ErrorData {
	error?: string; //возвращается в случае ошибки
}
type ResponseData = ErrorData & Staff;

//авторизационный токен
const token = 'master'; 

//id сотрудника, данные которого получаем
const userId = 140;

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff/${userId}?token=${token}`,
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
			console.log(`Данные сотрудника с id=${userId}: `, responseData);
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(`При выполнении запроса возникла ошибка: ${responseData.error}`);
		}
	});
});

//обработка ошибок, возникших при выполнении запроса
req.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
req.end();
