document.getElementById(`country`).addEventListener(
  `click`,
  async function () {
    let api = await fetch(`https://date.nager.at/api/v3/AvailableCountries`);
    let res = await api.json();
    let getCountry = res.map((x) => x.name);
    let select = document.getElementById(`country`);
    for (let i = 0; i < getCountry.length; i++) {
      let newOption = document.createElement(`option`);
      newOption.innerHTML = `${getCountry[i]}`;
      select.append(newOption);
    }
    let selectYear = document.getElementById(`year`);
    for (let j = 2023; j < 1923; j--) {
      let newYear = document.createElement(`option`);
      newYear.innerHTML = j;
      selectYear.append(newYear);
    }
  },
  {
    once: true,
  }
);
document.getElementById(`year`).addEventListener(
  `click`,
  async function () {
    let selectYear = document.getElementById(`year`);
    for (let j = 2023; j > 1923; j--) {
      let newYear = document.createElement(`option`);
      newYear.innerHTML = j;
      selectYear.append(newYear);
    }
  },
  { once: true }
);
document
  .getElementById(`country`)
  .addEventListener(`change`, async function () {
    let year = document.getElementById(`year`).value;
    let country = document.getElementById(`country`).value;
    let searchCountry = `${country}`;
    let api = await fetch(`https://date.nager.at/api/v3/AvailableCountries`);
    let res = await api.json();
    function findCountry() {
      let countryCode = res.find(
        (code) => code.name == searchCountry
      ).countryCode;
      return countryCode;
    }
    findCountry();
    let api2 = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${findCountry()}`
    );
    let res2 = await api2.json();
    let holidaysMonth = res2.map((x) => x.date);
    let arrForSplit = [];
    let arrForUniqValues = [];
    function spliting() {
      for (let j = 0; j < holidaysMonth.length; j++) {
        let res = holidaysMonth[j].substr(5, 2);
        arrForSplit.push(res);
      }
      return arrForSplit;
    }
    spliting();
    for (let str of arrForSplit) {
      if (!arrForUniqValues.includes(str)) {
        arrForUniqValues.push(str);
      }
    }
    let optionDeleting = month.getElementsByTagName(`option`);
    while (optionDeleting.length > 1) {
      optionDeleting[1].remove();
    }
    for (let i = 0; i < arrForUniqValues.length; i++) {
      let monthName;
      switch (arrForUniqValues[i]) {
        case `01`:
          monthName = `January`;
          break;
        case `02`:
          monthName = `February`;
          break;
        case `03`:
          monthName = `March`;
          break;
        case `04`:
          monthName = `April`;
          break;
        case `05`:
          monthName = `May`;
          break;
        case `06`:
          monthName = `June`;
          break;
        case `07`:
          monthName = `Jule`;
          break;
        case `08`:
          monthName = `August`;
          break;
        case `09`:
          monthName = `September`;
          break;
        case `10`:
          monthName = `October`;
          break;
        case `11`:
          monthName = `November`;
          break;
        case `12`:
          monthName = `December`;
          break;
      }
      let newMonth = document.createElement(`option`);
      let optionsWithMonth = document.getElementById(`month`);
      newMonth.innerHTML = `${monthName}`;
      optionsWithMonth.append(newMonth);
    }
  });
// document.getElementById(`month`).addEventListener(`click`);
document
  .getElementById(`getTable`)
  .addEventListener(`click`, async function () {
    let arr1 = [];
    let arr3 = [];
    let year = document.getElementById(`year`).value;
    let country = document.getElementById(`country`).value;
    let month = document.getElementById(`month`).value;
    let searchCountry = `${country}`;
    let api = await fetch(`https://date.nager.at/api/v3/AvailableCountries`);
    let res = await api.json();
    function findCountry() {
      let countryCode = res.find(
        (code) => code.name == searchCountry
      ).countryCode;
      return countryCode;
    }
    findCountry();
    let api2 = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${findCountry()}`
    );
    let holidays = await api2.json();
    // получаем значения даты кода страны и имени праздника(for)
    let getDate = holidays.map((x) => x.date);
    let getNameHoliday = holidays.map((z) => z.name);
    // получаем айди тела таблицы
    let tableBody = document.getElementById(`holiday-body-table`);
    // счётчик клеток таблицы
    let cntForCells = 0;
    // счётчик для перебора
    let cntForPerebor = 0;
    // получаем значения из даты и в массив
    function splitingDate(spliting) {
      for (let i = 0; i < spliting.length; i++) {
        let dateMonthOnly = spliting[i].substr(5, 2);
        arr1.push(dateMonthOnly);
      }
      return arr1;
    }
    // получаем уникальные значения из splitingDate
    splitingDate(getDate);
    for (let str of arr1) {
      if (!arr3.includes(str)) {
        arr3.push(str);
      }
    }
    // получаем только цифры месяца из поля выбора месяца
    let splitingMonth;
    switch (month) {
      case `January`:
        splitingMonth = `01`;
        break;
      case `February`:
        splitingMonth = `02`;
        break;
      case `March`:
        splitingMonth = `03`;
        break;
      case `April`:
        splitingMonth = `04`;
        break;
      case `May`:
        splitingMonth = `05`;
        break;
      case `June`:
        splitingMonth = `06`;
        break;
      case `Jule`:
        splitingMonth = `07`;
        break;
      case `August`:
        splitingMonth = `08`;
        break;
      case `September`:
        splitingMonth = `09`;
        break;
      case `October`:
        splitingMonth = `10`;
        break;
      case `November`:
        splitingMonth = `11`;
        break;
      case `December`:
        splitingMonth = `12`;
        break;
    }
    // делаем перебор пока k меньше длины месяцев
    for (let k = 0; k < arr3.length; k++) {
      // если месяц не равен стандартному значению и код страны тоже не равен стандартному то выполняем
      if (month !== `Select month` && country !== `Select country`) {
        // снова перебор
        for (let i = 0; i < getDate.length; i++) {
          // основная функция создания таблицы
          let newTablePosition = document.createElement(`tr`);
          newTablePosition.id = `${cntForCells}-table`;
          cntForCells++;
          let newTableHoliday = document.createElement(`td`);
          let newTableDate = document.createElement(`td`);
          let newTableCountry = document.createElement(`td`);
          // если уникальные значения равны вырезанному месяцу то выполняем
          if (arr3[k] == splitingMonth) {
            // дополнительная проверка на совпадения
            if (getDate[cntForPerebor].substr(5, 2) == splitingMonth) {
              // перебор для создания таблиц
              for (let j = 0; j < 3; j++) {
                // везде добавляем текст и кидаем в DOM
                newTableDate.innerHTML = getDate[cntForPerebor];
                newTablePosition.append(newTableDate);
                newTableCountry.innerHTML = country;
                newTablePosition.append(newTableCountry);
                newTableHoliday.innerHTML = getNameHoliday[cntForPerebor];
                newTablePosition.append(newTableHoliday);
              }
            }
            // меняем счётчик с каждой итерацией и полученные результаты заносим в таблицу полностью
            cntForPerebor++;
            tableBody.append(newTablePosition);
          }
        }
      } else {
        // если не введён месяц или страна то не работает
        alert(`Выберите месяц и/или страну!`);
        break;
      }
    }
  });
async function clearTable() {
  let table = document.getElementById(`holiday-body-table`);
  if (table.childNodes.length > 0) {
    table.innerHTML = ``;
  } else {
    alert(`Нечего удалять!`);
  }
}
