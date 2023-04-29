const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 5000;

// This line is use for fetching data from body
app.use(express.json());

// AVAILABLE ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo();