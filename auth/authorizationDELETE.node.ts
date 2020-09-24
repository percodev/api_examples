export {};
//Метод авторизации по логину и паролю
//Реализация на стороне сервера nodejs
import http from 'http'; //в случае https запроса следует импортировать https модуль

//Структура получаемых данных
interface ResponseData {
    error?: string; //возвращается в случае ошибки
}

//Данные с авторизационным токеном
let token = 'master'; //Необходимо подставить действующий токен
//параметры http(s) запроса
const options = {
	hostname: 'localhost', //здесь неоходимо подставить адрес хоста percoweb
	port: 80, //в случае https запроса следует указывать 443
	path: `/api/system/auth?token=${token}`,
	method: 'DELETE',
};

//запрос к серверу
const req = http.request(options, (response) => {
    let data = ''
    //получаем данные от сервера
	response.on('data', (chunk) => {
		data += chunk;
    });
    //обработка полученных данных
    response.on('end', () => {
        //декодируем данные в json
        let responseData = JSON.parse(data) as ResponseData;
        //если сервер вернул код ответа 200, то обрабатываем успешный ответ
        if(response.statusCode === 200) {
            console.log("Сессия оператора успешно сброшена")
        }
        //если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
        else {
            throw new Error(`При выполнении запроса возникла ошибка: ${responseData.error}`)
        }
    })
});

//обработка ошибок, возникших при выполнении запроса
req.on('error', (error) => {
	console.error(error.message);
});

//завершаем запрос
req.end();
