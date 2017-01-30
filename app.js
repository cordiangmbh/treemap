const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const http = require('http');


const app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function normalizePort(val) {
    const portValidation = parseInt(val, 10);
    if (isNaN(portValidation)) return val;
    if (portValidation >= 0) return portValidation;
    return false;
}

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
  case 'EACCES':
    console.log(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.log(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  server.address();
}

const server = http.createServer(app);

function onListening() {
  server.address();
}

server.listen(port, () => {
  console.log('Server is up on', port);
});

server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
