export const setTheme = theme => {
  const isDark = theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', theme);
  document.dispatchEvent(new CustomEvent('theme:change', { detail: { theme, isDark } }));
};

export const switchTheme = () => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');

setTheme(localStorage.getItem('theme') || 'system');

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'system') setTheme('system');
});

document.addEventListener('click', e => {
  const trigger = e.target.closest('.theme-toggle');
  if (trigger) {
    trigger.value ? setTheme(trigger.value) : switchTheme();
  }
});