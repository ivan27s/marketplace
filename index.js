const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/keys');

const app =express();
app.use(express.json({extended:true}));

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/profile', require('./routes/profile'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));
  app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
    )
  })
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(keys.mongoURI, {useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true});
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`)
    });
  }catch (e) {
    console.log(e)
  }

}
start();
