const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, '../../../db/db.json');

app.post('/registrar-resposta', (req, res) => {
  const { flashcardId, isCorrect } = req.body;

  if (typeof flashcardId !== 'number' || typeof isCorrect !== 'boolean') {
    return res.status(400).json({ error: 'Dados inválidos. Verifique flashcardId e isCorrect.' });
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
    }

    const db = JSON.parse(data);

    const nextId = db.answers.length > 0 ? Math.max(...db.answers.map(answer => answer.id)) + 1 : 1;// Calcular o próximo ID disponível

    const novaResposta = {
      id: nextId,
      userId: 1,
      flashcardId,
      isCorrect
    };

    db.answers.push(novaResposta);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Erro ao salvar no arquivo:', writeErr);
        return res.status(500).json({ error: 'Erro ao salvar a resposta.' });
      }
      res.status(200).json({ message: 'Resposta registrada com sucesso!' });
    });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
