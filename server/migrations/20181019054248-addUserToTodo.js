module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('ToDos', 'userId', { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' } });
  },

  down: (queryInterface) => {
   return queryInterface.removeColumn('ToDos', 'userId');
  },
};
