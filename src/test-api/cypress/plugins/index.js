/// <reference types="cypress" />

const BookRepository = require("./bookRepository");
const repository = new BookRepository();

module.exports = (on, config) => {
    on('task', {
      "book": {
        "deleteAll": () => repository.deleteAll(),
        "insert": (object) => repository.insertNew(object),
        "ids": () => repository.recoverIds()
      }
    });    
}