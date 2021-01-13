// Данные, возвращаемые методом authorizationPOST
interface AuthResponseData {
    token?: string; // при успешном запросе
    error?: string; // в случае ошибки
}
// Универсальный формат возврата методов
interface ResponseData {
    result?: string; // при успешном запросе
    error?: string; // в случае ошибки
}
// Массив изменений карт сотрудников в файле
interface CacheCompared {
    personnelNumber: string; // Табельный номер
    card: string; // Карта
}
// Данные из строки таблицы сотрудников, которые нам нужны в этом примере
interface StaffRow {
    id: number
    fio: string
    identifier: [] | null
}
