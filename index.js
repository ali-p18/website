
import express from "express";
 import colors from "colors";
 import dotenv from "dotenv";
 import morgan from "morgan";
 import connectDB from"./config/db.js";
 import cors from "cors";
 import productRoute from "./routes/productRoutes.js";
 import userRoute from "./routes/UserRoutes.js";
 import { errorListening } from "./middlewares/error.js";

 const app = express(); 
 
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


dotenv.config()

connectDB();
//for code uncaughtException
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`.red);
    console.log(`Shutting down the server to uncaughtException!`);
    process.exit(1);
})
//routing
app.use("/api/v1/",productRoute);
app.use("/api/v1",userRoute);

app.use("/gallery",express.static("public/gallery"))
 


//handling custom error
app.use(errorListening);


const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`server is running at port:http://localhost:${PORT}`.cyan.underline.bold
    );
});

//for handling the promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`.red);
    console.log(`shutting down the server to handle promise rejection!`);
    server.close(()=>{
        process.exit(1);
    });
});



