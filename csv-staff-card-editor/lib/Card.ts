/*
* Выдача карты сотруднику
* */
import * as config from "../config.json";
import {Request} from "./Request";

export class Card {
    // Выдача основной карты сотруднику
    public static postMainCard(token, userId, card): Promise<ResponseData | Error> {
        // Пересылаемые данные
        const bodyParams = JSON.stringify({
            identifier: card
        })
        // Параметры запроса
        const options = {
            hostname: config.host, // URL сервера PW
            port: config.post, // Порт
            path: `/api/users/${userId}/mainCard`, // Path API метода
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyParams),
                'Authorization': `Bearer ${token}`,
            },
        };
        // Выполнение запроса
        return Request.send(options, bodyParams)
    }

    // Изъятие основной карты у сотрудника
    public static removeMainCard(token, userId): Promise<ResponseData | Error> {
        // Параметры запроса
        const options = {
            hostname: config.host, // URL сервера PW
            port: config.post, // Порт
            path: `/api/users/${userId}/mainCard`, // Path API метода
            method: 'DELETE', // Метод запроса
            headers: { 'Authorization': `Bearer ${token}` }
        };
        // Выполнение запроса
        return Request.send(options)
    }
}
