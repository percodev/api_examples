export {};
//Метод для множественного редактирования сотрудников
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    result?: string; //возвращается в случае успеха
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//авторизационный токен
const token = 'master';

/******Пример увольнения сотрудников *********/

//Данные для отправки запроса
let bodyParamsForDismiss = {
    is_active: false,
    dismissed_date: "2020-11-21" //дата увольнения
};

//id сотрудника(ов), которого(ых) увольняем
const idsForDismiss = '140,139';
//запрос к серверу
fetch(`http://${percoServerHost}/api/users/staff?ids=${idsForDismiss}&token=${token}`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParamsForDismiss)
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
.then(()=>{
    console.log(`Сотрудник(и) с id=${idsForDismiss} успешно уволен(ы):`)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})


/******Пример блокировки сотрудника *********/

//Данные для отправки запроса
let bodyParamsForBlock = {
    is_block: true,
};

//id сотрудника(ов), которого(ых) блокируем
const idsForBlock = '140,139';
//запрос к серверу
fetch(`http://${percoServerHost}/api/users/staff?ids=${idsForBlock}&token=${token}`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParamsForBlock)
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
.then(()=>{
    console.log(`Сотрудник(и) с id=${idsForBlock} успешно заблокированы(ы):`)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})