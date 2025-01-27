const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('./models/Usuario');

dotenv.config();
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rota cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, confirmSenha } = req.body;
  console.log('Dados recebidos:', { nome, email, senha, confirmSenha });

  if (!nome || !email || !senha || !confirmSenha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  if (senha !== confirmSenha) {
    return res.status(400).json({ message: 'As senhas não coincidem' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      name: nome,
      email,
      password: senhaHash,
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Rota login
app.post('/login', async (req, res) => {
  console.log('Dados recebidos no backend:', req.body);
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.password);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { userId: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

sequelize.sync()
  .then(() => console.log('Sincronização com o banco concluída.'))
  .catch((err) => console.error('Erro ao sincronizar:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
