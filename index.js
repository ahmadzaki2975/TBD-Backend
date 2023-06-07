const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// ? Middleware
app.use(morgan("dev"));

// allow cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("API TBD v1.0.0 - Ahmad Zaki Akmal");
});

// ? Routes
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);
const authorRoutes = require("./routes/author");
app.use("/authors", authorRoutes);
const publisherRoutes = require("./routes/publisher");
app.use("/publishers", publisherRoutes);
const genreRoutes = require("./routes/genres");
app.use("/genres", genreRoutes);
const customerRoutes = require("./routes/customer");
app.use("/customers", customerRoutes);
const storeRouter = require("./routes/stores");
app.use("/stores", storeRouter);
const staffRouter = require("./routes/staffs");
app.use("/staffs", staffRouter);
const purchaseRouter = require("./routes/purchases");
app.use("/purchases", purchaseRouter);

const sqlRoutes = require("./routes/sql");
app.use("/sql", sqlRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
