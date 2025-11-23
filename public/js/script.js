// TEMA
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

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
  if (currentTheme === 'dark') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}