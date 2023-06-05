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

exports.getAuthors = (req, res) => {
    try {
        const query = `
        SELECT * FROM Author`;
        db.raw(query)
        .then((data) => {
            console.log(data.rows);
            res.status(200).json(data.rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getAuthorById = (req, res) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT * FROM Author WHERE AuthorID = ${id}`;
        db.raw(query)
        .then((data) => {
            console.log(data.rows);
            res.status(200).json(data.rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    } catch (err) {
        console.log(err);
    }
}