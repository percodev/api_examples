export {};
//Метод удаления существующего подразделения
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
	result?: string; //id подразделения (возвращается в случае успеха)
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//авторизационный токен
const token = 'master';

//id удаляемого подразделения
const divisionId = 11;


//запрос к серверу
fetch(`http://${percoServerHost}/api/divisions/${divisionId}?token=${token}`, {
	method: 'delete'
})
	.then(async (response) => {
		//декодируем ответ в формате json
		let data = (await response.json()) as ResponseData;
		//если сервер вернул код ответа 200, то передаем декодированные данные
		//в следующий обработчик then
		if (response.ok) {
			console.log('Подразделение удалено успешно');
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