"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = exports.User = void 0;
class User {
    constructor(id, name, adress) {
        this.id = id;
        this.name = name;
        this.adress = adress;
    }
}
exports.User = User;
class Transactions {
    constructor(id, user_id, type, amount) {
        this.id = id;
        this.user_id = user_id;
        this.type = type;
        this.amount = amount;
    }
}
exports.Transactions = Transactions;
