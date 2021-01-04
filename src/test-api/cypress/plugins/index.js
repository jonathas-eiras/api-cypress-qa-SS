/// <reference types="cypress" />

const BookRepository = require("./BookRepository");
const repository = new BookRepository();

module.exports = (on, config) => {
    on('task', {
      "books": {
        "deleteAll": () => repository.deleteAll(),
        "insert": (object) => repository.insertNew(object),
        "ids": () => repository.recoverIds()
      }
    });    
}