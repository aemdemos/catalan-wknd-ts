/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract one card's content
  function extractCard(card) {
    // Image: inside .utility-aspect-* > img
    let img = card.querySelector('img');
    // Text: title (h3 or h4), description (p), optional CTA (button)
    let title = card.querySelector('h2, h3, h4, h5, h6');
    let desc = card.querySelector('p');
    let cta = card.querySelector('.button, .cta, a.button, a.cta');
    // Build the text content array, only including present elements
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find top-level cards (main card + additional grid)
  const grids = element.querySelectorAll(':scope .grid-layout');
  const topLevelGrid = grids[0];

  // First card is a direct child (has .utility-link-content-block)
  const mainCard = topLevelGrid.querySelector(':scope > a.utility-link-content-block');
  // The nested grid is a sibling of that main card
  const nestedGrid = topLevelGrid.querySelector(':scope > .grid-layout');
  // Remaining cards inside the nested grid
  const moreCards = nestedGrid ? Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block')) : [];

  // All cards in order
  const allCards = [mainCard, ...moreCards].filter(Boolean);

  // Build the table rows
  const rows = [['Cards (cards37)']];
  allCards.forEach(card => {
    rows.push(extractCard(card));
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
