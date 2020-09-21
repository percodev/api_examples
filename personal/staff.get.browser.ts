import { Staff } from "../models/staff.model";
//Метод получения информации о сотруднике
//Реализация на стороне браузера

//Структура получаемых данных

interface ErrorData {
    error?: string; //возвращается в случае ошибки
}


type ResponseData = ErrorData & Staff;

//Здесь следует использовать адрес хоста percoweb
let percoServerHost = "localhost";

//авторизационный токен
const token = 'master';

//id сотрудника, данные которого получаем
const userId = 140;

//запрос к серверу
fetch(`http://${percoServerHost}/api/users/staff/${userId}?token=${token}`,{
    method: 'get'
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
    console.log(`Данные сотрудника с id=${userId}: `,data)
})
//обрабатываем все возможные ошибки, которые могут возникнуть во время выполнения fetch (например недоступность сервера)
.catch(error=>{
    console.log(error.message)
})
