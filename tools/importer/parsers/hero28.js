/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row (second row)
  // Try to find the image used as the background
  let bgImg = '';
  // The grid container is the first child of the header
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // The background image is in a nested div with class 'ix-parallax-scale-out-hero'
    const bgImgDiv = grid.querySelector('.ix-parallax-scale-out-hero');
    if (bgImgDiv) {
      const img = bgImgDiv.querySelector('img');
      if (img) bgImg = img;
    }
  }

  // 3. Content row (third row)
  // Find the container with the text (h1)
  let textContent = '';
  if (grid) {
    // Two grid children: one for image, one for content
    // The content one has a class 'container'
    const contentDiv = grid.querySelector('.container');
    if (contentDiv) {
      // Prefer the .utility-margin-bottom-6rem div inside for actual content
      const innerContent = contentDiv.querySelector('.utility-margin-bottom-6rem');
      if (innerContent) {
        textContent = innerContent;
      } else {
        textContent = contentDiv;
      }
    }
  }

  // 4. Assemble the table rows
  const rows = [
    headerRow,
    [bgImg],
    [textContent]
  ];

  // 5. Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
