"use strict";

const fs = require('fs');

module.exports = (path, callback) => {

    let info = { path };

    fileStat (info, callback);
};


let fileStat = (info, callback) => {
    fs.stat(info.path, (error, stats) => {
        if(error) {

            info.error = error;
            callback(info.error, info);
            return;
        }

        if(stats.isFile()) {

            info.type = 'file';
            checkType(info, callback);
            return;
        }

        if(stats.isDirectory()) {

            info.type = 'directory';
            checkType(info, callback);
            return;
        }

        callback(info.error, info);
    })
};

let checkType = (info, callback) => {

    if(info.error) {
        callback(info);
    }

    switch (info.type) {
        case 'file':
            readFile(info, callback);
            break;
        case 'directory':
            readDirectory(info, callback);
            break;
        default:
            callback(info.error, info);
            break;
    }
};

let readFile = (info, callback) => {

    const config =  { encoding : 'utf8' };

    fs.readFile(info.path, config, (error, content) => {
        if(error) {
            info.error = error;
            callback(info.error, info);
        } else {
            info.content  = content;
            callback(info.error, info);
        }
    });
};

let readDirectory = (info, callback) => {

    fs.readdir(info.path, (error, childs) => {

        if(error) {
            info.error = error;
            callback(info.error, info);
        } else {
            info.childs = childs;
            callback(info.error, info);
        }
    })
};