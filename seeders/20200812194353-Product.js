module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(Sequelize);
    await queryInterface.bulkInsert('Products',
      [
        {
          id: 1,
          title: 'Notebook I7 Com 16gb De Memória! Imperdivel!!!',
          description: 'Produto funcionando perfeitamente! Bateria com duração de 5h',
          price: 3000.00,
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Notebook barato!!! Raridade!!!',
          description: 'O notebook Lenovo IdeaPad 3 foi projetado para tornar sua vida mais fácil.',
          price: 5000.00,
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    console.log(Sequelize);
    await queryInterface.bulkDelete('Products', null, {});
  },
};
