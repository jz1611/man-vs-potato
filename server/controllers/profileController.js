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
    console.log(req.session.user)
    const { username, firstName, lastName, email, birthday, gender } = req.body;
    const foundUsername = await db.select_user_username(username);
    if (foundUsername.length) {
      if (foundUsername[0].user_id !== id) {
        res.status(409).send('There is already a user with that username.');
      } else {
        await db.edit_user([id, username, firstName, lastName, email, birthday, gender]);
        req.session.user = {
          ...req.session.user,
          username: username
        };
        res.status(200).send('Successfully updated account.');
      }
    }
  }
}