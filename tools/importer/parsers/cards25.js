/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the block name and variant exactly as per spec
  const headerRow = ['Cards (cards25)'];

  // Each card is a direct child div
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Helper: extract card image (always in an <img> tag)
  function getCardImage(cardDiv) {
    // Find an img directly under this card division (works for all cards)
    // Prefer first .cover-image img but fallback to any first img
    return cardDiv.querySelector('img.cover-image, img');
  }

  // Helper: extract card text (title and description)
  function getCardText(cardDiv) {
    // Try to find the content wrapper if it exists, else fall back to cardDiv
    const contentWrapper = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv;
    const parts = [];
    // Title (h3 or h2)
    const heading = contentWrapper.querySelector('h3, h2');
    if (heading) parts.push(heading);
    // Description (p)
    const para = contentWrapper.querySelector('p');
    if (para) parts.push(para);
    return parts;
  }

  // Compose card rows: only if there's an image (mandatory per spec)
  const cardRows = [];
  for (const cardDiv of cardDivs) {
    const img = getCardImage(cardDiv);
    if (img) {
      const textContent = getCardText(cardDiv);
      cardRows.push([img, textContent.length ? textContent : '']);
    }
  }

  // Compose table: header + one row per card
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cardRows
  ], document);

  element.replaceWith(table);
}
