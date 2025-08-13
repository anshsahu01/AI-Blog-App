import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './Configs/Db.js';
import adminRouter from './routes/admin.routes.js';
import blogRouter from './routes/blog.routes.js';

const app = express();
//Middlewares

//Database Connection
await connectDB();

app.use(cors())
app.use(express.json())


//ROUTES
app.get('/',(req,res)=> res.send("API is working"));
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('server is running on the port '+PORT);
})






export default app;