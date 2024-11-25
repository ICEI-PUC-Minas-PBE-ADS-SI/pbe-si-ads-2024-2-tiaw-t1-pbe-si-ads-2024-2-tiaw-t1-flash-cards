const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../../db/db.json');

const newDeckName = 'Novo Deck'; //Substituir
const newDeckDescription = 'Descrição do Novo Deck'; //Substituir

fs.readFile(dbPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  const db = JSON.parse(data);

  // Calcular o próximo ID disponível
  const nextId = db.decks.length > 0 ? Math.max(...db.decks.map(deck => deck.id)) + 1 : 1;

  const newDeck = {
    id: nextId,
    name: newDeckName,
    description: newDeckDescription,
    userId: 1,
    flashcards: []
  };

  db.decks.push(newDeck);

  fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', writeErr => {
    if (writeErr) {
      console.error('Erro ao escrever no arquivo:', writeErr);
      return;
    }
    console.log(`Deck "${newDeckName}" criado com sucesso!`);
  });
});
