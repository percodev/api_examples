//Метод добавления нового сотрудника
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль
import { Staff } from "../models/staff.model";
import querystring from "querystring";

//Структура получаемых данных
interface ErrorData {
	error?: string; //возвращается в случае ошибки
}
type ResponseData = ErrorData & Staff;


//Подразделение(я)
let division = '3,4,5'

//Строка поиска
let searchString = 'Семен'

// Формируем строку параметров
let queryString = querystring.stringify({
	token: '5AmYlxheHEl6HrLUDiCfoh0ZJxzqMljR',
	division: ['3','4','5'],
	searchString: 'Семен'
})

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff/list?${queryString}`,
    method: 'GET'
};
console.log(options)
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
			console.log(`Список сотрудников: `, responseData);
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
