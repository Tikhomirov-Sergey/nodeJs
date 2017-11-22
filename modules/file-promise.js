"use strict";

const fs = require('fs');
const config =  { encoding : 'utf8' };

exports.read = (file) => {

    return new Promise((done, fail) => {
        fs.readFile(file, config, (error, content) => {
            if(error) {
                fail(error);
            } else {
                done(content);
            }
        });
    })
};

exports.write = (file, data) => {

    return new Promise((done, fail) => {
        fs.writeFile(file, data, error => {
            if(error) {
                fail(error);
            } else {
                done(file);
            }
        })
    })
};