/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the accordion block (must match example exactly)
  const headerRow = ['Accordion (accordion13)'];

  // Prepare the rows array, starting with the header
  const rows = [headerRow];

  // Get all direct children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const children = Array.from(grid.children).filter(Boolean);
    if (children.length < 2) return; // skip if not enough children
    // Reference the actual elements in the DOM
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // Only create the block if we have at least one item
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
