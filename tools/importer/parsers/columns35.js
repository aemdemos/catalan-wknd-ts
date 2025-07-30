/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate column elements (children of the grid)
  const columns = Array.from(grid.children);

  // Prepare the header row: must be an array with a single string cell
  const headerRow = ['Columns (columns35)'];

  // Prepare the content row: as many columns as found
  const contentRow = columns;

  // Build the cells array for the block table
  const cells = [headerRow, contentRow];

  // Create the table using the provided helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
