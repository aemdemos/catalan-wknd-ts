/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  // Defensive: if no columns, do nothing
  if (columns.length === 0) return;
  // Table header must match exactly per requirements
  const headerRow = ['Columns (columns3)'];
  // Table content row: reference the existing column elements directly
  const contentRow = columns;
  // Create the table with header and content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
