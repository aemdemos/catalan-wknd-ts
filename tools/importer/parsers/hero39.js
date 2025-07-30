/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row with the exact block name
  const headerRow = ['Hero (hero39)'];

  // Find the background image: look for <img> direct descendant in the first main grid item
  // Find the first grid cell (should have the image)
  let bgImage = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImage = img;
  }

  // Find the content area (second main grid cell)
  let contentBlock = document.createElement('div');
  if (gridDivs.length > 1) {
    // The right cell contains the content grid
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      Array.from(contentGrid.children).forEach(child => {
        contentBlock.appendChild(child);
      });
    }
  }

  // Build the table rows as per the specification
  const rows = [
    headerRow,
    [bgImage],
    [contentBlock],
  ];

  // Create and replace with the structured block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
