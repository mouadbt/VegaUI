const initialized = new WeakSet();

export const sidebar = () => {
  document.querySelectorAll('.sidebar-provider').forEach((provider) => {
    if (initialized.has(provider)) return;
    initialized.add(provider);
    if (window.innerWidth <= 768) provider.dataset.state = 'closed';
  });
};

window.sidebar = sidebar;
sidebar();

new MutationObserver(sidebar).observe(document.body, { childList: true, subtree: true });

const isMobile = () => window.innerWidth <= 768;

const handleTriggerClick = (provider) => {
  provider.dataset.state = provider.dataset.state === 'open' ? 'closed' : 'open';
};

const handleMobileOverlayClick = (provider, target) => {
  const isNavTarget = target === provider || target.closest('a[href], .sidebar-menu-button:not(summary)');
  if (isNavTarget) provider.dataset.state = 'closed';
};

document.addEventListener('click', (e) => {
  const provider = e.target.closest('.sidebar-provider');
  if (!provider) return;

  if (e.target.closest('.sidebar-trigger')) {
    handleTriggerClick(provider);
  } else if (isMobile() && provider.dataset.state === 'open') {
    handleMobileOverlayClick(provider, e.target);
  }
});