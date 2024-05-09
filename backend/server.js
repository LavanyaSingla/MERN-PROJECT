const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


// Connect config
dotenv.config({ path: "backend/config/config.env" });
const PORT = process.env.PORT;

//connect db
// connectDB()


const server= app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});
