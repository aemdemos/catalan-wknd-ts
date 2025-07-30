/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block table
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all tabs content > panes
  // For each tab, find its grid of cards
  const panes = element.querySelectorAll(':scope > div');
  panes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // IMAGE cell
      let img = '';
      // Try to find an image in a .utility-aspect-3x2 div inside this card
      const imgDiv = card.querySelector('.utility-aspect-3x2');
      if (imgDiv) {
        const foundImg = imgDiv.querySelector('img');
        if (foundImg) img = foundImg;
      }
      // TEXT cell: Heading (h3/h4) and description (div.paragraph-sm)
      let textCell = [];
      // Prefer .h4-heading or h3 as the card title
      const heading = card.querySelector('h3, .h4-heading');
      if (heading) textCell.push(heading);
      // Description
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCell.push(desc);
      cells.push([img, textCell]);
    });
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
