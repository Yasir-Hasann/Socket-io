// module imports
const { Server } = require('socket.io');

class SocketManager {
  emitEvent(to, event, data) {
    global.io.to(to.toString()).emit(event, data);
  }

  emitGroupEvent(event, data) {
    global.io.emit(event, data);
  }

  initializeSocket(server, app) {
    const io = new Server(server, { cors: { origin: '*' } });
    global.io = io;

    io.on('connection', (socket) => {
      socket.on('join', (e) => {
        socket.join(e);
        console.log(`${e} joined`);

        io.to(e).emit('on_join', `user with id ${e} joined`);
      });

      socket.on('leave', (e) => {
        socket.leave();
        console.log(`user with id ${e} left`);
      });
      socket.on('exit', socket.leave);
      socket.on('disconnect', (reason) => {
        console.log('user disconnected::', reason);
      });
    });

    io.on('error', (error) => {
      console.error('socket.io error:', error);
    });

    // attach to app instance
    app.use((req, res, next) => {
      req.io = io;
      next();
    });
  }
}

module.exports = SocketManager;
