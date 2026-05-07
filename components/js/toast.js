const toasts = {};

function _get(placement) {
  if (!toasts[placement]) {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.setAttribute('popover', 'manual');
    el.setAttribute('data-placement', placement);
    el.setAttribute('role', 'log');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
    toasts[placement] = el;
  }

  return toasts[placement];
}

function _show(el, options = {}) {
  const { placement = 'top-right', duration = 4000 } = options;
  const p = _get(placement);

  el.classList.add('toast');

  let timeout;

  el.onmouseenter = () => clearTimeout(timeout);
  el.onmouseleave = () => {
    if (duration > 0) {
      timeout = setTimeout(() => _remove(el, p), duration);
    }
  };

  p.appendChild(el);
  if (!p.matches(':popover-open')) {
    p.showPopover();
  }

  if (duration > 0) {
    timeout = setTimeout(() => _remove(el, p), duration);
  }

  return el;
}

function _remove(el, container) {
  el.remove();
  if (!container.children.length) {
    container.hidePopover();
  }
}

function toast(content, options = {}) {
  const el = document.createElement('output');
  
  if (typeof content === 'string') {
    el.innerHTML = content;
  } else if (content instanceof Node) {
    el.appendChild(content);
  }

  return _show(el, options);
}

function toastEl(el, options = {}) {
  let t;

  if (el instanceof HTMLTemplateElement) {
    t = el.content.firstElementChild?.cloneNode(true);
  } else if (el) {
    t = el.cloneNode(true);
  }

  if (!t) {
    return;
  }

  t.removeAttribute('id');
  return _show(t, options);
}

function toastClear(placement) {
  if (placement && toasts[placement]) {
    toasts[placement].innerHTML = '';
    toasts[placement].hidePopover();
  } else {
    Object.values(toasts).forEach(c => {
      c.innerHTML = '';
      c.hidePopover();
    });
  }
}

function toastDismiss(el) {
  const container = el.closest('.toast-container');
  if (container) {
    _remove(el, container);
  }
}

document.addEventListener('click', e => {
  const dismissBtn = e.target.closest('[data-dismiss]');
  if (dismissBtn) {
    const toastEl = dismissBtn.closest('.toast');
    if (toastEl) toastDismiss(toastEl);
  }
});

window.toast = toast;
window.toastEl = toastEl;
window.toastClear = toastClear;
window.toastDismiss = toastDismiss;