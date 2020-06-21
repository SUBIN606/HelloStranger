const express = require('express');
const app = express();
const cors = require('cors');

const users = require('./routes/users');
const chat = require('./routes/chat');

app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use('/users', users);
app.use('/chat', chat);

app.listen(3002);