const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res, next) => {
    const db = req.app.get('db');
    const { newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword } = req.body;
    const foundUserEmail = await db.select_user_email(newEmail).catch(err => console.log(err));
    const foundUserUsername = await db.select_user_username(newUsername).catch(err => console.log(err));
    if (foundUserEmail.length) {
      res.status(409).send('There is already a user with that email.');
    } else if (foundUserUsername.length) {
      res.status(409).send('There is already a user with that username.');
    } else {
      const saltRounds = 15;
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(newPassword, salt).then(hashedPassword => {
          db.create_user([newFirst, newLast, newUsername, newEmail, newDOB, newGender, hashedPassword])
          .then(user => {
            req.session.user.username = user[0].username;
            res.status(200).send(req.session.user);
          });
        });
      });
    }
  },

  login: async (req, res, next) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const foundUser = await db.select_user_username(username).catch(err => console.log(err));
    if (!foundUser.length) {
      res.status(401).send('That username does not exist.');
    } else {
      const matchPasswords = await bcrypt
      .compare(password, foundUser[0].password)
      .catch(err => console.log(err));

      if(matchPasswords) {
        req.session.user.username = username;
        res.status(200).send(req.session.user);
      } else {
        res.status(401).send('Incorrect password.');
      }
    }
  },

  logout: (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUserSession: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
}