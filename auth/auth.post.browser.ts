/* 
  /system/auth:
    post:
      description: Метод используется для авторизации по логину и паролю
      parameters:
        - name: "authData"
          in: "body"
          description: Данные для авторизации
          required: false
          schema:
            required: ['login', 'password']
            properties:
              login:
                type: "string"
                pattern: '^[0-9A-Za-z.@]+$'
              password:
                type: "string"
                format: "password"
              uid:
                type: "string"
            Example:
                {
                    "login": "user",
                    "password": "pass",
                    "uid": "some_id"
                }

      responses:
        200:
          description: "##Запрос обработан успешно##"
          schema:
            type: object
            properties:
              token:
                type: "string"
                description: "##Токен##"
        500:
          description: "##Запрос завершился с ошибкой##"
          schema:
            $ref: "#/definitions/returnError"

Пример выполнения запроса:
*/
//Структура получаемых данных
interface ResponseData {
    token?: string; //возвращается в случае успеха
    error?: string; //возвращается в случае ошибки
}

//Здесь следует использовать адрес Вашего хоста перковеба
let percoServerHost = "localhost";

//Данные с логином и паролем для отправки запроса
let bodyParams = {
    login: "admin",
    password: "admin1",
};
fetch(`http://${percoServerHost}/api/system/auth`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(bodyParams)
})
.then(response=>{
    let dataPromise = response.json() as Promise<ResponseData>;
    if(response.ok) {
        return dataPromise;
    } else {
        dataPromise.then(data=>{throw new Error(`При выполнении запроса возникла ошибка: ${data.error}`)})
    }
})
.then(data=>{
    console.log("Авторизационный токен: ",data.token)
})
.catch(error=>{
    console.log(error)
})
