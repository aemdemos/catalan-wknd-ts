/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block name header
  const headerRow = ['Accordion (accordion34)'];

  // Get all top-level accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  const rows = accordionItems.map((item) => {
    // Title cell: Find title in .w-dropdown-toggle > .paragraph-lg
    let title = '';
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // fallback to any direct div that isn't the icon
        const icon = toggle.querySelector('.dropdown-icon');
        const others = Array.from(toggle.children).filter(child => child !== icon && child.tagName === 'DIV');
        if (others.length) title = others[0];
      }
    }

    // Content cell: nav.accordion-content > ...rich text
    let content = '';
    const nav = item.querySelector(':scope > nav.accordion-content');
    if (nav) {
      // Look for .rich-text.w-richtext, else use all children
      const rich = nav.querySelector('.rich-text.w-richtext');
      if (rich) {
        content = rich;
      } else {
        // Fallback: any content inside nav
        // But usually the content is wrapped in a .utility-padding-all-1rem
        const padDiv = nav.querySelector(':scope > div');
        if (padDiv) {
          content = padDiv;
        } else {
          // Fallback: just nav (should rarely happen)
          content = nav;
        }
      }
    }
    return [title, content];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
