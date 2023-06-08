const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (user) => {
  return jwt.sign({ user: user.email }, process.env.ACCESS_KEY, { expiresIn: '10s' });
};

const refreshTokens = [];

async function signUp(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send('user already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ email, password: hashedPassword });
    res.status(201).end();
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
};

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'uncorrect password' })
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ user: user.email }, process.env.REFRESH_KEY, { expiresIn: '5d' });

    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken }).end();
  } catch (error) {
    console.log(error.message);
    res.status(400);
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).end();
  if (!refreshTokens.includes(refreshToken)) return res.status(401).end();

  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).end();
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken }).end();
  });
};

module.exports = {
  signUp,
  signIn,
  refreshToken
};