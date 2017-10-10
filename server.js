require('./config/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')
const http = require('http');

const { generateMessage } = require('./modules/messages')
const { isRealString } = require('./modules/validation')
const { Users } = require('./modules/users')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var webpackConfig = require('./webpack.config.dev.js')

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGODB}`, { useMongoClient: true });


var app = express();
var users = new Users();

const server = http.createServer(app);

const io = require('socket.io')(server);



var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))

io.on('connection', (socket) => {
  console.log('New User connected');
  console.log(users);


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required');
    }

    socket.join(params.room);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback();
  })

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback('This is from server');
  })

  socket.on('disconnect', () => {
    console.log('User disconnect');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

app.get('/ddd', (req, res) => {
  res.send('123')
})

app.use(fallback('index.html', { root: __dirname }))

server.listen(process.env.PORT, () => {
  console.log('start up port ' + process.env.PORT);
})
