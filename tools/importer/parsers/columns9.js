/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns (for this footer layout)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the columns (usually 4 for this kind of footer, but generalize)
  const columns = Array.from(grid.children);

  // The block header row exactly as specified
  const headerRow = ['Columns (columns9)'];

  // The content row contains one cell for each column in the grid, using references to the original elements
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the footer with the columns block table
  element.replaceWith(table);
}
