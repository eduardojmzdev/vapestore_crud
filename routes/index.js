'use strict'

var productos = require('../models/vapes'),
	express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	fs = require('fs'),
	path = require('path'),
	util = require('util')

const upload = multer({ dest: 'public/uploads' })



function error404(req, res, next)
{
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

function storeWithOriginalName (file) {
	var fullNewPath = path.join(file.destination, file.originalname)
	var rename = util.promisify(fs.rename)

	return rename(file.path, fullNewPath)
	// 	.then(() => {
			
	// 	return fullNewPath
    // })
}

router
	.use(productos)
	.get('/', (req, res, next) => {
		// req.getConnection((err, movies) => {
		// 	movies.query('SELECT * FROM vapes', (err, rows) => {
		// 		if(err)
		// 		{
		// 			next( new Error('No hay regitros de Películas') )
		// 		}
		// 		else
		// 		{
		// 			let locals = {
		// 				title : 'Lista de Películas',
		// 				data : rows
		// 			}

		// 			res.render('index', locals)
		// 		}
		// 	})
		// })
		let locals = {
			title : 'Freeze Smoke',
			// data : rows
		}
		res.render('index', locals)
		//next()
	})
	.get('/productos', (req, res, next) => {
		req.getConnection((err, productos) => {
			productos.query('SELECT * FROM vapes', (err, rows) => {
				if(err)
				{
					next( new Error('No hay regitros de Películas') )
				}
				else
				{
					let locals = {
						title : 'Lista de Películas',
						data : rows
					}

					res.render('productos', locals)
				}
			})
		})
		//next()
	})
	.get('/shop', (req, res, next) => {
		req.getConnection((err, productos) => {
			productos.query('SELECT * FROM vapes', (err, rows) => {
				if(err)
				{
					next( new Error('No hay Regitros de Productos') )
				}
				else
				{	
					console.log(rows)
					let locals = {
						title : 'Lista de Productos',
						data : rows
					}
					res.render('shop', locals)
				}
			})
		})
		//next()
	})
	.get('/agregar', (req, res, next) => {
		res.render('add-producto', { title : 'Agregar Película' })
	})
	.post('/inserta', upload.single('image'), (req, res, next) => {

		console.log(req)
		storeWithOriginalName(req.file)
		
		req.getConnection((err, productos) => {
			let producto = {
				vape_id : req.body.vape_id,
				title : req.body.title,
				description : req.body.description,
				rating : req.body.rating,
				price: req.body.price,
				image : path.join("upload/",req.file.originalname)
			}

			console.log(producto)

			productos.query('INSERT INTO vapes SET ?', producto, (err, rows) => {
				return (err) ? next( console.log(err) ) : res.redirect('/productos')
			})
		})
	})
	.get('/editar/:vape_id', (req, res, next) => {
		let vape_id = req.params.vape_id
		console.log(vape_id)

		req.getConnection((err, productos) => {
			productos.query('SELECT * FROM vape WHERE vape_id = ?', vape_id, (err, rows) => {
				console.log(err, '---', rows)
				if(err)
				{
					next( new Error('Registro No Encontrado') )
				}
				else
				{
					let locals = {
						title : 'Editar Película',
						data : rows
					}

					res.render('edit-movie', locals)
				}
			})
		})
	})
	.post('/actualizar/:vape_id', (req, res, next) => {
		req.getConnection((err, productos) => {
			let producto = {
				vape_id : req.body.vape_id,
				title : req.body.title,
				description : req.body.description,
				rating : req.body.rating,
				price: req.body.price,
				image : path.join("upload/",req.file.originalname)
			}
			console.log(producto)

			productos.query('UPDATE vape SET ? WHERE vape_id = ?', [producto, producto.vape_id], (err, rows) => {
				return (err) ? next( new Error('Error al actualizar') ) : res.redirect('/')
			})
		})
	})
	.post('/eliminar/:vape_id', (req, res, next) => {
		let vape_id = req.params.vape_id
		console.log(vape_id)

		req.getConnection((err, productos) => {
			productos.query('DELETE FROM vapes WHERE vape_id = ?', vape_id, (err, rows) => {
				console.log(err, '---', rows)
				return (err) ? next( new Error('Registro No Encontrado') ) : res.redirect('/')
			})
		})
	})
	.use(error404)
	
module.exports = router