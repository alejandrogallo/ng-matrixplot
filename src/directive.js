
var app = angular.module("ng-matrixplot", []);


app.controller("MainController", ["$scope", function ($scope) {
 $scope.prepareData = function () { 
  // $scope.data=[[0]];
  var data = []; 
  $scope.rows=100; 
  $scope.cols=100 ;
  var seed= Math.random()*10000;
  for (var i = 0; i < $scope.rows; i++) {
   data.push([]);
   for (var j = 0; j < $scope.cols; j++) {
    data[i].push(Math.floor(Math.sin(2*3.14*seed*i*j/($scope.rows*$scope.cols*100))*Math.cos(i/seed)*100));
   };
  };
  return data;
 };



 $scope.settings={"data":$scope.prepareData(), "options":{"width": 600 ,"height": 600 ,"color": 240}};

}]);

app.directive("matrixPlot", ["$window", "$parse", function ($window, $parse) {

 return {
  restrict: "EA",
  template: "<canvas> </canvas>",
  link: function(scope, elem, attrs){
   var canvas = elem.find("canvas")[0];
   var settings = $parse(attrs.settings)(scope);

   var plot = matrixplot(canvas, settings);

   scope.$watch(attrs.settings, function(newv, oldv) {
    if (newv) {
     // console.log("Not empty");
     // console.log(newv);
     plot.refresh(newv); 
    };
    
   },true);

  }
 };
}]);




