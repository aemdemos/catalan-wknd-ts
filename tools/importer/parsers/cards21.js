/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards21)'];

  // Find all .card-body blocks (one or more cards)
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [];

  cardBodies.forEach((cardBody) => {
    // First column: image (required)
    const image = cardBody.querySelector('img');
    
    // Second column: title (heading) and description (all other text)
    // Get title
    const title = cardBody.querySelector('[class*="heading"], h1, h2, h3, h4, h5, h6');
    // Collect description: all siblings after title
    let descriptionNodes = [];
    if (title) {
      let node = title.nextSibling;
      while (node) {
        // Include element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
          descriptionNodes.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
          // Wrap non-empty text nodes in <p>
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          descriptionNodes.push(p);
        }
        node = node.nextSibling;
      }
    }
    // If no description, do not add empty
    const contentCell = descriptionNodes.length > 0 ? [title, ...descriptionNodes] : [title];

    // Defensive: skip if missing required content
    if (!image || !title) return;
    rows.push([image, contentCell]);
  });

  if (rows.length === 0) return;
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
