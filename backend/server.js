const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


// Connect config
dotenv.config({ path: "backend/config/config.env" });
const PORT = process.env.PORT;

//connect db
// connectDB()


app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
});
