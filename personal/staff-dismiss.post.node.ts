export {};
//Метод добавления нового сотрудника
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль
import querystring from "querystring";

//Структура получаемых данных
interface ResponseData {
	result?: number; //id сотрудника (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Данные body для отправки запроса
let bodyParams = JSON.stringify({
	is_active: false,
    dismissed_date: "2020-09-21" //дата увольнения
});

//id сотрудника(ов), которого(ых) увольняем
let ids = ['140','139'];

// Формируем строку параметров
let queryString = querystring.stringify({
	token: 'master', //авторизационный токен
	ids
})

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff?${queryString}`,
    method: 'POST',
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
			console.log(`Сотрудник(и) с id=${ids} успешно уволен(ы):`)
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
