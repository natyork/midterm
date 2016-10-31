"use strict";

module.exports = {
  makeTimestamp: () => {
    let date = new Date().toJSON()
    date = date.replace(/[A-Z]+/g, " ");
    date = date.replace(/\.[0-9]{3}/g, " ");
    return date;
  }
}
