const express = require('express');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());

// endpoint para o avaliador que será implementado
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/post', productRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
