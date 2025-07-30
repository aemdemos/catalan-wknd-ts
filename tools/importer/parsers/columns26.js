/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main inner container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (holds heading, quote, nested grid)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get direct children of the grid (should be 3: heading, quote, nested-grid)
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;

  // left column: heading (h2), flex avatar/name/role block
  const leftColElements = [];
  // Heading
  if (gridChildren[0]) leftColElements.push(gridChildren[0]);

  // Nested grid (3rd child) contains divider, flex-horizontal (avatar), and logo
  const nestedGrid = gridChildren[2];
  if (nestedGrid) {
    const flex = nestedGrid.querySelector('.flex-horizontal');
    if (flex) leftColElements.push(flex);
  }

  // right column: quote (paragraph), logo (svg)
  const rightColElements = [];
  if (gridChildren[1]) rightColElements.push(gridChildren[1]);
  if (nestedGrid) {
    const logo = nestedGrid.querySelector('.utility-display-inline-block');
    if (logo) rightColElements.push(logo);
  }

  // Block table array
  const cells = [
    ['Columns (columns26)'],
    [leftColElements, rightColElements]
  ];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
