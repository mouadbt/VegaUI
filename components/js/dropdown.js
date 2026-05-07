import { keyNav } from './base.js';

const getMenuItems = (menu) => [...menu.querySelectorAll('[role="menuitem"]')];

const closeNestedSiblings = (menu) => {
  menu.parentElement?.closest('[popover]')
    ?.querySelectorAll(':scope > [popover]:popover-open')
    .forEach(sub => sub !== menu && sub.hidePopover());
};

const handleToggle = (event, menu) => {
  const trigger = document.querySelector(`[popovertarget="${menu.id}"]`);
  if (trigger) trigger.setAttribute('data-state', event.newState);
  if (event.newState === 'open') {
    getMenuItems(menu)[0]?.focus();
    closeNestedSiblings(menu);
  }
};

const openSubmenu = (item) => {
  const sub = document.getElementById(item.getAttribute('popovertarget'));
  if (sub) {
    sub.showPopover();
    sub.querySelector('[role="menuitem"]')?.focus();
  }
};

const collapseToParent = (menu, trigger) => {
  menu.hidePopover();
  trigger?.focus();
};

const closeMenuChain = (menu) => {
  let current = menu;
  while (current) {
    current.hidePopover();
    current = document.querySelector(`[popovertarget="${current.id}"]`)?.closest('[popover]');
  }
};

const handleKeydown = (event, menu) => {
  const items = getMenuItems(menu);
  const currentIndex = items.indexOf(event.target);
  if (currentIndex < 0) return;

  const nextIndex = keyNav(event, currentIndex, items.length, { prevKey: 'ArrowUp', nextKey: 'ArrowDown', homeEnd: true });
  if (nextIndex >= 0) items[nextIndex].focus();

  const trigger = document.querySelector(`[popovertarget="${menu.id}"]`);
  if (event.key === 'ArrowRight' && event.target.hasAttribute('popovertarget')) openSubmenu(event.target);
  else if (event.key === 'ArrowLeft' && trigger?.closest('[popover]')) collapseToParent(menu, trigger);
};

const handleClick = (event, menu) => {
  if (event.target.closest('[role="menuitem"]:not([popovertarget])')) closeMenuChain(menu);
};

const handleDropdownEventInternal = event => {
  const menu = event.target.closest('[popover]');
  if (!menu) return;
  if (event.type === 'toggle') handleToggle(event, menu);
  else if (event.type === 'keydown') handleKeydown(event, menu);
  else if (event.type === 'click') handleClick(event, menu);
};

['keydown', 'click'].forEach(type =>
  document.addEventListener(type, e => e.target.closest('[role="menuitem"]') && handleDropdownEventInternal(e))
);
document.addEventListener('toggle', e => e.target.closest('[popover]') && handleDropdownEventInternal(e), true);

let hoverTimer;

const closeSiblingSubmenus = (menu, activeItem) => {
  menu.querySelectorAll('[popovertarget]').forEach(trigger => {
    if (trigger === activeItem) return;
    const sub = document.getElementById(trigger.getAttribute('popovertarget'));
    if (sub?.matches(':popover-open')) sub.hidePopover();
  });
};

document.addEventListener('mouseover', e => {
  const item = e.target.closest('[role="menuitem"]');
  clearTimeout(hoverTimer);
  if (!item) return;

  hoverTimer = setTimeout(() => {
    const targetId = item.getAttribute('popovertarget');
    if (targetId) document.getElementById(targetId)?.showPopover();

    const menu = item.closest('[popover]');
    if (menu) closeSiblingSubmenus(menu, item);
  }, 100);
});

export const handleDropdownEvent = handleDropdownEventInternal;