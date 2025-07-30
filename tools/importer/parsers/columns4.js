/* global WebImporter */
export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const numCols = columns.length;
  if (numCols === 0) return;

  // Header row: block name in first cell, rest empty, total numCols cells
  const headerRow = ['Columns (columns4)', ...Array(numCols - 1).fill('')];

  const cells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
