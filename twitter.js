var worker = function(trackWords) {
	var redisClient = require("redis").createClient(),
		twitter = require("ntwitter");
		credentials = require("./credentials.js");

	var twit = new twitter({
		consumer_key: credentials.consumer_key,
		consumer_secret: credentials.consumer_secret,
		access_token_key: credentials.access_token_key,
		access_token_secret: credentials.access_token_secret
	
	});
	
twit.stream(
	'statuses/filter'
	{ track: trackWords },
	function(stream) {
		stream.on('data', function(tweet) {
			console.log(tweet.text);
			for (var i=0; i<trackWords.length; i++) {
				if (tweet.text.indexOf(trackWords[i]) > -1) {
					redisClient.incr(trackWords[i]);
				}
			}
		});
	}
	
	
	
);
	
	
}

module.exports = worker;