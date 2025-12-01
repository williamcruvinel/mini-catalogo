import { renderCards } from './render.js';
import { getFavoritos, isFavorito } from './favoritos.js';

export function filtrarCatalogo(cards, texto, container) {
  const termo = texto.toLowerCase();

  const filtrados = cards.filter((card) =>
    card.titulo.toLowerCase().includes(termo),
  );

  renderCards(container, filtrados);
}

export function filtrarFavoritos(cards, texto, container) {
  const termo = texto.toLowerCase();

  const favoritos = cards.filter((card) => isFavorito(card.id));

  const filtrados = favoritos.filter((card) =>
    card.titulo.toLowerCase().includes(termo),
  );

  renderCards(container, filtrados);
}
