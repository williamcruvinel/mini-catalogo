export function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos')) || [];
}

export function isFavorito(id) {
  const favoritos = getFavoritos();
  return favoritos.includes(id);
}

export function toggleFavorito(id) {
  let favoritos = getFavoritos();

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((f) => f !== id);
  } else {
    favoritos.push(id);
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  // Dispara o evento "favoritosUpdated" para avisar que a lista de favoritos mudou
  // Envia junto os favoritos atualizados dentro de detail
  document.dispatchEvent(
    new CustomEvent('favoritosUpdated', { detail: { favoritos } }),
  );
}
