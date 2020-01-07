const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res, next) => {
    const db = req.app.get('db');
    const { newFirst, newLast, newUsername, newEmail, newDOB, newGender, newPassword } = req.body;
    const foundUserEmail = await db.select_user_email(newEmail);
    const foundUserUsername = await db.select_user_username(newUsername);
    if (foundUserEmail.length) {
      res.status(409).send('There is already a user with that email.');
    } else if (foundUserUsername.length) {
      res.status(409).send('There is already a user with that username.');
    } else {
      const saltRounds = 15;
      bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(newPassword, salt).then(hashedPassword => {
          db.create_user([newFirst, newLast, newUsername, newEmail, newDOB, newGender, hashedPassword])
          .then(([user]) => {
            req.session.user = user;
            res.status(200).send(req.session.user);
          });
        });
      });
    }
  }
}