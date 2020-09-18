export {};
//Метод удаления сессии оператора
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
	error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = 'localhost';

//Данные с авторизационным токеном
let token = '5Dth6VMgWWUzqDAkXfhXKkjqwAqTteCW'; //Необходимо подставить действующий токен

fetch(`http://${percoServerHost}/api/system/auth?token=${token}`, {
	method: 'delete',
	headers: {
		'Content-Type': 'application/json',
	}
})
	.then(async (response) => {
		//декодируем ответ в формате json
		let data = (await response.json()) as ResponseData;
		//если сервер вернул код ответа 200, то обрабатываем данные
		if (response.ok) {
			console.log('Сессия оператора успешно сброшена');
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
