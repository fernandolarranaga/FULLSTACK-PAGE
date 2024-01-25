const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../../models/user.model');

//POST /api/users/register
router.post('/register', (req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12)
        User.create(req.body)
            .then(user => res.json(user));
    } catch (error) {
        res.json({ error: error.message })
    }
});

//POST /api/users/login
router.post('/login', (req, res) => {
    //comprobar si el mail existe
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.json({ message: 'Invalid password/email' });
            }
            const eq = bcrypt.compareSync(req.body.password, user.password);
            if (!eq) {
                return res.json({ error: 'Invalid password/email' });
            }
            res.json({ 
                succes: "login Correcto", 
                token: createToken(user) 
            });
        });

})

function createToken(user) {

    const payload = {
        user_id: user._id,
        user_role: user.role,
    }
    return jwt.sign(payload, "Cabalgamos Sancho");
}


module.exports = router;