export {};
//Метод для увольнения сотрудника
//Реализация на стороне браузера

//Структура получаемых данных
interface ResponseData {
    result?: string; //возвращается в случае успеха
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//Данные для отправки запроса
let bodyParams = {
    is_active: false,
    dismissed_date: "2020-09-21" //дата увольнения
};

//авторизационный токен
const token = 'master';

//id сотрудника(ов), которого(ых) увольняем
const ids = '140,139';
//запрос к серверу
fetch(`http://${percoServerHost}/api/users/staff?ids=${ids}&token=${token}`,{
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
.then(()=>{
    console.log(`Сотрудник(и) с id=${ids} успешно уволен(ы):`)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})
