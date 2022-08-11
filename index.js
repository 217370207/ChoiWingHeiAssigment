const express = require('express')
var url = require('url');
const app = express()

var multer=require('multer')
var fs=require('fs')
var uploadFolder = 'code/static/upload/';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    
    },
    filename: function (req, file, cb) {
        
        let suffix=file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now()+'.'+suffix);  
    }
});

app.all("*",function(req,res,next){
    
    res.header("Access-Control-Allow-Origin","*");
    
    res.header("Access-Control-Allow-Headers","content-type");
     
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  
    else
    	next();
})
const port = 3000
var bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({
   extended: false,                 
   limit:2*1024*1024           
}));
function uuidv4(){
	return GetRandomNum(1,10000)
}
function GetRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}

function log(word){
	console.log('==============')
	console.log(word)
	console.log('==============')
}
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'app'
});

connection.connect();

let users = [{"name":"abc","email":"abcd@com","id":'1'}]
app.get('/users', (req, res) => {
	res.send(users)
})

var upload = multer({ storage: storage })

app.post('/uploadfile',upload.single('the_file'),function(req,res,next){
//req.body contains the text fields
    console.log(req.file,'------',req.body,'-------',req.file.path);
	res.send({"path":'../static/upload/'+req.file.filename,'msg':'success'})
})

app.get('/getdata', (req, res) => {
	var params = url.parse(req.url, true).query;
	connection.query('SELECT * FROM '+params["table"]+';', function (error, results, fields) {
		if (error) throw error;
		res.send({"data":results,'msg':'success'})
	});
})

app.post('/getdatabykey2', (req, res) => {
	const dic = req.body;
	var arr=[]
	var t= "select COLUMN_NAME from information_schema.COLUMNS where table_name = '"+dic["table"]+"' and table_schema = '"+dic["database"]+"';"
	// log(t)
	connection.query(t, function (error, results, fields) {
		if (error) throw error;
		arr=results
		var arr2 = []
		for (var i = arr.length - 1; i >= 0; i--) {
			arr2.push(arr[i]["COLUMN_NAME"])
		}
		arr = arr2
		// log(arr)

		string=''
		for (x in dic){
			console.log(x)
			if (x=='database')
				continue
			if (x=='table')
				continue
			var is = 0
			for(var j in arr){
				if (arr[j]==x) {
					is=1
				}
			}
			if (is==1){
				console.log("incoming")
				if (string=='')
					string = " "+x+" LIKE  '%"+dic[x]+"%'"
				else
					string = string+ " and "+ " "+x+" LIKE  '%"+dic[x]+"%'"
			}
		}
		var s=''
		if (string=='')
			s = 'SELECT * FROM '+dic["table"]
		else
			s = 'SELECT * FROM '+dic["table"]+' WHERE '+ string
		s=s+';'
		log(s)
		connection.query(s, function (error, results, fields) {
			if (error) throw error;
			res.send({"data":results,'msg':'success'})
		});
	})
})

app.post('/savedata', (req, res) => {
	const dic = req.body;
	string = ''
	string2 = ''
	string3 = ''
	arr3 = []
	string33 = ''
	for(x in dic){
		if (x=='database')
			continue
		if (x=='table')
			continue
		if (x=='key')
			continue
		if (string == ''){
			string = x + ' ' +'text'
			string2=x
			string3= '\''+ dic[x]+'\''
			string33 = '?'
		}else{
			string = string+', ' + x + ' ' +'text'
			string2 = string2+','+x
			string3 = string3+','+'\''+ dic[x]+'\''
			string33 = string33 + ',' + '?'
		}
		arr3.push(dic[x])
	}
	log(string3)
	var sql  ='create table if not exists '+dic["table"]+' (id integer NOT NULL PRIMARY KEY auto_increment , '+ string +')'
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		sql = 'insert into '+dic["table"]+' ('+string2+') values ('+string3+')'
		log(sql)
		connection.query(sql, function (error, results, fields) {
			if (error) throw error;
			res.send({'msg':'success'})

		});
	});
})


app.post('/updatedata', (req, res) => {
	const dic = req.body;
	var string3 = ''
	for (x in dic){
		if (x=='database')
			continue
		if (x=='table')
			continue
		if (x=='id')
			continue
		if (x=='key')
			continue
		if (string3 == '')
			string3= x +' = ' +'\''+ dic[x]+'\''
		else
			string3 = string3+' , '+  x +' = ' +'\''+ dic[x] +'\''
	}
	var sql = 'UPDATE '+dic["table"]+' SET '+string3+' WHERE id = \''+dic["id"]+'\''

	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.send({'msg':'success'})
	});
})
app.get('/deldata', (req, res) => {
	var params = url.parse(req.url, true).query;
	connection.query('DELETE  from ' + params["table"] + ' WHERE id=\'' + params["id"]+'\'', function (error, results, fields) {
		if (error) throw error;
		res.send({"data":results,'msg':'success'})
	});
})

app.post('/users', (req, res) => {
	const newUser = req.body;
	newUser['id']=uuidv4()
	users.push(newUser)
	res.send({"data":users,'msg':"user is added to database",'tdata':req.body})
})
app.delete('/users', (req, res) => {
	const {id} = req.params;
	let modeifedUsers = users.filter((user)=>!(user.id === id));
	res.send(modeifedUsers)
})
app.put('/users/:name', (req, res) => {
	const {id} = req.params;
	const {name,email} = req.body;
	const user = users.find((user)=>user.id === id);
	if (name) {
		user.name=name;
	}
	if (email) {
		user.email=email;
	}
	res.send('User has been updated')
})

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`)
})
