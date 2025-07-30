/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards7)'];

  // Get all direct card divs
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(cardDiv => {
    // Each card is expected to have the image as its only or main child
    const img = cardDiv.querySelector('img');
    // Reference the existing <img> element
    // No text content exists for these cards in the provided HTML
    rows.push([img, '']);
  });

  // Compose the full table data
  const cells = [headerRow, ...rows];
  
  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
