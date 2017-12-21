
let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/netology_test';


mongoClient.connect(url, (error, db) => {

    if(error) {
        console.log('Невозможно подключиться к серверу Mongo', error);
    } else {
        console.log('Соединение установлено');

        let collection = db.collection("users");

        let users = [
            {name: 'Lena', gender: 'f'},
            {name: 'Nastya', gender: 'f'},
            {name: 'Sergey', gender: 'm'},
            {name: 'Igor', gender: 'm'},
            {name: 'Igor', gender: 'm'},
            {name: 'Igor', gender: 'm'},
            {name: 'Dmitry', gender: 'm'}
        ];

        insertCollections(collection, users)
            .then(() =>  updateCollections(collection))
            .then(() => deleteCollections(collection))
            .then(() => collection.removeMany({}))
    }
});

let insertCollections = (collection, users) => {

    return new Promise(function(resolve, reject) {

        collection.insertMany(users, (error, result) => {

            if(error) {
                console.log(error);
            } else {
                showCollections(collection);
                resolve();
            }
        });
    });
};

let updateCollections = (collection) => {

    return  new Promise(function(resolve, reject) {

        collection.updateMany({name:"Igor"}, {$set:{name:"Semen"}}, (error, result) => {

            if(error) {
                console.log(error);
            } else {
                showCollections(collection);
                resolve();
            }
        });
    });
};

let deleteCollections = (collection) => {

    return new Promise(function(resolve, reject) {

        collection.remove({name:"Semen"}, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                showCollections(collection);
                resolve();
            }
        });
    });
};

let showCollections = (collection) => {
    collection.find().toArray((error, result) => {

        if(error) {
            console.log(error);
        } else {
            console.log('Результат', result);
        }
    });
};
