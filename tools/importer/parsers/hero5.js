/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero5)'];

  // 2. Find the background image (the prominent <img> in the grid)
  // Find the first <img> inside the element
  const img = element.querySelector('img');
  const imageCell = img ? [img] : [''];

  // 3. Find the text/content block
  // Locate the inner grid and find its first child that contains headings and paragraphs
  // The element has two grids: outer for layout, inner for content columns
  let textContentCell = [''];
  const innerGrids = element.querySelectorAll('.w-layout-grid');
  if (innerGrids.length > 1) {
    const contentGrid = innerGrids[1];
    // Find the div with .section, which has the h2, paragraph, button group
    const textCol = contentGrid.querySelector('.section');
    if (textCol) {
      textContentCell = [textCol];
    }
  } else {
    // Fallback: try to find .section directly under element
    const textCol = element.querySelector('.section');
    if (textCol) {
      textContentCell = [textCol];
    }
  }

  // 4. Compose the table according to the block structure: 1 column, 3 rows
  const rows = [
    headerRow,
    imageCell,
    textContentCell
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the new block table
  element.replaceWith(block);
}
