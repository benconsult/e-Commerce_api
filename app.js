require('dotenv').config();
//avoid try-catch manually
require('express-async-errors')

const express = require('express');
const app = express();
//other middlewares
const morgan = require('morgan')
const cookieParser = require('cookie-parser')


const connectDB = require('./db/connect');

const authRouter = require('./routes/authRoutes')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'));
app.use(express.json())
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send('e-commerce api')
})
//To get cookies from postman
app.get('/api/v1', (req,res)=>{
    console.log(req.cookies);
    res.send('e-commerce api')
})
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);//should be last

const port = process.env.PORT || 3000;
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }

}

start();




