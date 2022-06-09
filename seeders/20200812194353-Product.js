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
          image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/inspiron-15-3511/pdp/notebook-inspiron-15-3511-pdp-mod3-bk-usb-c.psd?qlt=95&fit=constrain,1&hei=350&wid=500&fmt=jpg',
          userId: 1,
          published: new Date('2011-08-01T19:58:00.000Z'),
          updated: new Date('2011-08-01T19:58:51.000Z'),
        },
        {
          id: 2,
          title: 'Notebook barato!!! Raridade!!!',
          description: 'O notebook inspiron foi projetado para tornar sua vida mais fácil.',
          price: 5000.00,
          image: 'https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/inspiron-15-3511/pdp/notebook-inspiron-15-3511-pdp-mod01.jpg?fmt=jpg&wid=965&hei=570',
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
