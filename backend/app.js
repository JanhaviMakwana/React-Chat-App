const express = require('express');
const cors = require('cors');
const PORT = require('./app/config/app.config').appPort;
const authRoutes = require('./app/routes/auth');
const chatRoutes = require('./app/routes/chat');
const db = require('./app/models');

const app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin', 'Authorization'],
    'credentials': true,
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(authRoutes);
app.use(chatRoutes);
app.use(express.static(__dirname + '/uploads'));

const server = require('http').createServer(app);

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        server.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })
