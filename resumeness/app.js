// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route.js");
const authMiddleware = require("./middlewares/auth.middleware.js");
const jwt = require("jsonwebtoken");
const {
    User,
    signUpSchema,
    logInSchema,
    CoverLetter,
    Resume,
} = require("./models/User.js");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database is connected"))
    .catch((err) => {
        if (err) return console.error(err);
    });

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.post("/addcv", async (req, res) => {
    // Handle file upload logic here
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token and get the user's id
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        // Get the user from the database
        const user = await User.findById(id);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const cv1 = new Resume(req.body);
        console.log(cv1);
        // Update the user's CV field with the file information
        user.resumes.push(cv1);
        // Save the updated user object
        console.log(req.body.name);
        await user.save();
        console.log("Document saved successfully:");

        // Return a success response
        return res.status(200).json({ message: "CV uploaded successfully" });
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
    }
});

app.post("/addcl", async (req, res) => {
  // Handle file upload logic here
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
      // Verify the token and get the user's id
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      // Get the user from the database
      const user = await User.findById(id);
      // Check if the user exists
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      const cl1 = new CoverLetter(req.body);
      console.log(cl1);
      // Update the user's CV field with the file information
      user.coverLetters.push(cl1);
      // Save the updated user object
      console.log(req.body.name);
      await user.save();
      console.log("Document saved successfully:");

      // Return a success response
      return res.status(200).json({ message: "CV uploaded successfully" });
  } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/getcvs", async (req, res) => {
    // Handle file upload logic here
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token and get the user's id
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        // Get the user from the database
        const user = await User.findById(id);
        // Check if the user exists
        if (!user) {
          console.log(error);
            return res.status(404).json({ error: "User not found" });
        }
        // Return a success response
        return res.status(200).json(user.resumes);
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid token" });
    }
});

// app.post("/delcv", async (req, res) => {
//   // Handle file upload logic here
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(" ")[1];

//   try {
//       // Verify the token and get the user's id
//       const { id } = jwt.verify(token, process.env.JWT_SECRET);
//       // Get the user from the database
//       const user = await User.findById(id);
//       // Check if the user exists
//       if (!user) {
//         console.log(error);
//           return res.status(404).json({ error: "User not found" });
//       }
//       user.resumes.splice(req.body, 1);
//       await user.save();
//       console.log("Document saved successfully:");
//       // Return a success response
//       return res.status(200).json(user.resumes);
//   } catch (err) {
//       console.log(err);
//       res.status(401).json({ error: "Invalid token" });
//   }
// });

app.get("/getcls", async (req, res) => {
  // Handle file upload logic here
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
      // Verify the token and get the user's id
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      // Get the user from the database
      const user = await User.findById(id);
      // Check if the user exists
      if (!user) {
        console.log(error);
          return res.status(404).json({ error: "User not found" });
      }
      // Return a success response
      return res.status(200).json(user.coverLetters);
  } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid token" });
  }
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, (err) => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
    console.log(global.user);
});
