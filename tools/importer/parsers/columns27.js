/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (contains the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: content and image)
  const cols = Array.from(grid.children);
  // Defensive: only proceed if exactly 2 columns found
  if (cols.length !== 2) return;

  // Compose the table: first row is header, second row is two columns
  const headerRow = ['Columns (columns27)'];
  const contentRow = [cols[0], cols[1]];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original section with the table
  element.replaceWith(table);
}
