angular.module('directives', ['pascalprecht.translate', 'jett.ionic.filter.bar'])

.directive('videoangular', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/player.html'
	};
})
.directive('headerBar', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/header-bar.html'
	};
})