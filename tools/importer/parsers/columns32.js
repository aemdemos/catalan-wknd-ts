/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct column children (could be img or divs)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  
  // Table setup: header must match block name
  const headerRow = ['Columns (columns32)'];
  // Row containing each column's content (reference the DOM elements directly)
  const contentRow = columns.map(col => col);

  const cells = [headerRow, contentRow];

  // Build the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original section with the table
  element.replaceWith(table);
}
