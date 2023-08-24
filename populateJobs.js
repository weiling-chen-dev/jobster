require("dotenv").config();
const Job = require("./models/Job");
const jobsJSON = require("./MOCK_DATA.json");
const connectDB = require("./db/connect");
const populateJobs = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.insertMany(jobsJSON);
    console.log("successfully inserted static products data to mongoose db");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateJobs();
