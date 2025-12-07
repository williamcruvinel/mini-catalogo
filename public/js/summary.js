import { buscarCards } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    document.body.setAttribute('data-theme', 'dark');
  }

  const summaryContentEl = document.querySelector('.content-summary');

  const cards = await buscarCards();
  console.log('cards:', cards);

  const id = Number(localStorage.getItem('summaryId'));
  console.log('summaryId from localStorage:', id);

  if (!summaryContentEl) {
    console.warn('.content-summary não encontrado no DOM');
    return;
  }

  const card = cards.find((c) => Number(c.id) === id);

  if (!card) {
    return;
  } else {
    renderSummary(summaryContentEl, card);
  }
});

export function renderSummary(summaryContentEl, card) {
  if (!summaryContentEl) return;

  summaryContentEl.innerHTML = `
      <h2 class="summary-title">${card.titulo}</h2>
      <div class="info-summary">
        <div class="img-summary-container">
          <img src="${card.url}" alt="${card.titulo}" class="img-summary" />
        </div>
        <p class="text-summary">${card.summary}</p>
        <button class="btn-voltar">Voltar</button>
      </div>
    `;

  const btnVoltar = summaryContentEl.querySelector('.btn-voltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => history.back());
  }
}
