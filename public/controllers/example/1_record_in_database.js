	// record in server.js
	// used for   /updatepost
	// left side (which is key) is var name in actual sql database
	// right side var is var name sent from browser side (preceded with fields. )
	record = {	
		Title: 			fields.Title ,
		Price: 			fields.Price,
		Description: 	fields.Description ,
		Email: 			fields.Email,
		SubCategory_ID: fields.SubCategory_ID,
		Location_ID: 	fields.Location_ID, 
		Image_1: 		myimage[0],
		Image_2: 		myimage[1],
		Image_3: 		myimage[2],
		Image_4: 		myimage[3],		
		Agreement: 		true 		
	};

	// this is the translation if we have to use lower-case
	//  database var:   var name in html form
		Title: 			title ,
		Price: 			price,
		Description: 	description ,
		Email: 			email,
		SubCategory_ID: subCategory_id,
		Location_ID: 	location_id, 
		Image_1: 		image[0],
		Image_2: 		image[1],
		Image_3: 		image[2],
		Image_4: 		image[3],	


	record = {	
		Title: 			Title ,
		Price: 			Price,
		Description: 	Description ,
		Email: 			Email,
		SubCategory_ID: SubCategory_ID,
		Location_ID: 	Location_ID, 
		Image_1: 		myimage[0],
		Image_2: 		myimage[1],
		Image_3: 		myimage[2],
		Image_4: 		myimage[3],		
		Agreement: 		true 		
	};
//Location_ID: req.body.Location_ID,
//Timestamp: req.body.Timestamp	
