const express = require('express');
const app = express();
const songsController = require('./routes/songs');

app.use(express.json());
app.use('/songs', songsController);

app.get('/', (req, res) => {
  res.send('Welcome to Tuner');
});

app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
