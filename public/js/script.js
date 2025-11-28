document.addEventListener('DOMContentLoaded', function () {
  async function getCards() {
    try {
    
      let res;
      try {
        res = await fetch('http://localhost:3000/cards');
      } catch (errLocal) {
        console.warn('fetch localhost falhou, tentando /cards', errLocal);
        res = await fetch('/cards');
      }

      if (!res.ok) {
        console.error('Resposta de /cards não OK:', res.status, res.statusText);
        return;
      }

      const cards = await res.json();
      console.log('cards carregados:', cards);

      const containerCardEl = document.querySelector('.container-card-grid');
      const containerCardFavoriteEl = document.querySelector('.container-card-favorito');

      if (!containerCardEl && !containerCardFavoriteEl) {
        console.warn('Nenhum container de cards encontrado no DOM.');
        return;
      }

      if (containerCardEl) containerCardEl.innerHTML = '';
      if (containerCardFavoriteEl) containerCardFavoriteEl.innerHTML = '';

      cards.forEach((card, index) => {
        const cardEl = document.createElement('li');
        cardEl.className = 'card';

        const cardImgEl = document.createElement('div');
        cardImgEl.className = 'card-image';

        const img = document.createElement('img');
        img.src = card.url;
        img.alt = `Capa manga ${card.titulo}`;
        img.className = 'card-img';
        cardImgEl.appendChild(img);

        const cardContentEl = document.createElement('li');
        cardContentEl.className = 'card-content';

        const cardHeaderEl = document.createElement('div');
        cardHeaderEl.className = 'card-header';

        const title = document.createElement('h3');
        title.textContent = card.titulo;

        const icon = document.createElement('i');
        icon.className = card.favorito ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

        cardHeaderEl.appendChild(title);
        cardHeaderEl.appendChild(icon);

        const description = document.createElement('p');
        description.className = 'card-description';
        description.textContent = card.descricao;

        const lancamento = document.createElement('p');
        lancamento.className = 'card-lancamento';
        lancamento.textContent = `Lançamento: ${card.lancamento}`;

        cardContentEl.appendChild(cardHeaderEl);
        cardContentEl.appendChild(description);
        cardContentEl.appendChild(lancamento);

        cardEl.appendChild(cardImgEl);
        cardEl.appendChild(cardContentEl);

        if (containerCardEl) {
          containerCardEl.appendChild(cardEl);
        }

        if (card.favorito) {
          if (!containerCardFavoriteEl) {
            console.warn('Card marcado como favorito mas container de favoritos não existe. card index:', index, card);
          } else {
            const cloneCard = cardEl.cloneNode(true);
            containerCardFavoriteEl.appendChild(cloneCard);
          }
        }
      });
    } catch (err) {
      console.error('Erro ao carregar cards:', err);
    }
  }

  getCards();

  // TEMA (mantive como antes, sem mudanças)
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (themeToggle) {
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
      themeIcon.className = currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }
});