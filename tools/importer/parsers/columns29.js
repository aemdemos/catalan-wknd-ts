/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: must be a single-cell array
  const headerRow = ['Columns (columns29)'];
  // Content row: as many cells as there are columns
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
