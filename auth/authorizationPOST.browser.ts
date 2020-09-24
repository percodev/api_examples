export {};
//Метод авторизации по логину и паролю
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    token?: string; //возвращается в случае успеха
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//Данные с логином и паролем для отправки запроса
let bodyParams = {
    login: "admin",
    password: "admin1",
};

//запрос к серверу
fetch(`http://${percoServerHost}/api/system/auth`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParams)
})
.then(async response=>{
    //декодируем ответ в формате json
    let data = await response.json() as ResponseData ;
    //если сервер вернул код ответа 200, то передаем декодированные данные
    //в следующий обработчик then
    if(response.ok) {
        return data;
    }
    //если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
    else {
        throw new Error(data.error)
    }
})
//обрабатываем полученные данные в случае успешного ответа сервера
.then(data=>{
    console.log("Авторизационный токен: ",data.token)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error)
})
