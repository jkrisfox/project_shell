const { User, Session, ToDo } = require('../models');

const models = [ToDo, Session, User];

module.exports = function truncate() {
  return Promise.all(
    models.map(model => model.destroy({
      where: {},
      force: true,
    })),
  );
};
