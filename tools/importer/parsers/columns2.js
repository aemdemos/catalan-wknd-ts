/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get grid children
  const gridChildren = Array.from(grid.children);

  // Left column: main card
  const leftCol = gridChildren[0];

  // Right column: composite of the two right panels
  let rightColElements = [];
  if (gridChildren[1]) {
    const topRightCards = Array.from(
      gridChildren[1].querySelectorAll(':scope > a.utility-link-content-block')
    );
    rightColElements.push(...topRightCards);
  }
  if (gridChildren[2]) {
    const children = Array.from(gridChildren[2].children);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.matches('a.utility-link-content-block')) {
        rightColElements.push(child);
      } else if (child.matches('.divider')) {
        const hr = document.createElement('hr');
        rightColElements.push(hr);
      }
    }
  }
  while (rightColElements.length && rightColElements[rightColElements.length - 1].tagName === 'HR') {
    rightColElements.pop();
  }

  // FIX: Header row must be a single cell (one column), even if data row is two columns.
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightColElements];
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
