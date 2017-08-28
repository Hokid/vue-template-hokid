Клиент:
====
actions: get, create, update, delete, exist (g, c, u, d, e)
method: post
response:
  - data {
    cause: - причина ошибки, содержит код причины или массив с кодами (1 - некорректный токен)
  }
  - status: 0 - done, // OK
            1 - not found url, // URL не найден
            2 - not found action, // Действие не найдено
            3 - access denied url, // Доступ к url запрещен
            4 - access denied action, // Доступ к действию запрещен
            5 - internal error, // Внутренняя ошибка, в коде
            6 - incorrect parameters, // Некорректные параметры
            7 - etc // Прочее
request:
  - data {}
  - token

/client/ (get) (create) (update)

Получить первоначальные данные о клиенте - /client/ (get)
  token

Получить первоначальные данные о клиенте - /client/ (get)
  token
Проверить существование токена - /client/token (exist)

  token
Получить данные профиля - /client/profile (get)
  token
