const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

const routerApi = require('./routes');

const port = process.env.PORT || 4000;

// Configura cors para permitir solicitudes desde http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
}));

app.use(cookieParser());

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

routerApi(app);

app.listen(port, () => {
  console.log("Port ==> ", port);
});
