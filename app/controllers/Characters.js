var controllers = angular.module('TurnOrder');

controllers.controller('CharactersCtrl', ['$scope', function($scope) {
	$scope.charTotal = 0;
	$scope.characters = [];
	$scope.character = {};
	$scope.playersEntered = false;
	$scope.rollComplete = false;


	//Submit button functionality
	$scope.setNum = function() {
		//clear characters array
		$scope.characters = [];
		//add this so the number of inputs shown only change when the submit button is clicked
		$scope.number = $scope.charTotal;
		//show the character attribute inputs
		$scope.playersEntered = true;
	}

	//creates an empty array equal the total number of characters.  had to do this because of the way ng-repeat works
	$scope.getCharInfo = function(num) {
		return new Array(num);
	}

	//Roll for Turn Order button functionality
	$scope.roll = function() {
		//hide the character attribute inputs
		$scope.playersEntered = false;

		//for every character, roll a D20, bundle all it's attributes in an object and push that object into the characters array
		for (key in $scope.character) {
			var dieRoll = d20();

			$scope.characters.push({
				Name: $scope.character[key].name,
				Dex: $scope.character[key].dex,
				Roll: dieRoll,
				Total: $scope.character[key].dex + dieRoll,
			});
		}

		//show turn-diamgram
		$scope.rollComplete = true;
	}

	//Reroll for New Turn Order button functionality
	$scope.reroll = function() {
		//for every character, reroll a D20 and update it's Roll and Total values
		for (key in $scope.characters) {
			var dieRoll = d20();

			$scope.characters[key].Roll = dieRoll;
			$scope.characters[key].Total = $scope.characters[key].Dex + dieRoll;
		}
	}

	//helper function.  returns a random number, 1-20
	function d20() {
		return Math.floor((Math.random()*20)+1);
	}
}]);
