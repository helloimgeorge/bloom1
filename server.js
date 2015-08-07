var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var q = require('q');

app.use(express.static(__dirname + '/public'));

var oauth_prop = {
	consumer_key : "r-xSagiYO6UUcuDymub_1Q",
	consumer_secret : "IE19zeTYkOk5MAxOMa4EEwadqbw",
	token : "FMeJgu1GodJ75ZS1yLUl5XsRmWXTlbua", 
	token_secret : "9j-uRcl8fvhrIU3kZa64gxgP5Pw"
}


var requestOptions = {
	url : "http://api.yelp.com/v2/search/?term=flowers&location=", 
	oauth : oauth_prop,
	json : true
}

// needs to return a promise
function findFlowerShops(city) {
	requestOptions.url = requestOptions.url + city;
	var def = q.defer();
	request(requestOptions, function(err, res, body) {
		if (err) {
			def.reject(new Error(err));
		} else {
			//console.log(body);
			def.resolve(body);
		}
	});
	return def.promise;
}


app.get('/', function(req, res) {
	res.sendFile('index.html', function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("success");
		}
	});
});


router.route('/flowers')
	.get(function(req, res) {
		var city = req.query.city;
		var promise = findFlowerShops(city).then(function(result) {
			// console.log(result);
			res.send(result);
		}, function(result) {
			// console.log(result);
			res.send(result);
		});
	});


app.use('/api', router);


app.listen(3000);
console.log("Listening on Port 3000");