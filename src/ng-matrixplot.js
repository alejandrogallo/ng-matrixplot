
var app = angular.module("angular-matrixplot",[]);


app.controller("MainController", ["$scope", function($scope){
	$scope.prepareData = function(){
		var data = []; 
		$scope.rows=80; 
		$scope.cols=80 ;
		var seed= Math.random()*10000;
		for (var i = 0; i < $scope.rows; i++) {
			data.push([]);
			for (var j = 0; j < $scope.cols; j++) {
				data[i].push(Math.floor(Math.sin(2*3.14*seed*i*j/($scope.rows*$scope.cols*100))*Math.cos(i/seed)*100));
			};
		};
		return data;
	};
	$scope.width=600;
	$scope.height=600;
	$scope.color=240;
	$scope.rows = 80; 
	$scope.cols = 80;
	$scope.data = $scope.prepareData();

}]);

app.directive("matrixPlot", ["$window", "$parse", function ($window, $parse) {

	return {
		restrict: "EA",
		template: "<canvas> </canvas>",
		link: function(scope, elem, attrs){

			var data = $parse(attrs.data)(scope);
			var parsedColor = $parse(attrs.color)(scope);
			var maincolor = parsedColor ? parsedColor : "360";
			// $window.console.log(data);

			cols = data[0].length;
			rows = data.length;

			var rawCanvas = elem.find("canvas");
			var canvas = $window.d3.select(rawCanvas[0]);

			var width=$parse(attrs.width)(), height=$parse(attrs.height)();
			// $window.console.log(width, height);

			var pixelWidth = width/cols; 
			var pixelHeight = height/rows; 
				
			canvas.attr("width",width).attr("height",height);
			
			var context = canvas.node().getContext("2d");
			
			
			data.forEach(function(d,i) {
				// console.log(d,i);
				// context.beginPath();
				d.forEach(function(q,l) {
					context.beginPath();
					context.rect(l*pixelWidth, i*pixelHeight, pixelWidth, pixelHeight);
					context.lineWidth="-1";
					context.fillStyle="hsl("+maincolor+", 100%,"+q+"%)";
					context.fill();
					// context.stroke();
				});
				// context.closePath();
			});

		}
  	};
}]);