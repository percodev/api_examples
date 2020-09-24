export {};
//Метод редактирования существующей должности
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль

//Структура получаемых данных
interface ResponseData {
	result?: string; //id подразделения (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Данные для отправки запроса
let bodyParams = JSON.stringify({
	comment: 'Отредактированное подразделение',
	name: 'Новое название подразделения'
});

//авторизационный токен
let token = 'master'; 

//id редактируемой должности
const positionId = 7;

//параметры http(s) запроса
const options = {
    hostname: 'localhost',
    port: 80,
    path: `/api/divisions/${positionId}?token=${token}`,
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
			console.log('Должность отредактирована успешно');
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
