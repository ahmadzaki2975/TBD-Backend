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

exports.getStaffs = async (req, res) => {
  try {
    const query = `SELECT * FROM staff`;
    db.transaction((trx) => {
      trx.raw(query).then((data) => {
        trx.commit();
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        trx.rollback();
        res.status(400).json(err);
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
}