import {Auth} from "./lib/Auth";
import {watchFile} from "fs";
import {Staff} from "./lib/Staff";
import {FileCache} from "./lib/Cache";
import {Card} from "./lib/Card";

(async function main() {
    // Авторизация
    const authData = await Auth.get().then(t => t).catch(c => c);
    // Обработка ошибок
    if (authData instanceof Error || authData.error) {
        throw Error(authData.error || authData)
    }
    // Кешируем данные из файла для отслеживания изменений
    const cache = new FileCache("./staff.csv");
    // Устанавливаем вотчер на файл, отслеживаем изменение карт сотрудников
    watchFile("./staff.csv", {interval: 1000}, (curr, prev) => {
        // Проверяем изменились ли карты
        const changes = cache.compare()
        // Если карты изменились, перебираем изменения
        changes && changes.forEach(async (row) => {
            // Получаем сотрудника по его табельному номеру
            const staff: StaffRow = await Staff.getStaffByPersonnelNumber(authData.token, row.personnelNumber).then(t => t).catch(c => c)
            // Обрабатываем ошибки
            if (staff instanceof Error) {
                console.error(staff);
                return
            }
            // Если сотрудник с таким табельным номером есть, - продолжаем
            if (staff) {
                // Проверяем, есть ли карты у сотрудника
                if (staff.identifier?.length) {
                    // Если есть карты, удаляем основную карту
                    const removeCard = await Card.removeMainCard(authData.token, staff.id).catch(c => c);
                    // Обрабатываем ошибки
                    if (removeCard instanceof Error || removeCard.error) {
                        console.error(staff);
                    }
                }
                // Проверяем, назначили ли в файле новую карту или ее просто удалили
                if (row.card) {
                    // Если назначили, записываем новую основную карту
                    const postCard = await Card.postMainCard(authData.token, staff.id, row.card).catch(c => c);
                    // Обрабатываем ошибки
                    if (postCard instanceof Error || postCard.error) {
                        console.error(postCard);
                    }
                }
                // Выводим сообщение о редактировании карты сотрудника
                console.log(`Выполнено редактирование карты сотрудника: ${staff.fio}. ${row.card ? `Выдана карта ${row.card}` : "Карта изъята"}`)
            } else console.error(`Сотрудник с табельным номером ${row.personnelNumber} не найден`)
        })
    })
    console.log("Отслеживание изменений файла...")
})().catch(e => console.error(e))
