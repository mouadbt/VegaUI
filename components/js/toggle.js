const handleLabelClick = (e) => {
  const label = e.target.closest('label[for]');
  if (!label) return;

  const input = document.getElementById(label.htmlFor);
  if (!input || input.type !== 'radio') return;

  e.preventDefault();
  input.checked = !input.checked || input.required;
  input.dispatchEvent(new Event('change', { bubbles: true }));
};

const handleRadioKeydown = (e) => {
  const el = e.target;
  const isUncheckedRadio = e.key === ' ' && el?.type === 'radio' && el.checked && !el.required;
  if (!isUncheckedRadio) return;

  e.preventDefault();
  el.checked = false;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

document.addEventListener('click', handleLabelClick);
document.addEventListener('keydown', handleRadioKeydown);