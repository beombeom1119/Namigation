const fs = require('fs');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql =require('mysql');


const connection =mysql.createConnection({
	host:conf.host,
	user: conf.user,
	password: conf.password,
	port:conf.port,
	database : conf.database
});
connection.connect();
const multer = require('multer');
const { query, request } = require('express');
const upload = multer({dest:'./upload'})

app.get('/api/result/:userNum',(req, res)=> {
	let sql = "SELECT * FROM m_Tcheck WHERE userNum = 4566" ;
	let userNum = req.body.userNum;
	let params = [userNum]
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log("!!!!!!")
				console.log(err)
				// console.log(rows)
			}) 
	}
);

app.get('/api/result',(req, res)=> {
	let sql = "SELECT * FROM m_Tcheck WHERE userNum =4566 ";
	let userNum = req.body.userNum;
	let params = [userNum]
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log("!!!!!!")
				console.log(err)
				// console.log(rows)
			})});


app.post('/api/result',(req, res)=> {
	let sql = "SELECT * FROM m_Tcheck WHERE userNum = ? ";
	let params = req.body.userNum;
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log(req.body.userNum+"헬로우 이범기 할라할라할라라라하라라")
				// console.log(rows)
			})});

app.get('/api/haha/:userNum',(req, res)=> {
    connection.query(
		"SELECT * FROM m_Tcheck where userNum="+req.params.userNum,
		(err, rows, fields) => {
			try {
			console.log(req.params.userNum)
			res.send(rows);		
			} catch (error) {
			console.log("!!!!!!오류입니다.")	
			} } ); });

app.get('/api/login',(req, res)=> {
	let sql = "SELECT userNum FROM m_Tcheck WHERE userNum = ? ";
	let userNum = req.body.userNum;
	let params = [userNum]
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log(req.body)
				console.log(err)
			})});

	app.post('/api/login',(req, res)=> {
			let sql = "SELECT * FROM  m_user INNER JOIN m_Tcheck WHERE m_user.userNum=? && m_Tcheck.userNum = ? ";
			let userNum = req.body.userNum;
			console.log(userNum)
			let params = [userNum,userNum]
				connection.query(sql, params,
					(err,rows,fields)=> {
						try {
						res.send(rows);
						} catch{
						res.json(
							{userNum:"!!!"}
						)
						}	
					})});

	app.use('/image',express.static('./upload'));
	// app.post('/api/predict'/*,upload.single('image')*/,(req,res)=> 
	app.post('/api/predict',upload.single('image'),(req,res)=> 
	{
		
		console.log(request.body)
		let sql = "insert into m_Tcheck values (null,?,?,?,?,?,https://placeimg.com/64/64/summer,NOW())";
		// let image ='/image/' + req.file.filename;	
		// let userNum =req.body.userNum;
		// let userNum =1;
		// let distance = 1;
		// let depth = 1;
		let userNum =req.body.userNum;
		let high = req.body.high;
		let middle = req.body.middle;
		let low = req.body.low;
		let good = req.body.good;
		let params = [userNum,high,middle,low,good];
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log(err)
				console.log(rows)
			})
		})

app.listen(port, ()=> console.log(`${port}포트 확인`))