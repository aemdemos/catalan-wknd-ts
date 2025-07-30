/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as in the spec
  const rows = [['Cards (cards10)']];

  // Each card is a direct child <a> of the block
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // First cell: Image (must be present)
    const aspectWrap = card.querySelector('.utility-aspect-3x2');
    const img = aspectWrap ? aspectWrap.querySelector('img') : null;
    // Use the existing image element if present, else empty
    const imgCell = img || document.createTextNode('');

    // Second cell: Content (tags, title, description, cta)
    const contentWrap = card.querySelector('.utility-padding-all-1rem');
    const contentCell = [];
    if (contentWrap) {
      // Tag (if present)
      const tag = contentWrap.querySelector('.tag');
      if (tag) contentCell.push(tag);
      // Title (h3 or .h4-heading)
      const heading = contentWrap.querySelector('h3, .h4-heading');
      if (heading) contentCell.push(heading);
      // Description (p)
      const desc = contentWrap.querySelector('p');
      if (desc) contentCell.push(desc);
      // CTA (robustness: if a link is present as a CTA, though not in sample)
      const ctas = contentWrap.querySelectorAll('a');
      ctas.forEach(cta => {
        // Only add if it's not the card itself (shouldn't happen, but robust)
        if (!cta.closest('a.card-link')) {
          contentCell.push(cta);
        }
      });
    }
    rows.push([imgCell, contentCell]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
