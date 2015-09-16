	var app = angular.module('Verbatime', []);
	var numToFuzz = {
		0: "zero",
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten",
		11: "eleven",
		12: "twelve",
		13: "thirteen",
		14: "fourteen",
		15: "fifteen",
		20: "twenty",
		30: "thirty",
		40: "forty",
		50: "fifty"
	};
	app.controller('ClockController', ["$scope", function($scope){
		var self = this;
		this.time = 0;
		this.mil = false;
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var ampm = "";
		var greeting = "";

		var transform = function(number, type){
			if (number > 15 && number < 20){
				number = numToFuzz[(number - 10)] + "teen";
			}
			else if(number > 15 && number % 10 != 0){
				number = "" + numToFuzz[number - (number % 10)] + " " + numToFuzz[number % 10];
			}
			else if (type === "m" && number < 10){
				if (number === 0){
					this.mil ? number = "hundred hours":number = "o'clock"
				}
				else {
					number = "o' " + numToFuzz[number];
				}
			}
			else{
				number = numToFuzz[number];
			}
			return number;
		}

		$scope.$watch(function(){return self.mil}, function(milValue, oldMilValue){
			if (!milValue){
				greeting = "Howdy! The time is "
				if (hours > 12) {
					hours = hours - 12;
					ampm = " in the afternoon";
				}
				else {
					ampm = " in the morning"
				}
				if (hours === 0) {
					hours = 12;
				}
			}
			else {
				greeting = "G'day mate! The time is "
				ampm = "";
			}
			self.time = greeting + transform(hours, "h") + " " + transform(minutes, "m") + ampm + ".";
		})
	}]);
