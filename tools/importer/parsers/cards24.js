/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  // Each card is an <a> in the grid
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map((card) => {
    // Image: find first <img> inside card
    const imgContainer = card.querySelector('div.utility-aspect-2x3');
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }

    // Text content: tag, date, title (all visible in card)
    // Tag & Date are in flex-horizontal
    const metaDiv = card.querySelector('.flex-horizontal');
    const textCellParts = [];

    if (metaDiv) {
      // Put both tag and date _inline_ with single spaces, as in screenshot
      const metaWrapper = document.createElement('div');
      let comma = false;
      Array.from(metaDiv.children).forEach((child) => {
        if (comma) metaWrapper.append(' ');
        comma = true;
        metaWrapper.appendChild(child);
      });
      textCellParts.push(metaWrapper);
    }

    // Title
    const title = card.querySelector('h3');
    if (title) {
      textCellParts.push(title);
    }

    // No CTA in this design; if there was, we'd grab it here.

    return [imageEl, textCellParts];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
