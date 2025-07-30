/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns row)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct child divs of the grid. Each is a column cell.
  const columns = Array.from(grid.children);

  // Header row should be a single cell (not padded to match the number of columns)
  const headerRow = ['Columns (columns31)'];

  // Second row: each column cell contains the corresponding grid child
  const columnsRow = columns;

  // Build table data: header row has ONE cell, content row has N columns
  const tableData = [headerRow, columnsRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(block);
}
