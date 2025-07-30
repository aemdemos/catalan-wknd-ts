/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout that contains the collage and content
  const topGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (!topGrid) return;

  // Get the two primary column children
  const gridChildren = Array.from(topGrid.children).filter(child => child.nodeType === 1);
  if (gridChildren.length < 2) return;

  // Images collage is in the first child
  const imageCol = gridChildren[0];
  // Content is in the second child
  const contentCol = gridChildren[1];

  // Get all the images from the collage grid
  const imagesGrid = imageCol.querySelector('.grid-layout.desktop-3-column');
  let collageImages = [];
  if (imagesGrid) {
    collageImages = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Get the content (heading, paragraph, buttons, etc)
  const contentContainer = contentCol.querySelector('.container');

  // Build the header row (exactly one column)
  const headerRow = ['Columns (columns20)'];
  // Build the content row (columns layout: images | content)
  const contentRow = [
    collageImages.length ? collageImages : '',
    contentContainer || ''
  ];

  // Build the table: header row (1 col), then second row (n cols)
  const tableRows = [
    headerRow,
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
