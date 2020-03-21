// Update {companyId}
// Endpoint: /companies/{companyId}

let mysql = require('mysql');
let config = require('./config.json');

let pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

exports.handler = (event, context, callback) => {
  console.log(event);
  context.callbackWaitsForEmptyEventLoop = false;
  let body = JSON.parse(event.body);

  pool.getConnection(function (error, connection) {
    let sqlquery = 'UPDATE Companies SET ';
    if (body.name) {
      sqlquery += 'name="' + body.name + '",'
    }
    if (body.address) {
      sqlquery += 'address="' + body.address + '",'
    }
    if (body.empId) {
      sqlquery += 'empId="' + body.empId + '",'
    }
    sqlquery = sqlquery.slice(0, -1);
    sqlquery += ' WHERE companyId=' + event['pathParameters']['companyId'] + ';';
    connection.query(sqlquery, function (error, results, fields) {
      connection.release();
      let response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {},
        "body": JSON.stringify(results)
      }
      if (error) {
        callback(error);
      } else {
        callback(null, response);
      }
    });
  });
};
