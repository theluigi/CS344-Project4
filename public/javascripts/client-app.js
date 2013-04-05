var main = function () {
	console.log("Hello world!");
	$.getJSON("/counts.json", function(response) {
		$("body").append("<p>awesome: " + response.awesome + "</p>");
	});
}