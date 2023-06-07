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

exports.getStores = async (req, res) => {
  try {
    const query = `
        SELECT * FROM RetailStore`;
    db.transaction((trx) => {
      trx.raw(query)
        .then((data) => {
          trx.commit();
          res.status(200).json(data.rows);
          return;
        })
        .catch((err) => {
          console.log(err);
          trx.rollback();
          res.status(500).json(err);
          return;
        });
    });
  } catch (err) {
    console.log(err);
  }
}