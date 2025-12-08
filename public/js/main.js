import { buscarCards } from './api.js';
import { renderCards } from './render.js';
import { initThemeToggle } from './theme.js';
import { isFavorito } from './favoritos.js';
import { ordenarPadrao, ordenarPorNome, ordenarPorLancamento } from './sort.js';

document.addEventListener('DOMContentLoaded', async () => {
  initThemeToggle();

  const cards = await buscarCards();

  const catalogoEl = document.querySelector('.container-card-grid');
  const favoritosEl = document.querySelector('.container-card-favorito');

  const searchCatalogoEl = document.querySelector('.search-catalogo');
  const searchFavoritoEl = document.querySelector('.search-favorite');

  const selectEl = document.querySelector('select[name="ordenar-select"]');

  function ordenar(cardsArr, tipo) {
    switch (tipo) {
      case 'nomeAZ':
        return ordenarPorNome(cardsArr);
      case 'lancamento':
        return ordenarPorLancamento(cardsArr);
      default:
        return ordenarPadrao(cardsArr);
    }
  }

  // Render Catálogo
  function renderCatalogo() {
    if (!catalogoEl) return;

    const texto = searchCatalogoEl?.value || '';
    const tipo = selectEl?.value || 'padrao';

    let filtrados = cards;

    if (texto.trim() !== '') {
      filtrados = cards.filter((c) =>
        c.titulo.toLowerCase().includes(texto.toLowerCase()),
      );
    }

    const ordenados = ordenar(filtrados, tipo);
    renderCards(catalogoEl, ordenados);
  }

  // Render Favoritos
  function renderFavoritos() {
    if (!favoritosEl) return;

    const texto = searchFavoritoEl?.value || '';
    const tipo = selectEl?.value || 'padrao';

    const favoritos = cards.filter((c) => isFavorito(c.id));

    let filtrados = favoritos;

    if (texto.trim() !== '') {
      filtrados = favoritos.filter((c) =>
        c.titulo.toLowerCase().includes(texto.toLowerCase()),
      );
    }

    const ordenados = ordenar(filtrados, tipo);
    renderCards(favoritosEl, ordenados);
  }

  // Inicialização
  renderCatalogo();
  renderFavoritos();

  // Filtro - catálogo
  searchCatalogoEl?.addEventListener('input', renderCatalogo);
  selectEl?.addEventListener('change', () => {
    renderCatalogo();
    renderFavoritos();
  });

  // Filtro - favoritos
  searchFavoritoEl?.addEventListener('input', renderFavoritos);

  // Escuta quando o meu evento customizado "favoritosUpdated" for disparado.
  document.addEventListener('favoritosUpdated', () => {
    renderFavoritos();
    renderCatalogo();
  });

  // Summary
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-resumo')) {
      const id = e.target.dataset.id;
      localStorage.setItem('summaryId', id);
      window.location.href = '/pages/summary.html';
    }
  });
});
