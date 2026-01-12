const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/route');
const list = require('./routes/list');
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', list);

const con = require('./connection/connection');
con();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
