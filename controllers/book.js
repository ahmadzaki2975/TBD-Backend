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

exports.getBooks = (req, res) => {
  try {
    const query = `
    SELECT book.*, author.authorname 
    FROM Book 
    INNER JOIN BookAuthorMapping ON Book.BookID = BookAuthorMapping.BookID 
    INNER JOIN Author ON BookAuthorMapping.AuthorID = Author.AuthorID`;
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

exports.getBookById = (req, res) => {
  const { id } = req.params;
  try {
    // select the book, join with the author and genre
    const query = `
    SELECT book.*, author.authorname, genre.genrename
    FROM Book 
    INNER JOIN BookAuthorMapping ON Book.BookID = BookAuthorMapping.BookID 
    INNER JOIN Author ON BookAuthorMapping.AuthorID = Author.AuthorID
    INNER JOIN BookGenreMapping ON Book.BookID = BookGenreMapping.BookID
    INNER JOIN Genre ON BookGenreMapping.GenreID = Genre.GenreID
    WHERE Book.BookID = ${id}
    ;`;
    db.raw(query)
      .then((data) => {
        const genres = [];
        data.rows.forEach((row) => {
          genres.push(row.genrename);
        });
        res.status(200).json({
          bookname: data.rows[0].bookname,
          pages: data.rows[0].pages,
          price: data.rows[0].price,
          publicationyear: data.rows[0].publicationyear,
          publishername: data.rows[0].publishername,
          authorname: data.rows[0].authorname,
          genres,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.updateBookById = (req, res) => {
  const { id } = req.params;
  const { bookname, pages, price, publicationyear, publishername } = req.body;
  try {
    const query = `
    UPDATE Book
    SET bookname = '${bookname}', pages = ${pages}, price = ${price}, publicationyear = ${publicationyear}, publishername = '${publishername}'
    WHERE BookID = ${id}
    ;`;
    db.raw(query)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBookById = (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    DELETE FROM Book
    WHERE BookID = ${id}
    ;`;
    db.raw(query)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.addNewBook = (req, res) => {
  const {
    bookname,
    pages,
    price,
    publicationyear,
    publishername,
    authorid,
    genres,
  } = req.body;
  if (
    !bookname ||
    !pages ||
    !price ||
    !publicationyear ||
    !publishername ||
    !authorid ||
    !genres
  ) {
    return res.status(400).json("incorrect form submission");
  }
  try {
    const insertQuery = `
    INSERT INTO Book (bookname, pages, price, publicationyear, publishername)
    VALUES ('${bookname}', ${pages}, ${price}, ${publicationyear}, '${publishername}');`;
    const authorMapQuery = `
    INSERT INTO BookAuthorMapping (BookID, AuthorID)
    VALUES ((SELECT BookID FROM Book WHERE bookname = '${bookname}'), ${authorid});`;

    db.raw(insertQuery)
      .then(() => db.raw(authorMapQuery))
      .then(() => {
        const genreQueries = genres.map((genreid) => {
          return db.raw(`
                INSERT INTO BookGenreMapping (BookID, GenreID)
                VALUES ((SELECT BookID FROM Book WHERE bookname = '${bookname}'), ${genreid});
            `);
        });

        // Execute genreQueries in parallel using Promise.all
        return Promise.all(genreQueries);
      })
      .then(() => {
        res.status(200).json({ message: "Inserts executed successfully" });
      })
      .catch((error) => {
        console.error("Error executing inserts:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    console.log(err);
  }
};
