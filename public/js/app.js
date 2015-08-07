console.log("Fetching data");

// returns a javascript object of values
$.get('/api/flowers', function(data) {
	var result = data;
	var allPlaces = data.businesses;
	for (var i = 0; i < allPlaces.length; i++) {
		console.log(allPlaces[i].name);
	}
}); 
