export {};
import { DeviceCommand } from "../types/devices.model";
//Метод отправки команды на устройство
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
	result?: string; //id подразделения (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//Данные для отправки запроса
let bodyParams = <DeviceCommand>{
    cmdNumber:1,
    cmdType:0,
    cmdValue:3,
    cmdParam:5000
};

//авторизационный токен
const token = 'master';

//id устройства
const deviceId = 696590;


//запрос к серверу
fetch(`http://${percoServerHost}/api/devices/${deviceId}/command?token=${token}`, {
	method: 'post',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(bodyParams),
})
	.then(async (response) => {
		//декодируем ответ в формате json
		let data = (await response.json()) as ResponseData;
		//если сервер вернул код ответа 200, то передаем декодированные данные
		//в следующий обработчик then
		if (response.ok) {
			console.log('Команда успешно выполнена');
		}
		//если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
		else {
			throw new Error(data.error);
		}
	})
	//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
	.catch((error) => {
		console.log(error.message);
	});
