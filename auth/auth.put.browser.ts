export {};
//Метод установки логина, пароля администратора и региона при первом входе в систему
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//Данные с логином, паролем и регионом для отправки запроса
let bodyParams = {
    login: "admin",
    password: "admin1",
    region_id: 0
};
fetch(`http://${percoServerHost}/api/system/auth`,{
    method: 'put',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParams)
})
.then(async response=>{
    //декодируем ответ в формате json
    let data = await response.json() as ResponseData ;
    //если сервер вернул код ответа 200, то обрабатываем данные
    if(response.ok) {
        console.log("Логин и пароль установлены успешно")
    }
    //если возникла ошибка на стороне сервера, то выбрасываем ошибку с ее описанием (описание ошибки возвращается серером)
    else {
        throw new Error(data.error)
    }
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})
