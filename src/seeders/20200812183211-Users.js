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
        displayName: 'Nikola Tesla',
        email: 'nikolatesla@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Nikola_Tesla_04851u_original.jpg',
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

