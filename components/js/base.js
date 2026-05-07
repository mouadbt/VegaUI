export function keyNav(e, idx, len, { prevKey, nextKey, homeEnd = false }) {
  const { key } = e;
  let next = -1;

  if (key === nextKey) next = (idx + 1) % len;
  else if (key === prevKey) next = (idx - 1 + len) % len;
  else if (homeEnd && key === 'Home') next = 0;
  else if (homeEnd && key === 'End') next = len - 1;

  if (next >= 0) e.preventDefault();
  return next;
}

if (!('commandForElement' in HTMLButtonElement.prototype)) {
  const resolveDialogCommand = (target, command) => {
    if (command === 'show-modal') return 'showModal';
    if (command === 'close') return 'close';
    return target.open ? 'close' : 'showModal';
  };

  document.addEventListener('click', e => {
    const btn = e.target.closest('button[commandfor]');
    if (!btn) return;

    const target = document.getElementById(btn.getAttribute('commandfor'));
    if (!target) return;

    const command = btn.getAttribute('command') || 'toggle';

    if (target instanceof HTMLDialogElement) {
      target[resolveDialogCommand(target, command)]();
    } else if (target.hasAttribute('popover')) {
      const method = command === 'hide-popover' ? 'hidePopover'
        : command === 'show-popover' ? 'showPopover'
        : 'togglePopover';
      target[method]();
    }
  });
}