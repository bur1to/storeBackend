const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const {
  userRouter,
  goodsRouter,
  loginRouter
} = require('./routers/index');

mongoose.set('strictQuery', true);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://127.0.0.1:27017/storeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database successfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);
app.use('/goods', goodsRouter);
app.use('/login', loginRouter);

app.listen(3001, () => {
  console.log('Server is running...');
});
