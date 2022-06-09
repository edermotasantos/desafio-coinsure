const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('1 - Sua aplicação deve ter o endpoint POST `/user`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  });

  it('Será validado que é possível cadastrar um usuário com sucesso', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves@gmail.com',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Antônio',
          email: 'castroalves@gmail.com',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"displayName" length must be at least 8 characters long');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: '@gmail.com',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" is required');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves@gmail.com',
          password: '12345',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" length must be 6 characters long');
      });
  });

  it('Será validado que o campo `password` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves@gmail.com',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
       })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" is required');
      });
  });

  it('Validar que não é possível cadastrar um usuário com email já existente', async () => {
    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves@gmail.com',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/user`,
        {
          displayName: 'Castro Alves',
          email: 'castroalves@gmail.com',
          password: '123456',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/CastroAlves.jpg',
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('User already registered');
      });
  });
});
