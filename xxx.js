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