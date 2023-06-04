const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
// allow cross-origin requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("API TBD v0.0.1 - Ahmad Zaki Akmal");
});

// ? Routes
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
