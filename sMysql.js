const mysql = require("mysql");

const connection =  mysql.createPool({
	host			:	process.env.MYSQL_HOSTNAME,       
	user			: 	process.env.MYSQL_USERNAME,
	password		: 	process.env.MYSQL_PASSWORD,
	database		:	process.env.MYSQL_DATABASE || process.env.MYSQL_USERNAME,
});

// NOTE! all mysql queries here is unsecure! You should wrap all the data with connection.escape(data);
// More https://www.tizag.com/mysqlTutorial/mysql-php-sql-injection.php

connection.getConnection(function(e) {
	if (e) 	{
		console.log("DATABASE IS NOT WORKING");
		throw e;
	}
	else 	{
		console.log(`DATABASE IS WORKING`);
	}
});

module.exports = connection;
