export {};
import { Division } from "../models/division.model";
//Метод получения данных подразделения
//Реализация на стороне браузера

//Структура получаемых данных
type ResponseData = ErrorData & Division;

interface ErrorData {
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//авторизационный токен
const token = 'master';

//id подразделения
const divisionId = 10;

//запрос к серверу
fetch(`http://${percoServerHost}/api/divisions/${divisionId}?token=${token}`, {
	method: 'get',
})
	.then(async (response) => {
		//декодируем ответ в формате json
		let data = (await response.json()) as ResponseData;
		//если сервер вернул код ответа 200, то передаем декодированные данные
		//в следующий обработчик then
		if (response.ok) {
			return data;
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(data.error);
		}
	})
	//обрабатываем полученные данные в случае успешного ответа сервера
	.then((data) => {
		console.log(`Данные подразделения с id=${divisionId}: `, data);
	})
	//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
	.catch((error) => {
		console.log(error.message);
	});
