/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing both columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  // LEFT COLUMN: Gather all content for the left cell
  let leftCell = [];
  if (cols[0]) {
    const h1 = cols[0].querySelector('h1');
    if (h1) leftCell.push(h1);
    const subheading = cols[0].querySelector('p.subheading');
    if (subheading) leftCell.push(subheading);
    const buttonGroup = cols[0].querySelector('.button-group');
    if (buttonGroup) leftCell.push(buttonGroup);
  }
  // RIGHT COLUMN: Gather all images for the right cell
  let rightCell = [];
  if (cols[1]) {
    const innerGrid = cols[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      const imgs = Array.from(innerGrid.querySelectorAll('img'));
      rightCell.push(...imgs);
    } else {
      const imgs = Array.from(cols[1].querySelectorAll('img'));
      rightCell.push(...imgs);
    }
  }
  // Table: header row = single cell, then a row with left and right columns
  const rows = [
    ['Columns (columns36)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
