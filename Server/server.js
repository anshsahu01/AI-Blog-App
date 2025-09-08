import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './Configs/Db.js';
import adminRouter from './routes/admin.routes.js';
import blogRouter from './routes/blog.routes.js';
import userRouter from './routes/user.routes.js';
import http from 'http';
import {Server} from 'socket.io'
import initialiseSocket from './Configs/socketio.js';
import { limiter } from './Configs/ratelimiter.js';

const app = express();
//Middlewares

const server = http.createServer(app);

//socket io connection

const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET","POST"]
    }
})

initialiseSocket(io);

// express limiter

app.use(limiter);

//Database Connection
await connectDB();

app.use(cors())
app.use(express.json())


//ROUTES
app.get('/',(req,res)=> res.send("API is working"));
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);



const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log('server is running on the port '+PORT);
})






export default app;