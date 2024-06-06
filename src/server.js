// module imports
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');

// file imports
const connectDB = require('./config/db');
const SocketManager = require('./utils/socket-manager');
const apiRouter = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const port = process.env.PORT || 5001;

// connect mongodb
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// socket.io init
const httpServer = http.createServer(app);
new SocketManager().initializeSocket(httpServer, app);

// mount routes
app.use('/api/v1', apiRouter);
app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

console.log(process.env.NODE_ENV.toUpperCase());
