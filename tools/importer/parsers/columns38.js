/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child columns
  const cols = Array.from(element.querySelectorAll(':scope > div'));

  // The header row should be a single cell with the block name
  const headerRow = ['Columns (columns38)'];

  // The content row should have one cell per column
  const contentRow = cols;

  // Compose the table as per spec: header is single cell, content row has N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
