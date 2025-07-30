/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];

  // Get tab panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Compose table header: block name 'Tabs'
  const rows = [['Tabs']];

  // For each tab, add a row [tab label, tab content]
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    // Extract label: from first child div, else from textContent
    let labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();

    // Extract content: take the grid child (the main block), else all children
    let contentBlock = tabPanes[i].querySelector(':scope > .grid-layout, :scope > .w-layout-grid');
    let content;
    if (contentBlock) {
      content = contentBlock;
    } else {
      // In rare case, take all children
      const paneChildren = Array.from(tabPanes[i].children).filter(el => el.nodeType === 1);
      content = paneChildren.length === 1 ? paneChildren[0] : paneChildren;
    }
    rows.push([label, content]);
  }

  // Replace the original element with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
