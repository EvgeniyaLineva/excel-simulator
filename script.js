const rowData = [
  { A: "1", B: "Иван", C: "25" },
  { A: "2", B: "Мария", C: "30" },
  { A: "3", B: "Петр", C: "35" },
  { A: "4", B: "Ольга", C: "28" },
  { A: "5", B: "Сергей", C: "22" },
  { A: "", B: "", C: "" }, // строка для формулы
];

const columnDefs = [
  { headerName: "A", field: "A", editable: true },
  { headerName: "B", field: "B", editable: true },
  { headerName: "C", field: "C", editable: true },
];

const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: {
    resizable: true,
    sortable: false,
    filter: false,
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  agGrid.createGrid(gridDiv, gridOptions);

  document.getElementById("checkBtn").addEventListener("click", () => {
    const rowIndex = gridOptions.api.getDisplayedRowCount() - 1; // последняя строка
    const rowNode = gridOptions.api.getDisplayedRowAtIndex(rowIndex);
    const formula = rowNode.data.A; // допустим, пользователь пишет формулу в колонке A

    if (!formula || !formula.startsWith("=")) {
      document.getElementById("result").innerText = "Введите формулу в ячейку A последней строки.";
      return;
    }

    try {
      // Пример: =VLOOKUP(3, A1:C5, 2, FALSE)
      const result = Formula.VLOOKUP(3, [
        ["1", "Иван", 25],
        ["2", "Мария", 30],
        ["3", "Петр", 35],
        ["4", "Ольга", 28],
        ["5", "Сергей", 22]
      ], 2, false);

      document.getElementById("result").innerText = `Результат: ${result}`;
    } catch (err) {
      document.getElementById("result").innerText = `Ошибка: ${err.message}`;
    }
  });
});

