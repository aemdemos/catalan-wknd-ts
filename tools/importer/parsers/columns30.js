/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // The block should have a single header cell spanning all columns,
  // followed by a row with as many columns as in the layout.
  const headerRow = [
    { colspan: columns.length, content: 'Columns (columns30)' }
  ];
  const cellsRow = columns;

  // Custom helper for colspan support in createTable
  function createTableWithColspan(rows, document) {
    const table = document.createElement('table');
    rows.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      row.forEach((cell, cellIdx) => {
        let td;
        if (rowIndex === 0) {
          td = document.createElement('th');
        } else {
          td = document.createElement('td');
        }
        if (cell && typeof cell === 'object' && 'colspan' in cell) {
          td.colSpan = cell.colspan;
          if (typeof cell.content === 'string') {
            td.innerHTML = cell.content;
          } else {
            td.append(cell.content);
          }
        } else if (typeof cell === 'string') {
          td.innerHTML = cell;
        } else if (Array.isArray(cell)) {
          td.append(...cell);
        } else if (cell) {
          td.append(cell);
        }
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    return table;
  }
  
  const table = createTableWithColspan([
    headerRow,
    cellsRow
  ], document);
  element.replaceWith(table);
}
