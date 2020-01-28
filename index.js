const express = require('express');
const passport = require("passport");
const path = require('path');

const usersRoutes = require('./routes/users');
const mealsRoutes = require('./routes/meals');
const plansRoutes = require('./routes/plans');
const nutrientsRoutes = require('./routes/nutrients');
const finelliDataRoutes = require('./routes/finelliData');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// passport middleware is used for checking JSON web token
app.use(passport.initialize());
require("./config/passport")(passport);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/', (req, res) => res.send('hello world!'))
app.use('/api/users', usersRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/nutrients', nutrientsRoutes);
app.use('/api/finelliData', finelliDataRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log('Nutrition full stack API listening port', port, '. NODE_ENV=', process.env.NODE_ENV));

