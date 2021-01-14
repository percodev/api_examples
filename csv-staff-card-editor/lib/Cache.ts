/*
* Базовая реализация отслеживания изменений в файле с сотрудниками. Смысл - передавать в API только измененые данные
*/
import * as fs from "fs";

export class FileCache {
    private file;
    private pattern = {};

    constructor(file) {
        this.file = file;
        fs.readFileSync(file, "utf8").split('\n').slice(1).forEach((staff) => {
            staff && (this.pattern[staff.split(",")[1].trim()] = staff);
        });
    }

    // Обнаружение изменений у сотрудника
    public compare(): CacheCompared[] | null {
        const update = {}, result = [];
        fs.readFileSync(this.file, "utf8").split('\n').slice(1).forEach((staff) => {
            staff && (update[staff.split(",")[1].trim()] = staff);
        });
        Object.keys(update).forEach((personnelNumber) => {
            if (!this.pattern[personnelNumber] || update[personnelNumber].split(",")[2].trim() !== this.pattern[personnelNumber].split(",")[2].trim()) {
                result.push({
                    personnelNumber,
                    card: update[personnelNumber].split(",")[2].trim() || null
                })
            }
        })
        this.pattern = update;
        return Object.keys(result).length ? result : null
    }
}
