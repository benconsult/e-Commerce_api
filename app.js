require('dotenv').config();
//avoid try-catch manually
require('express-async-errors')

const express = require('express');
const app = express();
//other middlewares
const morgan = require('morgan')

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'));
app.use(express.json())


app.get('/', (req,res)=>{
    res.send('e-commerce api')
})

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




