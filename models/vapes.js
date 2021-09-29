'use strict'

var mysql = require('mysql'),
	myConnection = require('express-myconnection'),
	dbOptions = {
		host : 'localhost',
		port : 3306,
		user : 'root',
		password : '',
		database : 'vapes' 
	},
	Vapes = myConnection(mysql, dbOptions, 'request')

module.exports = Vapes