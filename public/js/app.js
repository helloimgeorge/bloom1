$('#flowerForm').submit(function(event) {
	event.preventDefault();
	findShop();
});

$('#results').hide();


var findShop = function() {
	$('#results').show();
	var flowerShops = "<ul>";
	// find flower shops through zip code
	var zipcode = $('#zipcode').val();
	$.get('/api/flowers',{ city : zipcode },  function(data) {
		var result = data;
		var allPlaces = data.businesses;
		for (var i = 0; i < allPlaces.length; i++) {
			flowerShops = flowerShops + "<li>" + allPlaces[i].name + "</li>";
		}
		flowerShops = flowerShops + "</ul>";
		console.log(flowerShops);
		$('#results').append(flowerShops);
	}); 

}

