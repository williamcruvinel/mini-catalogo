document.addEventListener('DOMContentLoaded', function () {
  async function getCards() {
    try {
      const res = await fetch('http://localhost:3000/cards');
      const cards = await res.json();

      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

      const containerCatalogo = document.querySelector('.container-card-grid');
      const containerFavoritos = document.querySelector(
        '.container-card-favorito',
      );

      if (containerCatalogo) containerCatalogo.innerHTML = '';
      if (containerFavoritos) containerFavoritos.innerHTML = '';

      function isFavorito(id) {
        return favoritos.includes(id);
      }

      function toggleFavorito(id) {
        if (isFavorito(id)) {
          favoritos = favoritos.filter((f) => f !== id);
        } else {
          favoritos.push(id);
        }

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        render();
      }

      function criarCard(card) {
        const cardEl = document.createElement('li');
        cardEl.className = 'card';
        cardEl.setAttribute('data-id', card.id);

        cardEl.innerHTML = `
        <div class="card-image">
          <img src="${card.url}" class="card-img" alt="${card.titulo}">
        </div>

        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">${card.titulo}</h3>
            <button class="btn-icon">
                <i class="${
                  isFavorito(card.id)
                    ? 'fa-solid fa-heart'
                    : 'fa-regular fa-heart'
                }"></i>
            </button>
          </div>

          <p class="card-description">${card.descricao}</p>
          <p class="card-lancamento">Lançamento: ${card.lancamento}</p>
          <div class="container-btn-resumo">
            <button class="btn-resumo">Ver Resumo</button>
          </div>
          
        </div>
      `;

        const btn = cardEl.querySelector('.btn-icon');
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleFavorito(card.id);
        });

        return cardEl;
      }

      function render() {
        if (containerCatalogo) {
          containerCatalogo.innerHTML = '';
          cards.forEach((card) => {
            containerCatalogo.appendChild(criarCard(card));
          });
        }

        if (containerFavoritos) {
          containerFavoritos.innerHTML = '';
          cards
            .filter((card) => isFavorito(card.id))
            .forEach((card) => {
              containerFavoritos.appendChild(criarCard(card));
            });
        }
      }
      render();
    } catch (error) {
      console.error('Erro ao carregar cards:', error);
    }
  }
  getCards();

  // TEMA
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');

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
      if (!themeIcon) return;
      themeIcon.className =
        currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }
});
