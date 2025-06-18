// Инициализация таблицы с формой Excel
window.onload = function() {
  luckysheet.create({
    container: 'luckysheet',
    lang: 'en',
    showtoolbar: true,
    showsheetbar: false,
    sheetFormulaBar: true,
    data: [{
      name: 'Лист1',
      data: [
        ["Товар","Цена"],
        ["Яблоко",50],
        ["Груша",60],
        ["Апельсин",70],
        [],
        ["Выберите товар здесь →", ""]
      ],
      config: { merge: [] },
      calcChain: []
    }]
  });
};

// Проверка формулы
function checkAnswer() {
  const cell = luckysheet.getCellMeta(5, 1); // строка 6 (0‑5), столбец B (1)
  const value = luckysheet.getCellValue(5, 1);
  const formula = cell && cell.f;

  if (!formula) {
    alert("⛔ Вы не ввели формулу в строку формул или ячейку.");
    return;
  }

  const formulaUpper = formula.toUpperCase();
  if (formulaUpper.includes("VLOOKUP") && value == 60) {
    alert("✅ Отлично! Формула VLOOKUP сработала верно.");
  } else if (value == 60) {
    alert("⚠️ Значение правильное, но формула не VLOOKUP.");
  } else {
    alert("❌ Неправильно. Убедитесь, что используете VLOOKUP и указали правильный диапазон.");
  }
}
