window.onload = function () {
  luckysheet.create({
    container: 'luckysheet', // ID контейнера
    lang: 'en', // Английский язык — нужен для формул
    data: [{
      name: 'Sheet1',
      color: '',
      index: 0,
      status: 1,
      order: 0,
      celldata: [],
      config: {},
      row: 20,
      column: 10,
      luckysheet_select_save: [],
      calcChain: [],
      isPivotTable: false,
      pivotTable: {},
      filter_select: null,
      filter: null,
      luckysheet_alternateformat_save: [],
      luckysheet_alternateformat_save_modelCustom: [],
      luckysheet_conditionformat_save: [],
      frozen: {},
      chart: [],
      zoomRatio: 1,
      image: [],
      showGridLines: true
    }],
    showtoolbar: false,
    showinfobar: false,
    showsheetbar: false,
    showstatisticBar: false,
    allowEdit: true,
    enableAddRow: false,
    enableAddCol: false,
    sheetFormulaBar: true
  });

  // Заполняем таблицу данными
  setTimeout(() => {
    const data = [
      ['Товар', 'Цена'],
      ['Яблоко', 50],
      ['Груша', 60],
      ['Апельсин', 70],
      ['', ''],
      ['Выберите товар', 'Цена товара']
    ];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        luckysheet.setCellValue(i, j, data[i][j]);
      }
    }
  }, 500);
};

// Проверка результата
function checkAnswer() {
  const value = luckysheet.getCellValue(5, 1); // E2 → строка 5 (индекс 5), колонка B (1)
  const formula = luckysheet.getCellFormula(5, 1);

  if ((value == 60) && formula && formula.toUpperCase().includes("VLOOKUP")) {
    alert("✅ Правильно! Вы использовали VLOOKUP и нашли цену.");
  } else if (value == 60) {
    alert("⚠️ Значение верное, но формула VLOOKUP не используется.");
  } else {
    alert("❌ Неверно. Проверьте формулу и попробуйте снова.");
  }
}

