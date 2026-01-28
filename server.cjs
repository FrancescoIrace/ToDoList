const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Rotta per leggere le note
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  res.json(data.notes);
});

// Rotta per creare una nota
app.post('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const newNote = {
    id: Date.now(), // Usiamo il timestamp come ID univoco
    title: req.body.title,
    nota: req.body.content,
    data: req.body.data || new Date().toISOString().split('T')[0],
    ora: req.body.ora || new Date().toLocaleTimeString()
  };

  data.notes.push(newNote);

  //Salviamo su file
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(newNote);
});


// Rotta per eliminare una nota
app.delete('/api/notes/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  // Teniamo tutte le note TRANNE quella da eliminare
  const nuoveNote = data.notes.filter(n => String(n.id) !== String(req.params.id));

  if (data.notes.length === nuoveNote.length) {
    return res.status(404).json({ error: "Nota non trovata" });
  }

  data.notes = nuoveNote;

  // Salviamo su file
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.json({ message: "Nota eliminata con successo" });
});


app.get('/api/notes/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  // Cerchiamo la nota che ha lo stesso ID passato nell'URL
  const nota = data.notes.find(n => String(n.id) === String(req.params.id));

  if (nota) {
    res.json(nota);
  } else {
    console.log(`Nota con ID ${req.params.id} non trovata nel DB.`);
    res.status(404).json({ error: "Nota non trovata" });
  }

});

app.listen(PORT, () => {
  console.log(`🚀 Server SEMPLIFICATO pronto su http://localhost:${PORT}`);
});