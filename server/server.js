require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/connectToDb');
const notesRouter = require('./routes/notes.router');
const authRouter = require('./routes/auth.router');

const cors = require('cors');
const app = express();

connectToDb();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);

app.use('/notes', notesRouter);
app.use('/', authRouter);

app.listen(process.env.PORT || 5000);