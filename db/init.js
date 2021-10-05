const mongoose = require('mongoose');
const usersData = require('./users.json');
const roomsData = require('./rooms.json');
const messagesData = require('./messages.json');
const fs = require('fs');
const dotenv = require('dotenv');

const config = dotenv.parse(fs.readFileSync(__dirname + '/../.development.env'));

const Users = mongoose.model('users', {
  rooms: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'rooms',
    },
  ],
  notRecived: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'messages',
    },
  ],
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'messages',
    },
  ],
  isOnline: Boolean,
  password: String,
  email: String,
  lastName: String,
  firstName: String,
  exitDate: Number,
  photo: String,
});

const Rooms = mongoose.model('rooms', {
  photo: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    require: false,
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'messages',
    },
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
  ],
});

const Messages = mongoose.model('messages', {
  text: String,
  created: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  room: {
    type: mongoose.Types.ObjectId,
    ref: 'rooms',
  },
  notRecived: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
  ],
  file: {
    name: String,
    size: Number,
    require: false,
  },
});

(async () => {
  await mongoose.connect(config.MONGO_URL);

  await Users.deleteMany({});
  await Rooms.deleteMany({});
  await Messages.deleteMany({});

  await Users.insertMany(usersData);
  await Rooms.insertMany(roomsData);
  await Messages.insertMany(messagesData);

  await mongoose.connection.close();
})();
