// We need to 'require' the                                                                                                                            
// following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require("redis").createClient(),
    app = express(),
    twitterWorker = require("./twitter.js"),
    trackWords = ["happy", "ecstatic", "joy", "glad", "fortunate", "merry", "cheerful", "sad", "sorrowful", "mournful", "gloomy", "woeful", "upset", "depressed"];

// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public' 
    "use strict";
    app.use(express.static(path.join(__dirname, 'public')));
});

twitterWorker(trackWords);

// Create the http server and get it to                                                                                                                
// listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function() {
    "use strict";
    console.log("Express server listening on port 3000");
});

app.get("/", function (req, res) {
    "use strict";
    res.send("Hello World!");
});

});
app.get("/counts.json", function	(req, res) {
    redisClient.mget(trackWords, function	(error, results) {
	var result = []; 
	if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            for (var i=0; i<trackWords.length; i++) {
				result.push({
					"key":trackWords[i],
					"value":results[i];
					});
				}
        }res.json(result); 
    });
});
