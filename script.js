// Пример данных для таблицы
const data = [
  ["1", "Иван", 25],
  ["2", "Мария", 30],
  ["3", "Петр", 35],
  ["4", "Ольга", 28],
  ["5", "Сергей", 22],
  ["", "", ""]  // строка для формулы
];

// Настройки таблицы Handsontable
const container = document.getElementById('myTable');
const hot = new Handsontable(container, {
  data: data,
  colHeaders: ['ID', 'Имя', 'Возраст'],
  rowHeaders: true,
  filters: true,
  dropdownMenu: true,
  contextMenu: true,
  manualColumnResize: true,
  manualRowResize: true,
  columns: [
    {type: 'text'}, // ID
    {type: 'text'}, // Имя
    {type: 'numeric'} // Возраст
  ]
});

// Функция для обработки формулы VLOOKUP
function vlookup(lookupValue, tableRange, colIndex, exactMatch = true) {
  for (let row of tableRange) {
    if ((exactMatch && row[0] == lookupValue) || (!exactMatch && row[0].includes(lookupValue))) {
      return row[colIndex - 1]; // Возвращаем значение из указанного столбца
    }
  }
  return "Не найдено"; // Если значение не найдено
}

// Обработчик для кнопки "Проверить"
document.getElementById('checkBtn').addEventListener('click', () => {
  const formula = hot.getDataAtCell(5, 0);  // Чтение значения в ячейке для формулы (например, A6)

  if (!formula || !formula.startsWith("=")) {
    document.getElementById('result').innerText = "Введите формулу в ячейку A6.";
    return;
  }

  try {
    // Пример парсинга формулы вида: "=VLOOKUP(3, A1:C5, 2, FALSE)"
    const match = formula.match(/=VLOOKUP\((\d+),\s*(A\d+:C\d+),\s*(\d+),\s*(TRUE|FALSE)\)/);

    if (!match) {
      document.getElementById('result').innerText = "Неверная формула.";
      return;
    }

    const lookupValue = parseInt(match[1]);
    const range = match[2].split(':');
    const colIndex = parseInt(match[3]);
    const exactMatch = match[4] === 'TRUE';

    // Преобразуем строковый диапазон в двумерный массив
    const tableRange = data.slice(0, 5).map(row => row.slice(0, 3));

    // Выполняем VLOOKUP
    const result = vlookup(lookupValue, tableRange, colIndex, exactMatch);

    document.getElementById('result').innerText = `Результат: ${result}`;
  } catch (err) {
    document.getElementById('result').innerText = `Ошибка: ${err.message}`;
  }
});

