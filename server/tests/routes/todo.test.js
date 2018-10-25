const request = require('supertest');
const app = require('../../app');
const { ToDo, User, Session } = require('../../models');
const truncate = require('../truncate');

const rootPath = '/todos';

describe('/todos', () => {
  const createUser = () =>
    User.create({
      username: `test${new Date().getTime()}`,
      password: 'test'
    });
  const login = user => {
    const session = Session.build({
      expiration: new Date(new Date().getTime() + 30 * 6000)
    });
    return session.setUser(user).then(sess => sess.save().then(() => user));
  };
  beforeAll(() => truncate());
  afterAll(() => ToDo.Sequelize.close());
  describe('GET /', () => {
    it('should return an empty array', () =>
      createUser().then(user =>
        login(user).then(loggedInUser =>
          request(app)
            .get(rootPath)
            .set('user_id', loggedInUser.id)
            .expect(response => expect(response.body.todos).toEqual([]))
        )
      ));

    it('should return 1 item in the array', () =>
      createUser()
        .then(user => login(user))
        .then(loggedInUser => {
          ToDo.build({ subject: 'test' })
            .setUser(loggedInUser)
            .then(newTodo =>
              newTodo.save().then(() =>
                request(app)
                  .get(rootPath)
                  .set('user_id', loggedInUser.id)
                  .expect(response => expect(response.body.todos.length).toEqual(1))
              )
            );
        }));
  });

  describe('POST /', () => {
    it('should create one todo item', () =>
      createUser().then(user =>
        login(user).then(loggedInUser =>
          request(app)
            .post(rootPath)
            .set('user_id', loggedInUser.id)
            .send({
              subject: 'test'
            })
            .expect(200)
            .then(response => expect(response.body.subject).toEqual('test'))
        )
      ));
  });
});
