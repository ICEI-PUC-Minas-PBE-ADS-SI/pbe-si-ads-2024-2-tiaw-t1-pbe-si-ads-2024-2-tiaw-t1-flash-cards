const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para permitir JSON e CORS// CORS precisa estar instalado usando npm install cors
app.use(express.json());
app.use(cors()); // Habilita CORS para corrigir o erro de acesso ao JSON server

const dbPath = path.join(__dirname, '../../../db/db.json');

app.post('/create-deck', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Nome e descrição são obrigatórios!' });
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
    }

    const db = JSON.parse(data);

    // Calcular o próximo ID disponível
    const nextId = db.decks.length > 0 ? Math.max(...db.decks.map(deck => deck.id)) + 1 : 1;

    const newDeck = {
      id: nextId,
      name,
      description,
      userId: 1,
      flashcards: []
    };

    db.decks.push(newDeck);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Erro ao escrever no arquivo:', writeErr);
        return res.status(500).json({ error: 'Erro ao salvar o deck.' });
      }
      res.status(200).json({ message: `Deck "${name}" criado com sucesso!` });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
