export {};
//Метод для множественного редактирования сотрудников
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль
import querystring from "querystring";

//Структура получаемых данных
interface ResponseData {
	result?: number; //id сотрудника (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

/******Пример увольнения сотрудников *********/

//Данные body для отправки запроса на увольнение
let bodyParamsForDismiss = JSON.stringify({
	is_active: false,
    dismissed_date: "2020-11-21" //дата увольнения
});

//id сотрудника(ов), которого(ых) редактируем (увольняем)
let idsForDismiss = ['140','139'];

// Формируем строку параметров
let queryStringForDismiss = querystring.stringify({
	token: 'master', //авторизационный токен
	ids:idsForDismiss
})

//параметры http(s) запроса
const optionsForDismiss = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff?${queryStringForDismiss}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParamsForDismiss),
    },
    
};

//запрос к серверу
const reqForDismiss = http.request(optionsForDismiss, (response) => {
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
			console.log(`Сотрудник(и) с id=${idsForDismiss} успешно уволен(ы):`)
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(`При выполнении запроса возникла ошибка: ${responseData.error}`);
		}
	});
});

//отправляем тело запроса
reqForDismiss.write(bodyParamsForDismiss);

//обработка ошибок, возникших при выполнении запроса
reqForDismiss.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
reqForDismiss.end();

/******Пример блокировки сотрудника *********/

//Данные body для отправки запроса на блокировку
let bodyParamsForBlock = JSON.stringify({
	is_block: true,
});

//id сотрудника(ов), которого(ых) блокируем
let idsForBlock = ['140','139'];

// Формируем строку параметров
let queryStringForBlock = querystring.stringify({
	token: 'master', //авторизационный токен
	ids:idsForBlock
})

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/users/staff?${queryStringForBlock}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyParamsForBlock),
    },
    
};

//запрос к серверу
const reqForBlock = http.request(options, (response) => {
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
			console.log(`Сотрудник(и) с id=${idsForBlock} успешно заблокирован(ы):`)
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(`При выполнении запроса возникла ошибка: ${responseData.error}`);
		}
	});
});

//отправляем тело запроса
reqForBlock.write(bodyParamsForBlock);

//обработка ошибок, возникших при выполнении запроса
reqForBlock.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
reqForBlock.end();
