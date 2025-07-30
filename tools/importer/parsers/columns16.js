/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The immediate children of the grid are the columns
  const columnDivs = Array.from(grid.children);

  // For each column, collect all meaningful content (not just images, but all direct children)
  // In this HTML, the column content is typically a single nested <div>, which holds an <img>,
  // but more generally we should include all immediate children of that deepest child.
  const cellsRow = columnDivs.map(col => {
    // Try to get the single child (holds content)
    let contentDiv = col.firstElementChild;
    // If there is no wrapper div, use the column itself
    if (!contentDiv) return '';
    // If the content div still has just one child, descend again (defensive, for nesting)
    while (contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName !== 'IMG') {
      contentDiv = contentDiv.firstElementChild;
    }
    // Collect all direct children (could be img, text, button, etc) as an array
    const contentNodes = Array.from(contentDiv.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '')
    );
    // If there's just one content node, return it, otherwise return all as array
    if (contentNodes.length === 1) {
      return contentNodes[0];
    } else if (contentNodes.length > 1) {
      return contentNodes;
    }
    // If no node found, fallback to empty string
    return '';
  });

  // Compose the table data: header row (single column as per spec), then one row with all columns' content
  const tableRows = [
    ['Columns (columns16)'],
    cellsRow
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
