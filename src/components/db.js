import mysql from 'mysql';

export function fetchUsers() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'firaz-api.site',
      user: 'root',
      password: '',
      database: 'db_fyp'
    });

    connection.connect();

    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(results)
        resolve(results);
      }
      connection.end();
    });
  });
}