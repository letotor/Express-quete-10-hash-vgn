const { setupRoutes } = require('./routes');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

setupRoutes(app);

app.listen(port, (err) => {
  try {
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(`Error listening on port ${port}`);
  }
 
});
