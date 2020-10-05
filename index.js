const express = require('express');
require('dotenv/config')

const mongoose = require('mongoose');

const PostRouter = require('./routes/Posts');

// const BodyParser =  require('body-parser');

const Cors = require('cors');

const app = express();

app.use(Cors())

// app.use(BodyParser.json());
app.use(express.json());

app.use('/api/user', PostRouter);


app.get('/', (req, res) => {
    res.send('<h1>Hello Deepz!!</h1>')
})

mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started running on Port : ${PORT}`)
})