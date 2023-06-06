const knex = require("knex");
const dotenv = require("dotenv");
dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

exports.getAuthors = async (req, res) => {
  try {
    const query = `
        SELECT * FROM Author`;
    db.raw(query)
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
        SELECT * FROM Author WHERE AuthorID = ${id}`;
    db.raw(query)
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getWrittenBooks = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM Book WHERE 
        BookID IN (SELECT BookID FROM BookAuthorMapping WHERE AuthorID = ${id});`;
    db.raw(query)
      .then((data) => {
        res.status(200).json(data.rows);
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        return;
      });
  } catch (err) {
    console.log(err);
  }
};

exports.postNewAuthor = async (req, res) => {
  const { authorname, yearborn } = req.body;
  let { yeardied } = req.body;
  console.log(authorname, yeardied, yearborn);
  if (!authorname || !yearborn) {
    res.status(400).json("Invalid request");
    return;
  }
  if (yeardied == 0) {
    yeardied = "NULL";
  }
  db.transaction((trx) => {
    const query = `INSERT INTO Author (AuthorName, YearDied, YearBorn)
    VALUES ('${authorname}', ${yeardied}, ${yearborn});`;
    trx
      .raw(query)
      .then((data) => {
        res.status(200).json("Author added");
        return;
      })
      .then(trx.commit)
      .catch((err) => {
        console.log(err);
        trx.rollback();
        res.status(500).json(err);
        return;
      });
  });
};
