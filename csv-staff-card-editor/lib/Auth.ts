/*
* Авторизация в PERCo-Web
* */
import * as config from "../config.json";
import {Request} from "./Request";

export class Auth {
    public static get(): Promise<AuthResponseData | Error> {
        // Данные запроса на авторизацию - логин и пароль
        let bodyParams = JSON.stringify({
            login: config.auth.login,
            password: config.auth.password
        });
        // Параметры запроса
        const options = {
            hostname: config.host, // URL сервера PW
            port: config.post, // Порт
            path: '/api/system/auth', // Path API метода
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyParams),
            },
        };
        // Выполнение запроса
        return Request.send(options, bodyParams)
    }
}
