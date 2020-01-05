const express = require('express');
const mealsRoutes = require('./routes/meals');
const plansRoutes = require('./routes/plans');
const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req, res) => res.send('hello world!'))

app.use('/api/plans', plansRoutes);
app.use('/api/meals', mealsRoutes);
app.listen(port, () => console.log('Example app listening port', port));
