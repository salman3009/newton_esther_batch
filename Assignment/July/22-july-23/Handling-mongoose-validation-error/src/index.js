const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//connect to DB
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const url = 'mongodb://0.0.0.0:27017/users';
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB');
  }
);

app.listen(3000, () => console.log('Server running......'));
