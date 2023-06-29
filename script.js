function krData() { // Получения данных о праздниках
const god = document.getElementById('god').value // Объявляет переменную "god" и присваивает ей значение, которое было введено в элемент с идентификатором "god"
const strana_cod = document.getElementById('strana_cod').value // Объявляет переменную "strana_cod" и присваивает ей значение, которое было введено в элемент с идентификатором "strana_cod"
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${god}/${strana_cod}`)// Отправка запроса на сервер с указанными параметрами
    .then((response) => response.json()) // Преобразуем в JSON
    .then((data) => getValue(data)) // Вызываем функцию getValue и передаем ей полученные данные
    .catch((error) => alert(error.message));
}
function getValue(array) { // Обработки полученных данных
  array.sort((a, b) => {  // Сортируем массив объектов по полю localName в алфавитном порядке
    if (a.localName > b.localName) { // Если имя элемента a больше, чем имя элемента b в алфавитном порядке
      return 1; // То возвращается 1 (элемент a распологается после элемента b в отсортированном массиве).
    } else if (a.localName < b.localName){ // Если имя элемента a меньше, чем имя элемента b в алфавитном порядке
      return -1; // То возвращается -1 (элемент a распологается перед элементом b в отсортированном массиве)
    }else{
      return 0 // Возвращает 0, если имена элементов равны.
    }
  });
  console.log(array); // Выводим отсортированный массив в консоль
}
