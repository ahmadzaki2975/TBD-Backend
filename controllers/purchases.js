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

exports.getPurchases = async (req, res) => {
  try {
    const query = `
    SELECT customer.customername, book.bookname, purchase.orderid, purchase.quantity, purchase.totalprice, purchase.boughtat
    FROM purchase
    INNER JOIN customer ON purchase.customerid = customer.customerid
    INNER JOIN book ON purchase.bookid = book.bookid
    ;`;
    db.transaction((trx) => {
      trx.raw(query).then((data) => {
        trx.commit();
        res.status(200).json(data.rows);
        return;
      })
      .catch((err) => {
        trx.rollback();
        res.status(400).json(err);
        return;
      });
    });
  } catch (err) {
    console.log(err)
  }
}