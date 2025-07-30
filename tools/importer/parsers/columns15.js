/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.w-layout-grid');
  }
  if (!grid) {
    grid = element.querySelector('.w-layout-grid');
  }
  if (!grid) {
    element.replaceWith(document.createComment('Could not parse Columns (columns15) block: no grid found'));
    return;
  }
  // Get grid columns (immediate children)
  const columns = Array.from(grid.children);
  if (columns.length < 2) {
    element.replaceWith(document.createComment('Could not parse Columns (columns15) block: too few columns'));
    return;
  }
  // Create content cells by referencing the existing elements directly
  // (do not clone or create new elements where possible)
  const contentCells = columns;
  // Build the table as per the required structure: header row, then content row referencing column elements
  const cells = [
    ['Columns (columns15)'],
    contentCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
