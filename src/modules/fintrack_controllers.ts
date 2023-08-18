import { RequestHandler } from 'express';

import { User } from './fintrack_models';
import { Transactions } from './fintrack_models';

import fintrackMysql from "./fintrack_mysql";

//var counter: number = 0;

/*
export const createFintrack: RequestHandler = (req, res, next) => {
  ++counter;

  const type = (req.body as { type: string }).type;
  const name = (req.body as { name: string }).name;
  const detail = (req.body as { detail: string }).detail;
  const amount = (req.body as { amount: string }).amount;



  const newFintrack = new Fintrack(counter.toString(), type, name, detail, amount);

  FINTRACKS.push(newFintrack);

  res.status(201).json({ message: 'Created the Financial Tracking.', createdFintrack: newFintrack });
};
*/

export const fintrackGetbyid: RequestHandler = (req, res, next) => {
  (async () => {
    try {
      const query = `
        SELECT u.id, u.name, u.address,
          (
            SELECT
              SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END) AS net_amount
            FROM \`Transactions\` t
            WHERE t.user_id = u.id
          ) AS balance,
          (
            SELECT SUM(t.amount)
            FROM \`Transactions\` t
            WHERE t.user_id = u.id AND t.\`type\` = 'expense'
          ) AS expense
            FROM \`User\` u
            WHERE u.id = ${req.params.id};
      `;
        const response = await fintrackMysql(query);
        res.status(response.statusCode).send(response.result);
    } catch (error) {
        res.send(error);
    }
  })();
};

export const fintrackPost: RequestHandler = (req, res, next) => {
  if (req.body.type == null || req.body.amount == null || req.body.user_id == null) {
    res.status(406).send("One of the field cannot empty");
  } else {
    const { type, amount, user_id } = req.body;
    (async () => {
      try {
          const query = `
            INSERT INTO \`Transactions\`
            (user_id, \`type\`, amount)
            VALUES(${user_id}, '${type}', ${amount});
          `;
          const response = await fintrackMysql(query);
          res.status(response.statusCode).send(`id: ${response.resultId}`);
      } catch (error) {
          res.send(error);
      }
    })();
  }
};

export const fintrackPutbyid: RequestHandler = (req, res, next) => {
  if (req.body.type == null || req.body.amount == null || req.body.user_id == null) {
    res.status(406).send("One of the field cannot empty");
  } else {
    const { type, amount, user_id } = req.body;
    (async () => {
      try {
        const query = `
          UPDATE \`Transactions\`
          SET user_id=${user_id}, \`type\`='${type}', amount=${amount}
          WHERE id=${req.params.id};
        `;
        const response = await fintrackMysql(query);
        if(response.affectedRows !== 0){
          res.status(response.statusCode).send(`id: ${req.params.id}`);
        }else{
          res.status(404).send("Transaction not found");
        }
      } catch (error) {
          res.send(error);
      }
    })();
  }
};

export const fintrackDeletebyid: RequestHandler = (req, res, next) => {
  (async () => {
    try {
      const query = `
        DELETE FROM \`Transactions\`
        WHERE id=${req.params.id};
      `;
      const response = await fintrackMysql(query);
      if(response.affectedRows !== 0){
        res.status(response.statusCode).send(`id: ${req.params.id}`);
      }else{
        res.status(404).send("Transaction not found");
      }
    } catch (error) {
      res.send(error);
    }
  })();
};