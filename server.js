const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, 'build');

app.set('port', process.env.PORT || 3000);
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
