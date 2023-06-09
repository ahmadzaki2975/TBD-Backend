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

exports.getPublishers = (req, res) => {
  const query = `
    SELECT * FROM Publisher`;

  try {
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

exports.getPublisherById = (req, res) => {
  const { publishername } = req.params;

  const query = `
  SELECT publisher.*, book.bookname
  FROM Publisher
  INNER JOIN Book ON Publisher.PublisherName = Book.PublisherName
  WHERE Publisher.PublisherName = '${publishername}'; `;

  db.transaction((trx) => {
    trx
      .raw(query)
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};

exports.deletePublisherById = (req, res) => {
  const { publishername } = req.params;

  const query = `
		DELETE FROM Publisher WHERE publishername = '${publishername}'`;

  db.transaction((trx) => {
    trx
      .raw(query)
      .then((data) => {
        trx.commit();
        res.status(200).json(data.rows);
        return;
      })
      .catch((err) => {
        console.log(err);
        trx.rollback();
        res.status(500).json(err);
      });
  });
};
