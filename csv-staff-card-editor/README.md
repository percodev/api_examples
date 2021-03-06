## Редактирование карт сотрудников посредством редактирования данных в CSV файле
### Что делает данный пример?
В данном примере рассматривается возможность интеграции с PERCo-Web через API, с возможностью редактировать карты сотрудников путем редактирования CSV файла. 
Для упрощения положим, что: 
- У каждого сотрудника может быть только одна карта доступа
- Все табельные номера сотрудников в пределах системы уникальны
- Количество и порядок столбцов в csv файле не меняются. 

*(Прим: PERCo-Web позволяет создавать не уникальные табельные номера, так как в пределах одной системы может быть несколько обособленных компаний, табельные номера сотрудников которых теоретически могут пересекаться)*

### Как правильно запустить?
1) Предполагается, что у Вас установлен [Node.js](https://nodejs.org/) и Вы знаете как им пользоваться :)
2) В папке содержится демонстрационная база данных для MySQL 8.x с пятью сотрудниками (файл database_demo.sql). Её нужно восстановить в менеджере PERCo-Web и там же сменить пароль администратора на свой. 
3) Там же, в папке, содержится CSV файл с сотрудниками и тремя столбцами: ФИО, табельный номер, карта (в поле "карта" ничего нет).
4) Заходим в папку, устанавливаем все модули `npm i` и собираем typescript `npm run build`
5) Открываем файл config.json и заполняем настройки подключения к PERCo-Web (хост, порт и учетные данные админа). *Прим: В данном примере используется http соединение без возможности использования ssl*
6) Запускаем `npm start`
7) Редактируем файл, вписываем сотрудникам номера карт, сохраняем, идем в PERCo-Web и видим карты у сотрудников. Аналогично редактируем/удаляем карты из файла - видим изменения у сотрудников. 

Дополнительные нюансы и подробности прокомментированы в коде :)

### Важно
Данный код является демонстрационным примером интеграции с API PERCo-Web и не является готовым решением предназначеным для "продакшена". Он не содержит проверок входных данных и не оптимизирован для работы с реальными базами сотрудников
