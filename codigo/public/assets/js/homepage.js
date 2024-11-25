<script>
  fetch('http://localhost:3000/botoes')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('deck-container');

      data.forEach(item => {
        const deck = document.createElement('div');
        deck.className = 'deck-container';
        deck.innerHTML = `
          <a href="${item.link}" class="deck-bar">${item.titulo}</a>
          <div class="deck-numbers">
            <span class="red">${item.numeros.red}</span>
            <span class="blue">${item.numeros.blue}</span>
            <span class="green">${item.numeros.green}</span>
          </div>
        `;
        container.appendChild(deck);
      });
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
</script>
