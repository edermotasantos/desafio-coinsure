module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(Sequelize);
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Machado de Assis',
        email: 'machadodeassis@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Machado_de_Assis_real_negro.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        displayName: 'Monteiro Lobato',
        email: 'monteirolobato@gmail.com',
        password: '123456',
        image: 'https://commons.wikimedia.org/wiki/File:Monteiro_Lobato_1900s.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    console.log(Sequelize);
  },
};

