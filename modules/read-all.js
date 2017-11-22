"use strict";

const read = require('./file-promise').read;
const fs = require('fs');

module.exports = (path) => {
   return new Promise((done, fail) => {

        fs.readdir(path, (error, files) => {

            if(error) {
                fail(error);
            } else {
                done(files);
            }
        })
   }).then(files => Promise.all(
       files.map((name) => {
           return read(path + name)
               .then((content) => {
                   return {name, content}
               })
               .catch(() => {
                   console.log(`Файл ${name} не найден`);
               })
       })
   )).then(items => {
       return items.map((item) => {
           return {
               name:item.name,
               content:item.content
           };
       })});
};


