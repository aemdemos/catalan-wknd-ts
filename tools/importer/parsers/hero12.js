/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: 'Hero (hero12)'
  const headerRow = ['Hero (hero12)'];

  // 2. Background image (optional)
  // Find the first .w-layout-grid > div that contains an img.cover-image.utility-position-absolute
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const bgDiv = grid.children[0];
    if (bgDiv) {
      const img = bgDiv.querySelector('img.cover-image');
      if (img) {
        bgImg = img;
      }
    }
  }

  // 3. Content: title, subheading, cta, and any card content
  // Find the second .w-layout-grid > div with .card
  let contentCell = null;
  if (grid && grid.children.length > 1) {
    // This column contains the card
    const contentDiv = grid.children[1];
    const card = contentDiv.querySelector('.card');
    if (card) {
      // We want to preserve the whole card (including images, headline, cta, etc.)
      contentCell = card;
    } else {
      // fallback: try the entire contentDiv
      contentCell = contentDiv;
    }
  }

  // If no content found, fallback to empty cell
  if (!contentCell) contentCell = document.createElement('div');

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
