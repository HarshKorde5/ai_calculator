import express from 'express';

import cors from 'cors';


const app = express();


app.use( cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.static("public"))   //store files,data,imgs on the server side in the specified folder

//root endpoint to check if server is running
app.get( '/', (req, res) => {
    res.json( {
        status : 200,
        message: 'Server is running',
    })
});

//routes import

import calculateRoute from './routes/calculate.routes.js';

//routes declaration
app.use('/calculate', calculateRoute);

export { app }