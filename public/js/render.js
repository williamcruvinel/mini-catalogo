import { isFavorito, toggleFavorito } from './favoritos.js';

export function criarCard(card) {
  const li = document.createElement('li');
  li.className = 'card';
  li.dataset.id = card.id;

  li.innerHTML = `
    <div class="card-image">
      <img src="${card.url}" class="card-img" alt="${card.titulo}">
    </div>

    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title">${card.titulo}</h3>
        <button class="btn-icon">
          <i class="${
            isFavorito(card.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
          }"></i>
        </button>
      </div>
      <p class="card-description">${card.descricao}</p>
      <p class="card-lancamento">Lançamento: ${card.lancamento}</p>
      <div class="container-btn-resumo">
          <button href="./summary.html"  class="btn-resumo" data-id="${card.id}">VER RESUMO</button>
      </div>
    </div>
  `;

  const btn = li.querySelector('.btn-icon');
  btn.addEventListener('click', () => {
    toggleFavorito(card.id);

    const icone = btn.querySelector('i');
    icone.className = isFavorito(card.id)
      ? 'fa-solid fa-heart'
      : 'fa-regular fa-heart';
  });

  return li;
}

export function renderCards(container, cards) {
  if (!container) return;
  container.innerHTML = '';
  cards.forEach((card) => container.appendChild(criarCard(card)));
}
