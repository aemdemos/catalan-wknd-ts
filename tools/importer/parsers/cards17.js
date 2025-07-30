/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each immediate child div is a card (contains img)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');

    // For text content: if there is any heading/paragraph/text, use it. Otherwise, use img.alt.
    // In this provided HTML, there is only the image. So use the alt as the card's text content in bold.
    let textCellContent = [];
    if (img && img.alt && img.alt.trim()) {
      // Use alt text as bold heading for the card (semantically strong, as in the markdown example)
      const strong = document.createElement('strong');
      strong.textContent = img.alt;
      textCellContent = [strong];
    } else {
      textCellContent = [''];
    }
    rows.push([img, textCellContent]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
