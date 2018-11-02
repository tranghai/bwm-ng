const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function (req, res) {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }

    User.findOne({ email }, function (err, user) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invaild user!', detail: 'User does not exist!' }] });
        }

        if (user.hasSamePassword(password)) {
            // return JWT token
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, 'secret', { expiresIn: '1h' });

            return res.json(token);
        } else {
            return res.status(422).send({ errors: [{ title: 'Wrong data!', detail: 'Wrong email or password!' }] });
        }

    })
}

exports.register = function (req, res) {
    const { username, email, password, passwordConfirmation } = req.body;

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Invaild password!', detail: 'Password is not a same as confirmation' }] });
    }

    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invaild email!', detail: 'User with this email already exist!' }] });
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json({ 'registered': true });
        });

    });
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, function (err, user) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        });
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    var t = token.split(' ')[1];
    return jwt.verify(token.split(' ')[1], 'secret');
}

function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not authorized!', detail: 'You need to login to get access!' }] });
}