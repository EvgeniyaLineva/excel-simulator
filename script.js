const rowData = [
  { ID: 1, Name: "Иван", Age: 25 },
  { ID: 2, Name: "Мария", Age: 30 },
  { ID: 3, Name: "Петр", Age: 35 },
  { ID: 4, Name: "Ольга", Age: 28 },
  { ID: 5, Name: "Сергей", Age: 22 }
];

const columnDefs = [
  { headerName: "ID", field: "ID", sortable: true, filter: true },
  { headerName: "Имя", field: "Name", sortable: true, filter: true },
  { headerName: "Возраст", field: "Age", sortable: true, filter: true }
];

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

// VLOOKUP function
function vlookup(lookupValue, tableRange, colIndex, exactMatch = true) {
  for (let row of tableRange) {
    if ((exactMatch && row[0] === lookupValue) || (!exactMatch && String(row[0]).includes(lookupValue))) {
      return row[colIndex - 1];
    }
  }
  return "Не найдено";
}

// Init grid
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  const { createGrid } = agGrid;
  createGrid(gridDiv, gridOptions);

  // Button click
  document.getElementById("checkButton").addEventListener("click", () => {
    const formula = document.getElementById("formula").value.trim();

    // Пример формата: =ВПР(3;A1:C5;2)
    const match = formula.match(/^=ВПР\((\d+);([A-Z]+\d+):([A-Z]+\d+);(\d+)\)$/i);
    if (!match) {
      alert("Формула должна быть в формате: =ВПР(3;A1:C5;2)");
      return;
    }

    const lookupValue = parseInt(match[1]);
    const colIndex = parseInt(match[4]);

    const tableRange = rowData.map(row => [row.ID, row.Name, row.Age]);
    const result = vlookup(lookupValue, tableRange, colIndex);
    alert("Результат: " + result);
  });
});
