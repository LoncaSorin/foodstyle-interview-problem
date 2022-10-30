import mysql from "mysql";

export const initMysql = () => {
  const connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7530637',
    password: 'Rf1wVhS8qh',
    port: '3306',
    database: 'sql7530637'
  });

  connection.connect();

  return connection;
}

export const closeMysql = (connection) => {
  return connection.end();
}
