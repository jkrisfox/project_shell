const authenticator = require('../../routes/authenticator');
const truncate = require('../truncate');
const { User, Session } = require('../../models');

describe('authenticator', () => {
  const createUser = () =>
    User.create({
      username: `test${new Date().getTime()}`,
      password: 'password'
    });
  const createSession = user => {
    const newSession = Session.build({
      expiration: new Date(new Date().getTime() + 30 * 60000)
    });
    return user.setSession(newSession);
  };

  afterAll(() => truncate().then(() => Session.sequelize.close()));

  describe('login', () => {
    it('should create a session for the user', () =>
      createUser().then(user =>
        authenticator
          .login(user.username, user.password)
          .then(session => expect(session).toBeDefined())
      ));

    it('should set the expirate to be greater than now', () =>
      createUser().then(user =>
        authenticator
          .login(user.username, user.password)
          .then(session =>
            expect(session.expiration.getTime()).toBeGreaterThan(new Date().getTime())
          )
      ));

    it("shouldn't create a session of the username is incorrect", () =>
      createUser().then(user =>
        authenticator.login('blah', user.password).catch(error => expect(error).toBeDefined())
      ));

    it("shouldn't create a session of the password is incorrect", () =>
      createUser().then(user =>
        authenticator
          .login(user.username, 'bad password')
          .catch(error => expect(error).toBeDefined())
      ));

    it("shouldn't create a session of the username is incorrect", () =>
      createUser().then(user =>
        authenticator.login(null, user.password).catch(error => expect(error).toBeDefined())
      ));

    it("shouldn't create a session of the password is incorrect", () =>
      createUser().then(user =>
        authenticator.login(user.username, null).catch(error => expect(error).toBeDefined())
      ));
  });
  describe('logout', () => {
    it('should logout a user that has been logged in', () =>
      createUser().then(user =>
        createSession(user).then(() =>
          authenticator.logout(user).then(value => expect(value).toBeTruthy())
        )
      ));

    it("should logout a user that wasn't logged in", () =>
      createUser().then(user =>
        authenticator.logout(user).then(value => expect(value).toBeTruthy())
      ));
  });
  describe('isAuthenticated', () => {
    it('should return true of the user is currently logged in', () =>
      createUser().then(user =>
        createSession(user).then(() =>
          authenticator.isAuthenticated(user).then(value => expect(value).toBeTruthy())
        )
      ));

    it("should return false if the user isn't logged in", () =>
      createUser().then(user =>
        authenticator.isAuthenticated(user).then(value => expect(value).toBeFalsy())
      ));
  });
});
