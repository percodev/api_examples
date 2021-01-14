/*
* Выполнение http запросов
* */
import * as http from "http";

export class Request {
    public static send(options, data?): Promise<any | Error> {
        return new Promise((resolve, reject) => {
            // Запрос
            const req = http.request(options, (response) => {
                let data = ''
                // Получение данных с сервера
                response.on('data', (chunk) => {
                    data += chunk;
                });
                // Завершение пересылки и обработка ответа
                response.on('end', () => {
                    if (response.statusCode === 200) {
                        // Преобразуем полученные данные в объект и отдаем
                        resolve(JSON.parse(data));
                        return
                    } else {
                        // Код, отличный от 200 отклоняем как ошибку
                        const res = JSON.parse(data);
                        reject(Error(res.error || res));
                    }
                })
            })
            // Отправляем запрос
            data && req.write(data);
            // Обработка ошибок выполнения запроса
            req.on('error', (error) => {
                reject(error);
            });
            // Закрываем запрос
            req.end();
        })
    }
}
