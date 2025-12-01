export function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    body.setAttribute('data-theme', 'dark');
  }

  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const currentTheme = body.getAttribute('data-theme');
    if (!themeIcon) return;
    themeIcon.className =
      currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}