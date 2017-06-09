

//------------------------------------------------

// how to run this app
// on node.js command prompt,
// 1- cd to this directory  (C:/code/nodeProj/contactlistapp)
// 2- type:  node server.js
// 3- on a browser, type:  localhost:3000
//
// browser will show:
//   Contact list
//   Name      Email               Number
//   murrey33  murrey@email.com    222-222-2222

/*
//test to see if server run correctly
// call app's get() function
app.get('/', function(req, res) { // '/' means set the route to our index place
	res.send("Hi from server.js"); 
});
*/


var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
// 9-2
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require("mysql");

// var getsubsetdb_server = require('getsubsetdb_server');

app.use(bodyParser());
app.use(cors());

// S.10   setup html template
// we use index.html  so next command tell server where to look for index.html
app.use(express.static( __dirname + "/public")); //  _-dirname + ...  <-- where to  find static  file

app.post('/register', function (req, res) {
	// console.log("I received a POST req", req);
	var myname;
	var myemail;
	var mypassword;	
	var newPerson = {};

	myname = req.body.name;
	myemail = req.body.email;
	mypassword = req.body.password;
	
	console.log("server  /register sees this req.body = ", req.body);
	//-------------------------------
	// write to myql
	//-------------------------------
	var con = mysql.createConnection({
		host: "localhost",
		// user: "mysql",
		// user: "craiglist",
		user: "lamp",
		password: "",
		database: "lamp_final_project"
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
	// console.log("I received a POST req  for ng-upload");
	
		newPerson = {
				username:  myname, //Description: req.body.Description,
				email: myemail, //Email: myemail,
				password: mypassword
			};
			// insert  employee data structure into database
			con.query('INSERT INTO user SET ?', newPerson,
				function(err,rows){
					if(err) throw err;
					console.log('Data written to Db:\n');
				});

});











//console.log(req.params.selection);//	console.log(req.selection);
//console.log(req.params);// return   {}
//console.log(req.params.body); //un-defined
//console.log(req.bodyParser); // un-def
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.post('/postcontactlistselective', function (req, res) {
console.log(req.body);  // this works   return  {subcat2: 'software'}
console.log(req.body.subcat2);
var channels_subcat = {
			"0": "default", // get all
			"1": "software",
			"2": "accounting",
			"3": "business" ,
			"4": "apartment" ,
			"5": "office",
			"6": "vacation_rental",
			"7": "jewelry" ,
			"8": "household",
			"9": "electronics"
		};


		var regions_location = {
			"0": "default", // get all locations
			"1": "san francisco",
			"2": "LA",
			"3": "washington",
			"4": "paris",
			"5": "rome",
			"6": "london",
			"7": "saigon",
			"8": "tokyo",
			"9": "delhi"
		};
console.log("channels_subcat = ", channels_subcat)   ;
console.log("regions_location = ", regions_location)   ;
//console.log("length = ", channels_subcat.size )  ;
//		channels_subcat
//req.body.subcat2
size = 0;
for (key in channels_subcat) {
        if (channels_subcat.hasOwnProperty(key)) size++;
    }
console.log("show me ", size);

myKey = 0;
for (key in channels_subcat) {
    if (channels_subcat[key] == req.body.subcat2) {
    	// myKey = parseInt(key); 
    	myKey = key;
        console.log("AAA subcat2 = ", channels_subcat[key],  "key =", myKey) ;     
   	}
}
if (myKey == 0) {console.log("AAA NOT selected subcat2 = ", channels_subcat[key],  "key =", myKey) ;}

// 4-30
myKeyloc = 0;
for (key in regions_location) {
    if (regions_location[key] == req.body.location) { 
    	myKeyloc = key;
        console.log("AAA location = ", regions_location[key],  "key =", myKeyloc) ;     
   	}  
}
if (myKeyloc == 0 ) {
   		console.log("AAA NOT selected location = ", regions_location[key],  "key =", myKeyloc) ;
}



console.log("I received a GET req from postselective");
		var con = mysql.createConnection({
			host: "localhost",
			// user: "mysql",
			// user: "craiglist", //use bitmani wordpress mysql server  !!!
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});



		//--------------------------------------------------
		// get data from MySQL database
		//--------------------------------------------------

if ((myKey == 0) && (myKeyloc ==0)) { // categgory AND location not selected
//****************
con.query('SELECT * FROM posts ',  function(err,rows){	
			if(err) throw err;
			console.log('Data received from Db:\n');
			var person = [] ;
			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
//******
}  else if ((myKey != 0) && (myKeyloc ==0)) { // select only cat
//****************
con.query('SELECT * FROM posts WHERE SubCategory_ID = ?', [myKey],  function(err,rows){	
			if(err) throw err;
			console.log('Data received from Db:\n');
			var person = [] ;
			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
//******
} else { // select only location
//****************
con.query('SELECT * FROM posts WHERE  Location_ID = ?', [myKeyloc],  function(err,rows){	
			if(err) throw err;
			console.log('Data received from Db:\n');
			var person = [] ;
			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
//******
}



}

);



///////////////////////////////////////////////////////////////
app.post('/loginServer', function (req, res) {
	console.log(req);

	var contactlist = {em: req.email,  pw: req.password}; 
	res.json(contactlist);
	}
);

//-----------------------------------------------------------------------
//  write to database using ng-file-upload package
// ng-file-upload   9-5  (upload BOTH images and text like  title, email ...
//-----------------------------------------------------------------------
app.post('/newpost2', function (req, res) {
	// console.log("I received a POST req", req);
	var mytitle;
	var myprice;
	var mydescription;
	var myemail;
	var mypassword;
	var mysubcategory;
	var myregion;
	var myimage1;
	var Title;
	
	var employee = {};

	//-------------------------------
	// write to myql
	//-------------------------------
	var con = mysql.createConnection({
		host: "localhost",
		// user: "mysql",
		// user: "craiglist",
		user: "lamp",
		password: "",
		database: "lamp_final_project"
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
	// console.log("I received a POST req  for ng-upload");
	
	////////////////////////////////////////////
	//  create an incoming form object
	////////////////////////////////////////////
	var form = new formidable.IncomingForm();
	form.multiples = true; // specify that we want to allow the user to upload multiple files in a single request
	// store all uploads in the ./public/images directory
	form.uploadDir = path.join(__dirname, './public/images');
	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	var idx = 0;
	var myimage = ["0", "1", "2", "3"];
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
		myimage[idx++] = file.name;	// myimage1 = file.name;
		// console.log("form on  file name --> ", file.name);
		// console.log("form on  title --> ", field.title);   // undefined
	});
	
	// log any errors that occur
	form.on('error', function(err) {console.log('An error has occured: \n' + err);  });
	
	// once all the files have been uploaded, send a response to the client
	form.on('end', function() { res.end('success')   });
	
	// parse the incoming request containing the form data
	form.parse(req,
		function(err, fields, files) {
			mytitle = fields.title;
			myprice = fields.price;
			mydescription = fields.description;
			myemail = fields.email;
			mypassword = fields.password;
			mysubcategory = fields.subcategory;
			myregion = fields.region;

			// console.log("form parse title :  ", mytitle);
			// console.log("form parse :  ", fields);
			
			employee = {
				SubCategory_ID: mysubcategory, //SubCategory_ID: req.body.SubCategory_ID,
				Location_ID: myregion, //Location_ID: req.body.Location_ID,
				Title: mytitle ,
				Image_1: myimage[0],
				Image_2: myimage[1],
				Image_3: myimage[2],
				Image_4: myimage[3],
				Price: myprice, //Price: req.body.Price,
				Description:  mydescription, //Description: req.body.Description,
				Email:myemail, //Email: myemail,
				Agreement: true  //Agreement: req.body.Agreement,
				//Timestamp: req.body.Timestamp
			};
			// insert  employee data structure into database
			con.query('INSERT INTO posts SET ?', employee,
				function(err,rows){
					if(err) throw err;
					console.log('Data written to Db:\n');
				});
		}
	);
	// form.parse(req);
});


//-----------------------------------------
//  get from databaase
//------------------------------------------
app.get('/contactlist', function(req, res) {
	console.log("I received a GET req");
	//var person2 = { name: "murrey33", email: "murrey@email.com", number: "222-222-2222"  };
		var con = mysql.createConnection({
			host: "localhost",
			// user: "mysql",
			// user: "craiglist", //use bitmani wordpress mysql server  !!!
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});

		var channels_subcat = {
			"1": "software",
			"2": "accounting",
			"3": "business" ,
			"4": "apartment" ,
			"5": "office",
			"6": "vacation_rental",
			"7": "jewelry" ,
			"8": "household",
			"9": "electronics"
		};
		var regions_location = {
			"1": "san francisco",
			"2": "LA",
			"3": "washington",
			"4": "paris",
			"5": "rome",
			"6": "london",
			"7": "saigon",
			"8": "tokyo",
			"9": "delhi"
		};

	
		//--------------------------------------------------
		// get data from MySQL database
		//--------------------------------------------------
		con.query('SELECT * FROM posts',function(err,rows){
			if(err) throw err;

			console.log('Data received from Db:\n');
			// resultRows = rows;
			// console.log(rows);
			// var person1 = {name: rows[0].Title, email: rows[0].Email, number: "111-111-1111"};
			var person = [] ;

			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					//SubCategory_ID: rows[i].SubCategory_ID,
					//Location_ID: rows[i].Location_ID,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
				// person[i] = {name: rows[i].Title, email: rows[i].Email, number: "8"};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});

		//var contactlist = [person1, person2];
	//res.json(contactlist);
	}
	);



//@@@@@@@@@@@@@@@@@@@@@@@
//-----------------------------------------
//  get login data from databaase
//------------------------------------------
app.get('/loginList', function(req, res) {
	console.log("I received a GET req to get list of users to check for login");
	//var person2 = { name: "murrey33", email: "murrey@email.com", number: "222-222-2222"  };
		var con = mysql.createConnection({
			host: "localhost",
			// user: "mysql",
			// user: "craiglist", //use bitmani wordpress mysql server  !!!
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});

		
	
		//--------------------------------------------------
		// get data from MySQL database
		//--------------------------------------------------
		con.query('SELECT * FROM user',function(err,rows){
			if(err) throw err;

			console.log('Data received from Db:\n');
			// resultRows = rows;
			// console.log(rows);
			// var person1 = {name: rows[0].Title, email: rows[0].Email, number: "111-111-1111"};
			var person = [] ;

			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					name: rows[i].username,
					password: rows[i].password,
					email: rows[i].email
				};
				// person[i] = {name: rows[i].Title, email: rows[i].Email, number: "8"};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});

	}
	);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//-----------------------------------------------------------------------
//  write to database using ng-file-upload package
// ng-file-upload   9-5  (upload BOTH images and text like  title, email ...
//-----------------------------------------------------------------------
app.post('/registernewpost2', function (req, res) {
	// console.log("I received a POST req", req);
	var mytitle;
	var myprice;
	var mydescription;
	var myemail;
	var mypassword;
	var mysubcategory;
	var myregion;
	var myimage1;
	var Title;
	
	var newPerson = {};

	//-------------------------------
	// write to myql
	//-------------------------------
	var con = mysql.createConnection({
		host: "localhost",
		// user: "mysql",
		// user: "craiglist",
		user: "lamp",
		password: "",
		database: "lamp_final_project"
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
	// console.log("I received a POST req  for ng-upload");
	
	////////////////////////////////////////////
	//  create an incoming form object
	////////////////////////////////////////////
	var form = new formidable.IncomingForm();
	form.multiples = true; // specify that we want to allow the user to upload multiple files in a single request
	// store all uploads in the ./public/images directory
	form.uploadDir = path.join(__dirname, './public/images');
	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	var idx = 0;
	var myimage = ["0", "1", "2", "3"];
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
		myimage[idx++] = file.name;	// myimage1 = file.name;
	});
	
	// log any errors that occur
	form.on('error', function(err) {console.log('An error has occured: \n' + err);  });
	
	// once all the files have been uploaded, send a response to the client
	form.on('end', function() { res.end('success')   });
	
	// parse the incoming request containing the form data
	form.parse(req,
		function(err, fields, files) {
			mydescription = fields.description;  //  this is username
			myemail = fields.email;
			mypassword = fields.password;
			
			newPerson = {
				username:  mydescription, //Description: req.body.Description,
				email: myemail, //Email: myemail,
				password: mypassword
			};
			// insert  employee data structure into database
			con.query('INSERT INTO user SET ?', newPerson,
				function(err,rows){
					if(err) throw err;
					console.log('Data written to Db:\n');
				});
		}
	);
	// form.parse(req);
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//-----------------------------------------
//  get from databaase
//------------------------------------------
app.get('/contactlistselective', function(req, res) {
	console.log("I received a GET req selective");
	//var person2 = { name: "murrey33", email: "murrey@email.com", number: "222-222-2222"  };
		var con = mysql.createConnection({
			host: "localhost",
			// user: "mysql",
			// user: "craiglist", //use bitmani wordpress mysql server  !!!
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});

		var channels_subcat = {
			"1": "software",
			"2": "accounting",
			"3": "business" ,
			"4": "apartment" ,
			"5": "office",
			"6": "vacation_rental",
			"7": "jewelry" ,
			"8": "household",
			"9": "electronics"
		};
		var regions_location = {
			"1": "san francisco",
			"2": "LA",
			"3": "washington",
			"4": "paris",
			"5": "rome",
			"6": "london",
			"7": "saigon",
			"8": "tokyo",
			"9": "delhi"
		};

	
		//--------------------------------------------------
		// get data from MySQL database
		//--------------------------------------------------
		// con.query('SELECT * FROM posts',function(err,rows){
		con.query('SELECT * FROM posts WHERE Location_ID = "2"',function(err,rows){
			if(err) throw err;

			console.log('Data received from Db selective:\n');
			// resultRows = rows;
			// console.log(rows);
			// var person1 = {name: rows[0].Title, email: rows[0].Email, number: "111-111-1111"};
			var person = [] ;

			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					//SubCategory_ID: rows[i].SubCategory_ID,
					//Location_ID: rows[i].Location_ID,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
				// person[i] = {name: rows[i].Title, email: rows[i].Email, number: "8"};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});

		//var contactlist = [person1, person2];
	//res.json(contactlist);
	}
	);




//////////////////////////////////////////////////////////////////
// editpost
//////////////////////////////////////////////////////////////////


app.post('/editpost', function (req, res) {

console.log("server editpost req.body = ", req.body);  // this works   return  {subcat2: 'software'}

var emailHere = req.body.email;
var channels_subcat = {
	"0": "default", // get all
			"1": "software",
			"2": "accounting",
			"3": "business" ,
			"4": "apartment" ,
			"5": "office",
			"6": "vacation_rental",
			"7": "jewelry" ,
			"8": "household",
			"9": "electronics"
		};


var regions_location = {
	"0": "default", // get all locations
			"1": "san francisco",
			"2": "LA",
			"3": "washington",
			"4": "paris",
			"5": "rome",
			"6": "london",
			"7": "saigon",
			"8": "tokyo",
			"9": "delhi"
		};
console.log("I received a GET req from editpost");
		var con = mysql.createConnection({
			host: "localhost",
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});

	//--------------------------------------------------
	// get data from MySQL database
	//--------------------------------------------------
	con.query('SELECT * FROM posts WHERE Email = ?', [emailHere],  function(err,rows){	
			if(err) throw err;
			console.log('Data received from Db:\n');
			var person = [] ;
			for (var i = 0; i < rows.length; i++) {
				person[i] = {
					Post_ID: rows[i].Post_ID,  // New
					SubCategory_ID: channels_subcat[rows[i].SubCategory_ID] ,
					Location_ID: regions_location[rows[i].Location_ID] ,
					title: rows[i].Title,
					Price: rows[i].Price,
					Description: rows[i].Description,
					TimeStamp: rows[i].TimeStamp,
					email: rows[i].Email,
					Image_1: rows[i].Image_1,
					Image_2: rows[i].Image_2,
					Image_3: rows[i].Image_3,
					Image_4: rows[i].Image_4
				};
			}
			var contactlist = person; // [person1, person2];
			res.json(contactlist);
		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
}

); //   editpost






////////////////////////////////////////////////////

app.post('/editpostdelete', function (req, res) {

console.log("server editpost req.body = ", req.body);  // this works   return  {subcat2: 'software'}

var postidHere = req.body.post_ID;  // postid;

console.log("server see postidHere = ", postidHere);

console.log("I received a POST req from editpostdelete");
		var con = mysql.createConnection({
			host: "localhost",
			user: "lamp",
			password: "",
			database: "lamp_final_project"
		});

		con.connect(function(err){
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
		});

	//--------------------------------------------------
	// get data from MySQL database
	//--------------------------------------------------
	con.query('DELETE FROM posts WHERE Post_ID = ?', [postidHere],  function(err,rows){	
			if(err) throw err;
			console.log('Delete post from database\n');

		});
		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});
}






); //   editpost


app.post('/updatepost', function (req, res) {
	var mytitle;
	var myprice;
	var mydescription;
	var myemail;
	var mypassword;
	var mysubcategory;
	var myregion;
	var myimage1;
	var Title;
	
	var employee = {};


	//-------------------------------
	// write to myql
	//-------------------------------
	var con = mysql.createConnection({
		host: "localhost",
		// user: "mysql",
		// user: "craiglist",
		user: "lamp",
		password: "",
		database: "lamp_final_project"
	});

	con.connect(function(err){
		if(err){
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
	// console.log("I received a POST req  for ng-upload");

console.log("server update req = ", req);	

	////////////////////////////////////////////
	//  create an incoming form object
	////////////////////////////////////////////
	var form = new formidable.IncomingForm();
	form.multiples = true; // specify that we want to allow the user to upload multiple files in a single request
	// store all uploads in the ./public/images directory
	form.uploadDir = path.join(__dirname, './public/images');
	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	var idx = 0;
	var myimage = ["0", "1", "2", "3"];
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
		myimage[idx++] = file.name;	// myimage1 = file.name;
	});
	
	// log any errors that occur
	form.on('error', function(err) {console.log('An error has occured: \n' + err);  });
	
	// once all the files have been uploaded, send a response to the client
	form.on('end', function() { res.end('success')   });
	
	// parse the incoming request containing the form data
	form.parse(req,
		function(err, fields, files) {
			postidHere = fields.post_id;
			mytitle = fields.title;
			myprice = fields.price;
			mydescription = fields.description;
			myemail = fields.email;
			mypassword = fields.password;
			mysubcategory = fields.subcategory;
			myregion = fields.region;

			employee = {
				SubCategory_ID: mysubcategory, //SubCategory_ID: req.body.SubCategory_ID,
				Location_ID: myregion, //Location_ID: req.body.Location_ID,
				Title: mytitle ,
				Image_1: myimage[0],
				Image_2: myimage[1],
				Image_3: myimage[2],
				Image_4: myimage[3],
				Price: myprice, //Price: req.body.Price,
				Description:  mydescription, //Description: req.body.Description,
				Email:myemail, //Email: myemail,
				Agreement: true  //Agreement: req.body.Agreement,
				//Timestamp: req.body.Timestamp
			};
			
			console.log("update this !!! employee = ", employee);
titletemp ="hope this is working";

//------------------------------------------------
// insert  post data structure into database (for now post = employee)
//-------------------------------------------------
 //	con.query('UPDATE posts WHERE Post_ID = ?', [postidHere], function(err,rows){	
	
// con.query('INSERT INTO posts SET ?', employee,

//con.query('UPDATE posts SET Title = ?', [titletemp]
	// 'WHERE Post_ID = ?', [postidHere], function(err,rows){	
con.query('UPDATE posts SET Title = ? WHERE Post_ID = ?',
	[titletemp, postidHere], 
 		function(err,rows){	

					if(err) throw err;
					console.log('Data written to Db:\n');
				});
		}
	);
	// form.parse(req);
});

//***********************************************
// app.post('/updatepost', function (req, res) {
//	console.log("server   updatepost()");
// });

app.listen(3000);
console.log("Hi from server.js  on port 3000");

