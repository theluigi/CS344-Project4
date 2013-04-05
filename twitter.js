var worker = function(trackWords) {
        "use strict";
        var redisClient = require("redis").createClient(),
            twitter = require("ntwitter"),
            credentials = require("./credentials.js"),
            i,

            twit = new Twitter({
                consumer_key: credentials.consumer_key,
                consumer_secret: credentials.consumer_secret,
                access_token_key: credentials.access_token_key,
                access_token_secret: credentials.access_token_secret
            });

        twit.stream(
            'statuses/filter',
            { track: trackWords },
            function(stream) {
                stream.on('data', function(tweet) {
                    console.log(tweet.text);
                    for (i = 0; i < trackWords.length; i = i + 1) {
                        if (tweet.text.indexOf(trackWords[i]) > -1) {
                            redisClient.incr(trackWords[i]);
                        }
                    }
                });
            }
        );
    }
module.exports = worker;
