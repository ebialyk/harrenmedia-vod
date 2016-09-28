var app = angular.module('MuvFlixApp');
app.directive('stars',[function() {
	return {
		scope: {
			ngModel:'='
		},
		restrict: "EA",
		templateUrl: "LP/partials/stars.html"
	}
}])