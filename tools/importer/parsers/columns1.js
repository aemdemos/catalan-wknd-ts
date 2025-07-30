/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container holding the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get direct children (columns): should be image and content column
  const columns = Array.from(grid.children);
  if (columns.length === 0) return; // edge case

  // 3. Compose the block table
  // The header row must be: 'Columns (columns1)'
  const headerRow = ['Columns (columns1)'];
  // Second row: each column is one cell
  const contentRow = columns;

  // 4. Create the block table using referenced nodes
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 5. Replace the original element with the new block table
  element.replaceWith(table);
}
