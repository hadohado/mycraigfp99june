
app.post('/editpost', function (req, res) {

console.log(req.body);  // this works   return  {subcat2: 'software'}

var emailHere = req.body.person.email;

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
	con.query('SELECT * FROM posts WHERE email = ?', [emailHere],  function(err,rows){	
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
}

); //   editpost


