/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the specification
  const headerRow = ['Columns (columns14)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Look for an h2 and the content block
  let h2 = null;
  let restBlock = null;
  for (const child of children) {
    if (!h2 && child.tagName === 'H2') {
      h2 = child;
    } else if (!restBlock) {
      restBlock = child;
    }
  }
  if (!h2 || !restBlock) return;

  // Group both h2 and the rest block in a single fragment for the first cell
  const cell1 = document.createDocumentFragment();
  cell1.appendChild(h2);
  // Move all children of restBlock into the fragment to avoid table cell nesting
  while (restBlock.firstChild) {
    cell1.appendChild(restBlock.firstChild);
  }

  // Second cell is empty, as there is no right column content in this HTML
  const contentRow = [cell1, ''];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
