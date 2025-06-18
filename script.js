// Данные для таблицы
const rowData = [
  { ID: 1, Name: "Иван", Age: 25 },
  { ID: 2, Name: "Мария", Age: 30 },
  { ID: 3, Name: "Петр", Age: 35 },
  { ID: 4, Name: "Ольга", Age: 28 },
  { ID: 5, Name: "Сергей", Age: 22 }
];

// Определение колонок для таблицы
const columnDefs = [
  { headerName: "ID", field: "ID", sortable: true, filter: true },
  { headerName: "Имя", field: "Name", sortable: true, filter: true },
  { headerName: "Возраст", field: "Age", sortable: true, filter: true }
];

// Настройки для Ag-Grid
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: {
    editable: true,
    filter: true,
    resizable: true
  },
  onGridReady: function(event) {
    event.api.sizeColumnsToFit();
  }
};

// Инициализация Ag-Grid
document.addEventListener("DOMContentLoaded", function() {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});

// Функция ВПР (VLOOKUP)
function vlookup(lookupValue, tableRange, colIndex, exactMatch = true) {
  for (let row of tableRange) {
    if ((exactMatch && row[0] === lookupValue) || (!exactMatch && row[0].includes(lookupValue))) {
      return row[colIndex - 1]; // Возвращаем значение из указанного столбца
    }
  }
  return "Не найдено"; // Если значение не найдено
}

// Пример использования функции ВПР в контексте таблицы:
function testVLookup() {
  const lookupValue = 3;  // Пример поиска по ID
  const tableRange = rowData.map(row => [row.ID, row.Name, row.Age]);
  const result = vlookup(lookupValue, tableRange, 2);  // Поиск по колонке 2 (Name)
  console.log(result);  // Вывод результата
}

testVLookup();  // Вызов функции для теста
