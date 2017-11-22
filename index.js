"use strict";



//_______________Задание 1________________


const file = require('./modules/file-promise');

file
    .read('./data/data.txt')
    .then(data => data.toUpperCase())
    .then(data => file.write('./data/upper-data.txt', data))
    .then(filename => console.log(`Создан файл ${filename}`))
    .catch(err => console.error(err));



//_______________Задание 2________________

const readAll = require('./modules/read-all');

function show(file) {
    console.log('-'.repeat(10));
    console.log(`Содержимое файлы ${file.name}:`);
    console.log(file.content);
    console.log('-'.repeat(10));
}

readAll('./logs/')
    .then(files => files.forEach(show))
    .catch(err => console.error(err));



//_______________Задание 3________________

const pathInfo = require('./modules/path-info');

function showInfo(err, info) {
    if (err) {
        console.log('Возникла ошибка при получении информации');
        return;
    }

    switch (info.type) {
        case 'file':
            console.log(`${info.path} — является файлом, содержимое:`);
            console.log(info.content);
            console.log('-'.repeat(10));
            break;
        case 'directory':
            console.log(`${info.path} — является папкой, список файлов и папок в ней:`);
            info.childs.forEach(name => console.log(`  ${name}`));
            console.log('-'.repeat(10));
            break;
        default:
            console.log('Данный тип узла не поддерживается');
            break;
    }
}

pathInfo('./modules', showInfo);
pathInfo('./package.json', showInfo);