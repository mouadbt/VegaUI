export const combobox = () => {
  const filterPopover = (popover, searchValue) => {
    let hasVisibleItems = false;

    popover.querySelectorAll('.combobox-item').forEach(item => {
      const isVisible = item.textContent.toLowerCase().includes(searchValue);
      item.classList.toggle('hidden', !isVisible);
      if (isVisible) hasVisibleItems = true;
    });

    popover.querySelectorAll('.combobox-group').forEach(group => {
      group.classList.toggle('hidden', !group.querySelector('.combobox-item:not(.hidden)'));
    });

    const emptyState = popover.querySelector('.combobox-empty');
    if (emptyState) emptyState.style.display = hasVisibleItems ? 'none' : 'block';
  };

  const getPopover = (id) => document.getElementById(id);

  const ensureOpen = (popover) => {
    if (!popover.matches(':popover-open') && typeof popover.showPopover === 'function') {
      popover.showPopover();
    }
  };

  const openInlinePopover = (triggerGroup) => {
    const input = triggerGroup.querySelector('.input');
    if (!input) return;
    const popover = getPopover(input.getAttribute('data-popover-target'));
    if (!popover) return;
    if (!popover.matches(':popover-open') && typeof popover.showPopover === 'function') {
      popover.showPopover();
      filterPopover(popover, '');
    }
  };

  const handleSearchInput = (target) => {
    const popover = target.closest('.combobox-popover');
    if (popover) filterPopover(popover, target.value.toLowerCase());
  };

  const handleTriggerInput = (target) => {
    const triggerGroup = target.closest('.combobox-input-trigger');
    if (!triggerGroup || !target.matches('.input')) return;
    const popover = getPopover(target.getAttribute('data-popover-target'));
    if (!popover) return;
    ensureOpen(popover);
    filterPopover(popover, target.value.toLowerCase());
    if (target.value === '') {
      popover.querySelector('[data-selected]')?.removeAttribute('data-selected');
    }
  };

  const updateTriggerLabel = (popover, label) => {
    const btn = document.querySelector(`button[popovertarget="${popover.id}"] .combobox-value`);
    if (btn) btn.textContent = label;

    const group = document.querySelector(`.combobox-input-trigger:has(input[data-popover-target="${popover.id}"])`);
    const input = group?.querySelector('.input');
    if (input) {
      input.value = label;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const handleItemClick = (target) => {
    const item = target.closest('.combobox-item');
    if (!item) return;
    const popover = item.closest('.combobox-popover');
    if (!popover) return;

    popover.querySelector('[data-selected]')?.removeAttribute('data-selected');
    item.setAttribute('data-selected', 'true');
    updateTriggerLabel(popover, item.dataset.label || item.textContent.trim());
    if (typeof popover.hidePopover === 'function') popover.hidePopover();
  };

  document.addEventListener('input', (e) => {
    if (e.target.matches('.combobox-input')) handleSearchInput(e.target);
    else handleTriggerInput(e.target);
  });

  document.addEventListener('focusin', (e) => {
    const group = e.target.closest('.combobox-input-trigger');
    if (group && e.target.matches('.input')) openInlinePopover(group);
  });

  document.addEventListener('click', (e) => {
    const group = e.target.closest('.combobox-input-trigger');
    if (group) { openInlinePopover(group); return; }
    handleItemClick(e.target);
  });

  document.addEventListener('toggle', (e) => {
    if (e.newState !== 'open' || !e.target.classList?.contains('combobox-popover')) return;
    const search = e.target.querySelector('.combobox-input');
    if (!search) return;
    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    requestAnimationFrame(() => search.focus());
  }, true);
};

combobox();