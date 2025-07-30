/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header
  const rows = [['Cards']];

  // Get all direct child cards (each card is a div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the text paragraph inside the card
    const p = cardDiv.querySelector('p');
    if (p) {
      rows.push([p]); // Reference the existing <p> element directly
    } else {
      // Fallback: push an empty row if no <p> found
      rows.push(['']);
    }
  });

  // Create and replace with the Cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
