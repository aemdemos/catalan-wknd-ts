/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container with the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify the elements per column
  // We'll group as: left cell = text block (div) + contact list (ul), right cell = image
  let textBlock = null;
  let contactList = null;
  let img = null;

  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && child.querySelector('h2.eyebrow')) {
      textBlock = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      img = child;
    }
  }
  // If image is not direct child, try to find in grid
  if (!img) {
    img = grid.querySelector('img');
  }

  // Compose left column content
  // Reference existing DOM nodes, not clones
  const leftCol = document.createElement('div');
  if (textBlock) leftCol.appendChild(textBlock);
  if (contactList) leftCol.appendChild(contactList);

  // The header row must have one cell, but for n columns the array should be of length n with the header only in the first cell
  // and the rest empty strings
  const numCols = 2; // for this block (left column, right image)
  const headerRow = ['Columns (columns18)'];
  while (headerRow.length < numCols) headerRow.push('');

  const columnsRow = [leftCol, img];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
