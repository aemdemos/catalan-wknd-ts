/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single column/cell row
  const headerRow = ['Columns (columns11)'];

  // Find the main grid for content columns
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  let leftColNodes = [], rightColNodes = [];
  if (grid) {
    const gridChildren = Array.from(grid.children);
    if (gridChildren[0]) leftColNodes = Array.from(gridChildren[0].childNodes);
    if (gridChildren[1]) rightColNodes = Array.from(gridChildren[1].childNodes);
  }

  // Find the lower grid for both images
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imagesGrid) {
    const imgDivs = Array.from(imagesGrid.children);
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Compose the content for each column as one array per cell
  const col1Content = [];
  if (leftColNodes.length) col1Content.push(...leftColNodes);
  if (rightColNodes.length) col1Content.push(...rightColNodes);

  const col2Content = [];
  if (img1) col2Content.push(img1);
  if (img2) col2Content.push(img2);

  // Build the block table, header is a single cell row, second row has two columns
  const tableCells = [
    headerRow, // Header row, single cell
    [col1Content, col2Content] // Second row, two columns
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
