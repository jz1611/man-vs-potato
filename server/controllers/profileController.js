const bcrypt = require('bcryptjs');

module.exports = {
  getUser: async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    const user = await db.select_user_id(id);
    res.status(200).send(user);
  },

  updateUser: async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    const { username, firstName, lastName, email, birthday, gender } = req.body;
    const foundUsername = await db.select_user_username(username);
    if (foundUsername.length) {
      if (foundUsername[0].user_id !== id) {
        res.status(409).send('There is already a user with that username.');
      } else {
        db.edit_user([id, username, firstName, lastName, email, birthday, gender]);
        req.session.user = {
          ...req.session.user,
          username: username
        };
        res.status(200).send('Successfully updated account.');
      }
    } else {
      db.edit_user([id, username, firstName, lastName, email, birthday, gender]);
      req.session.user = {
        ...req.session.user,
        username: username
      };
      res.status(200).send('Successfully updated account.');
    }
  },

  updatePassword: async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    const { password, oldPassword } = req.body;
    const foundUser = await db.select_user_id(id).catch(err => console.log(err));
    const matchPasswords = await bcrypt
      .compare(oldPassword, foundUser[0].password)
      .catch(err => console.log(err));
    if(matchPasswords) {
      const saltRounds = 15;
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(password, salt).then(hashedPassword => {
          db.edit_password([id, hashedPassword]);
          res.status(200).send('Password updated.');
        });
      });
    } else {
      res.status(401).send('Incorrect old password.');
    }
  },

  deleteUser: async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.session.user;
    db.delete_user(id);
    req.session.user = null;
    res.status(200).send('User deleted.');
  }
}