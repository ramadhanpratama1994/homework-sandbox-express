const express = require("express");
const app = express();
const port = 3000;

// import model
const {
    sequelize
} = require("./models");

//import controller & validation users
const usersController = require("./controller/users");
const {
    runUsersValidator,
    validatorUsers
} = require("./controller/users/validation")

//import controller & validation books
const booksController = require("./controller/books");
const {
    runBooksValidator,
    validatorBooks,
    validatorTypeBooks
} = require("./controller/books/validation")

//import controller transactions
const transactionsController = require("./controller/transactions");

sequelize.sync();
app.use(express.json());

// routes users
app.get("/users", usersController.get);
app.post("/users", validatorUsers, runUsersValidator, usersController.create);
app.put("/users", validatorUsers, runUsersValidator, usersController.update);
app.delete("/users", usersController.delete);

// routes books
app.get("/books", booksController.get);
app.post("/books", validatorBooks, validatorTypeBooks, runBooksValidator, booksController.create);
app.put("/books", validatorBooks, validatorTypeBooks, runBooksValidator, booksController.update);
app.delete("/books", booksController.delete);

// routes transactions
app.post("/transactions", transactionsController.bulkCreate);
app.get("/transactions", transactionsController.get);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});