//Express is used to create web servers
const express = require("express");

//Multer is used to handle file uploads
const multer = require("multer");

//Used for working with paths and ensuring  that they are build correctly accross OSes
const path = require("path");

//Handles cross origin requests
const cors = require("cors");

//This is creating an app instance
const app = express();

//This is the port the server will listen to
const PORT = 3000;

//This line will enable the backend to receive request from the frontend
app.use(cors()); //this allows requests from any origin

//Setting up folder for uploads

//this is the home route
app.get("/",(req, res) => {
  res.send("<p><i>FULL STACK IMAGE UPLOADER WITH NODE</i></p>");
});

const storage = multer.diskStorage({
  //Settiing up the destination of the file
  destination: (req, file, cb) => {
    //The folder must exist for it to work
    cb(null, "uploads"); //cb means call back the function to be executed once the request is completed
  },

  //Setting up the filename
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //path.extname(file.originalname) this keeps the original file extensiton and the first argument null means no errors
  },
});

//This is a middleware tells the routes use this configuration when doing file uploads
const upload = multer({ storage });

//creating a upload route
app.post("/upload", upload.single("image"), (req, res) => {
  //Definition of a POST route
  //And the upload single means that it expects one file which must be an image also in the form data the name of the file should be also image
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "uploade succesifully!",
    filename: req.file.filename,
  });
  //So the .file and .file.filename turns out multer parses the incoming request and attaches the uploaded file info to req.file
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `);
});
