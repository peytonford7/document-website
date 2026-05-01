import dotenv from 'dotenv';
import https from 'https';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: './.env' });

const app = express();

const sslOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
};

app.use(express.static('../client'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/', router);

const mongoURI = process.env.MONGODB_URI;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB.', error);
    }
};
connectToMongo();

const port = process.env.PORT || 3000;

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

