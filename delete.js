require("dotenv").config();
const Job = require("./models/Job");
const connectDB = require("./db/connect");
const deleteJobs = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany({ createdBy: "64e36706de89bb2846cbbad5" });
    console.log("successfully deleteMany");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

deleteJobs();
