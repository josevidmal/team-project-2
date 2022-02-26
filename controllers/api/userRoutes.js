const router = require('express').Router();
const { Users } = require('../../models/index');

router.post('/signup', async (req, res) => {
    try {
        const userData = await Users.create({
            type: "member",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nick_name: req.body.nick_name,
            date_of_birth: req.body.date_of_birth,
            mobile_phone: req.body.mobile_phone,
            tier: 1,
            HUG_id: req.body.HUG_id,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'email or password is incorrect, try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'email or password is incorrect, try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You have logged in' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    console.log(req.session);
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;
