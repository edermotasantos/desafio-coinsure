module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(Sequelize);
    await queryInterface.bulkInsert('products',
      [
        {
          id: 1,
          user_id: 1,
          title: 'Notebook I7 Com 16gb De Memória! Imperdivel!!!',
          description: 'Produto funcionando perfeitamente! Bateria com duração de 5h',
          price: 3000.00,
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Machado_de_Assis_real_negro.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          user_id: 1,
          title: 'Notebook barato!!! Raridade!!!',
          description: 'O notebook Lenovo IdeaPad 3 foi projetado para tornar sua vida mais fácil.',
          price: 5000.00,
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Machado_de_Assis_real_negro.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    console.log(Sequelize);
    await queryInterface.bulkDelete('Products', null, {});
  },
};
