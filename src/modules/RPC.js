const users = require('../data/users');

module.exports = class RPC  {
    constructor() {

        this.users = users;

        this.functions = {};
        this.functions['getUsers'] = this.getUsers.bind(this);
        this.functions['addUser'] = this.addUser.bind(this);
        this.functions['editUser'] = this.editUser.bind(this);
        this.functions['deleteUser'] = this.deleteUser.bind(this);
    }

    getResult(name, params) {

        if(this.functions[name]) {
            return this.functions[name](params);
        } else {
            return {error:true, message: "Некорректный метод"};
        }
    }

    getUsers () {

        return this.users
    };

    deleteUser(params) {

        if(!params.id)
            return {error:true, message: "Некорректные параметры"};

        let userExists = false;

        this.users.forEach((item, index) => {
            if(item.id === Number(params.id)) {
                this.users.splice(index, 1);
                userExists = true;
            }
        });

        if(userExists) {
            return {result:"OK"}
        } else {
            return {error:true, message: "Пользователя с данным id не существует"};
        }
    };

    addUser(params) {

        if(!params.name)
            return {error:true, message: "Некорректные параметры"};

        let maxId = 0;

        users.forEach((item) => {
            if(item.id > maxId)
                maxId = item.id
        });

        users.push({id:maxId + 1, name:params.name});

        return {result:"OK"}
    };

    editUser(params) {

        if(!params.name || !params.id)
            return {error:true, message: "Некорректные параметры"};

        let userExists = false;

        users.forEach((item) => {
            if(item.id === Number(params.id)) {
                item.name = params.name;
                userExists = true;
            }

            if(userExists) {
                return {result:"OK"}
            } else {
                return {error:true, message: "Пользователя с данным id не существует"};
            }
        });
    }
};
