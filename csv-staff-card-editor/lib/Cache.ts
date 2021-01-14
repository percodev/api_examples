/*
* Базовая реализация отслеживания изменений в файле с сотрудниками. Смысл - передавать в API только измененые данные
*/
import * as fs from "fs";

export class FileCache {
    private file;
    private pattern = {};

    constructor(file) {
        // Путь к файлу
        this.file = file;
        // Чтение и парсинг файла, размещение в объекте pattern в формате {"Табельный номер": "Данные"}
        fs.readFileSync(file, "utf8").split('\n').slice(1).forEach((staff) => {
            staff && (this.pattern[staff.split(",")[1].trim()] = staff);
        });
    }

    // Обнаружение изменений у сотрудника
    public compare(): CacheCompared[] | null {
        const update = {}, result = [];
        // Чтение и парсинг файла, размещение в объекте update в формате {"Табельный номер": "Данные"}
        fs.readFileSync(this.file, "utf8").split('\n').slice(1).forEach((staff) => {
            staff && (update[staff.split(",")[1].trim()] = staff);
        });
        // Сравнение update и pattern 
        Object.keys(update).forEach((personnelNumber) => {
            if (!this.pattern[personnelNumber] || update[personnelNumber].split(",")[2].trim() !== this.pattern[personnelNumber].split(",")[2].trim()) {
                // При обнаружении изменений добавляем в result
                result.push({
                    personnelNumber,
                    card: update[personnelNumber].split(",")[2].trim() || null
                })
            }
        })
        // Перезаписываем pattern
        this.pattern = update;
        // При отсутствии изменений возвращаем null
        return Object.keys(result).length ? result : null
    }
}
