const request = require('supertest');
const app = require('../../app');
const truncate = require('../truncate');
const { ToDo, User } = require('../../models');

const rootPath = '/todos';

describe('/todos', () => {
  const createUser = () =>
    User.create({
      username: `test${new Date().getTime()}`,
      password: 'test'
    });

  afterAll(() => truncate().then(() => ToDo.sequelize.close()));

  describe('GET /', () => {
    it('should return an empty array', () =>
      createUser().then(loggedInUser =>
        request(app)
          .get(rootPath)
          .set('user-id', loggedInUser.id)
          .expect(response => expect(response.body.todos).toEqual([]))
      ));
    it('should return 1 item in the array', () =>
      ToDo.create({
        subject: 'test'
      }).then(todo =>
        createUser().then(loggedInUser =>
          loggedInUser.addToDo(todo).then(() =>
            request(app)
              .get(rootPath)
              .set('user-id', loggedInUser.id)
              .expect(response => expect(response.body.todos.length).toEqual(1))
          )
        )
      ));
  });

  describe('POST /', () => {
    it('should create one todo item', () =>
      createUser().then(loggedInUser =>
        request(app)
          .post(rootPath)
          .set('user-id', loggedInUser.id)
          .send({
            subject: 'test'
          })
          .expect(200)
          .then(response => expect(response.body.subject).toEqual('test'))
      ));
  });
});
