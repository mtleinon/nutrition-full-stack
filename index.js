const express = require('express');
const usersRoutes = require('./routes/users');
const mealsRoutes = require('./routes/meals');
const plansRoutes = require('./routes/plans');
const nutrientsRoutes = require('./routes/nutrients');
const finelliDataRoutes = require('./routes/finelliData');
const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req, res) => res.send('hello world!'))

app.use('/api/users', usersRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/nutrients', nutrientsRoutes);
app.use('/api/finelliData', finelliDataRoutes);
app.listen(port, () => console.log('Example app listening port', port));
