import cors from "cors";
import express from "express";
import lodash from "lodash";
import bodyParser from "body-parser";
import {v4 as uuidv4, validate} from 'uuid';

import {closeMysql, initMysql} from "./config/mysql.js";
import {missingInformationError} from "./constants/errorCodes.js";
import {ALL} from "./constants/general.js";

const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors({origin: 'http://localhost:3000'}));

app.get('/listTodos', async (req, res) => {
  const connection = initMysql();
  const { filter } = req.query;
  const { status } = lodash.pick(filter, ['status']);

  try {
    const query = status === ALL ? 'SELECT * FROM todos' : `SELECT * FROM todos WHERE status = '${status}'`;

    connection.query(query, function (error, results, fields) {
      if (error) throw error;

      res.send(results);
    });
  } catch (e) {
    console.log(e);
  } finally {
    closeMysql(connection);
  }
})

app.post('/createTodo', async (req, res) => {
  const connection = initMysql();
  const { name, status } = lodash.pick(req.body, ['name', 'status']);
  const id = uuidv4();

  if (!name || !status) {
    return res.send(missingInformationError);
  }

  try {
    const query = `INSERT INTO todos (id, name, status) VALUES ('${id.toString()}', '${name}', '${status}')`;

    connection.query(query, function (error) {
      if (error) throw error;

      res.send({ name, status, id });
    });
  } catch (e) {
    console.log(e);
  } finally {
    closeMysql(connection);
  }
})

app.put('/markTodoCompleted/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const connection = initMysql();

  if (!todoId || !validate(todoId)) {
    return res.send(missingInformationError);
  }

  try {
    const query = `UPDATE todos SET status = 'completed' WHERE id = '${todoId}'`;

    connection.query(query, function (error) {
      if (error) throw error;

      res.send({});
    });
  } catch (e) {
    console.log(e);
  } finally {
    closeMysql(connection);
  }
})

app.put('/markTodoUncompleted/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const connection = initMysql();

  if (!todoId || !validate(todoId)) {
    return res.send(missingInformationError);
  }

  try {
    const query = `UPDATE todos SET status = 'uncompleted' WHERE id = '${todoId}'`;

    connection.query(query, function (error) {
      if (error) throw error;

      res.send({});
    });
  } catch (e) {
    console.log(e);
  } finally {
    closeMysql(connection);
  }
})

app.delete('/deleteTodo/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const connection = initMysql();

  if (!todoId || !validate(todoId)) {
    return res.send(missingInformationError);
  }

  try {
    const query = `DELETE FROM todos WHERE id = '${todoId}'`;

    connection.query(query, function (error) {
      if (error) throw error;

      res.send({});
    });
  } catch (e) {
    console.log(e);
  } finally {
    closeMysql(connection);
  }
})

/*
export const DELETE_TODO = 'deleteTodo';
 */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
