"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
function fintrackMysql(query) {
    return new Promise((resolve, reject) => {
        const con = mysql2_1.default.createConnection({
            host: "mysql-week-9-mfaisalkemal-revou-mfaisalkemal.aivencloud.com",
            user: "avnadmin",
            password: "AVNS_BIoZxY9G8kMWD72d52Q",
            database: "defaultdb",
            port: 24491
        });
        con.connect((err) => {
            if (err) {
                reject({ error: err.message, statusCode: 400 }); // Use err.message to get the error message
            }
            else {
                console.log("Connected to Database");
                con.query(query, (err, result, fields) => {
                    con.end(); // Close the connection after querying
                    if (err) {
                        reject({ error: err.message, statusCode: 404 });
                    }
                    else {
                        resolve({ result, statusCode: 200, resultId: result.insertId, affectedRows: result.affectedRows });
                    }
                });
            }
        });
        con.on('error', (err) => {
            reject({ error: err, statusCode: 503 }); // Use err.message to get the error message
        });
    });
}
exports.default = fintrackMysql;
