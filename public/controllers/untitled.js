// UPDATE Customers
//SET ContactName='Alfred Schmidt', City='Frankfurt'
//WHERE CustomerID=1;

	con.query('UPDATE posts WHERE Post_ID = ?', [postidHere],  function(err,rows){	
			if(err) throw err;
			console.log('Delete post from database\n');

		});
		con.end(function(err) {
		});