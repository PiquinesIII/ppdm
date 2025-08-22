const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

app.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal' });
});

app.get('/users/new', (req, res) => {
  res.render('form', { title: 'Cadastro' });
});

app.post('/users', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).render('error', { message: 'Nome e e-mail são obrigatórios.' });
  }
  users.push({ nome, email, createdAt: new Date() });
  res.redirect('/users');
});

app.get('/users', (req, res) => {
  res.render('list', { users, title: 'Usuários' });
});

app.get('/boom', (req, res) => {
  throw new Error('Erro proposital para testar a tela de erro.');
});


app.use((req, res) => {
  res.status(404).render('error', { message: 'Página não encontrada (404).' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { message: 'Erro interno do servidor (500).' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
