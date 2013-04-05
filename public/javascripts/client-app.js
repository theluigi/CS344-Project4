var main = function () {
	var happyWords = ["happy","ecstatic","joy","glad","fortunate","merry","cheerful"],
		sadWords = ["sad","sorrowful","mournful","gloomy","woeful","upset","depressed"],
		happyCount = 0,
		sadCount = 0,
		i; 
		
	function countTweets(response){
		for (i = 0; i<happyWords.length; i++) {
			if (happyWords[i]===response.key) {
				happyCount = happyCount + parseInt(response.value);
				
			} else if (sadWords[i]===response.key) {
				sadCount = sadCount + parseInt(response.value);
			}
		}
		
		
		
		$.getJSON("/counts.json", function (response) {
			response.forEach(countTweets);
			$("#happy").html(happyCount);
			$("#sad").html(sadCount);
			
		});
	};
};

$(document).ready(main);