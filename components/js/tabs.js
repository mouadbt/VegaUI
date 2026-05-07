import { keyNav } from './base.js';

const activateTab = (tab) => {
  const tablist = tab.closest('[role="tablist"]') || document;
  tablist.querySelectorAll('[role="tab"]').forEach(t => {
    const active = t === tab;
    t.setAttribute('aria-selected', active);
    t.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !active;
  });
};

document.addEventListener('click', e => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) activateTab(tab);
});

document.addEventListener('keydown', e => {
  const tab = e.target.closest('[role="tab"]');
  if (!tab) return;

  const wrapper = tab.closest('[role="tablist"]') || document;
  const isVert = wrapper.getAttribute('aria-orientation') === 'vertical';
  const tabs = [...wrapper.querySelectorAll('[role="tab"]')];

  const nextIndex = keyNav(e, tabs.indexOf(tab), tabs.length, {
    prevKey: isVert ? 'ArrowUp' : 'ArrowLeft',
    nextKey: isVert ? 'ArrowDown' : 'ArrowRight',
    homeEnd: true
  });

  if (nextIndex >= 0) {
    tabs[nextIndex].click();
    tabs[nextIndex].focus();
  }
});