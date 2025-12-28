require("dotenv").config(); // loads all variable in .env file  as process.env
// console.log("URL:", process.env.UPSTASH_REDIS_REST_URL);
// console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN);
const path = require("path");
const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/notesRoutes.js"); // routing for notes
const connectDb = require("./config/db.js"); // to connect to db
const ratelimiter = require("./middleware/rateLimiter.js");

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  ); // allows request from every single url
}

app.use(express.json()); //middleware
app.use(ratelimiter); //middleware that runs for all routes

// app.use((req,res,next)=>{
//     console.log(`incoming reqiest is ${req.method}: at URL :${req.url}`);
//     next();
// })

app.use("/api/notes", noteRoutes); //mounting notesRoutes.js

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDb().then(() => {
  //connecting to db
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
});
