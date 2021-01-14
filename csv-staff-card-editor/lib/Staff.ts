import * as config from "../config.json";
import {Request} from "./Request";
import * as querystring from "querystring";

export class Staff {
    public static async getStaffByPersonnelNumber(token, personnelNumber): Promise<StaffRow | Error> {
        // Параметры запроса
        const qs = querystring.encode({
            token,
            status: "active",
            filters: JSON.stringify(
                {
                    type: "and",
                    rows: [{column: "tabel_number", value: personnelNumber}]
                })
        })
        const options = {
            hostname: config.host, // URL сервера PW
            port: config.post, // Порт
            path: `/api/users/staff/table?` + qs, // Path API метода
            method: 'GET', // Метод запроса
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Выполнение запроса
        const staff = await Request.send(options).then(t => t.rows[0] || null).catch(c => c);
        // Обработка ошибок
        if (staff instanceof Error) {
            return staff
        }
        return staff as StaffRow;
    }
}
