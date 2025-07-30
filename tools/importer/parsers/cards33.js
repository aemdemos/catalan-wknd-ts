/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches the example exactly
  const headerRow = ['Cards (cards33)'];

  // Get all direct child <a> elements (each is a card)
  const cardElements = Array.from(element.querySelectorAll(':scope > a'));

  const rows = [headerRow];

  cardElements.forEach(card => {
    // Get card image (first <img> in card)
    const img = card.querySelector('img');

    // Find the inner grid div which contains text content
    // Structure: <a> <div.grid> <img> <div>...</div> </div> </a>
    // We want the first <div> (not grid) inside the grid after <img>
    let contentDiv = null;
    const grid = card.querySelector('.w-layout-grid');
    if (grid) {
      // The first <div> after the <img> in the grid
      let foundImg = false;
      for (const child of grid.children) {
        if (!foundImg && child === img) {
          foundImg = true;
          continue;
        }
        if (foundImg && child.tagName === 'DIV') {
          contentDiv = child;
          break;
        }
      }
    }
    // Fallback: pick last <div> inside grid if not found
    if (!contentDiv && grid) {
      const gridDivs = Array.from(grid.children).filter(e => e.tagName === 'DIV');
      if (gridDivs.length) contentDiv = gridDivs[gridDivs.length - 1];
    }
    // Remove 'Read' text if present as a <div> with text 'Read' in contentDiv
    if (contentDiv) {
      const readDivs = Array.from(contentDiv.children).filter(
        el => el.tagName === 'DIV' && el.textContent.trim().toLowerCase() === 'read'
      );
      readDivs.forEach(div => div.remove());
    }
    // Find the 'Read' CTA
    let ctaLink = null;
    // Only add CTA if there is a valid href
    if (card.href && card.href !== '#') {
      ctaLink = document.createElement('a');
      ctaLink.href = card.href;
      ctaLink.textContent = 'Read';
    }
    // Compose right cell contents: contentDiv and CTA
    let rightCell = [];
    if (contentDiv) {
      rightCell.push(contentDiv);
      if (ctaLink) {
        rightCell.push(document.createElement('br'), ctaLink);
      }
    } else if (ctaLink) {
      rightCell = [ctaLink];
    }
    // Avoid empty cell
    if (!rightCell.length) rightCell = [''];
    // Add the row: left=img, right=content+cta
    rows.push([
      img,
      rightCell.length === 1 ? rightCell[0] : rightCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
