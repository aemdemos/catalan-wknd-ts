/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background Image
  let bgImg = element.querySelector('img.cover-image');
  let imgCell = '';
  if (bgImg) {
    imgCell = bgImg;
  }

  // Row 3: Content (headline, subheading, cta)
  let card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    const contentArr = [];
    // Headline: h1, h2, h3, or .h1-heading
    const headline = card.querySelector('h1, h2, h3, .h1-heading');
    if (headline) contentArr.push(headline);
    // Subheading: .subheading (only if not already included as headline)
    const subheading = card.querySelector('.subheading');
    if (subheading && subheading !== headline) contentArr.push(subheading);
    // Button group (all CTAs)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentArr.push(buttonGroup);
    contentCell = contentArr;
  }

  // Compose table
  const cells = [
    headerRow,
    [imgCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}