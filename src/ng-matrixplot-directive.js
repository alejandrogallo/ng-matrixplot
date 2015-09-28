angular.module("ng-matrixplot", []).directive("matrixPlot", 
  ["$parse", function ($parse) {
 return {
  restrict: "EA",
  template: "<canvas> </canvas>",
  link: function(scope, elem, attrs){
   var canvas = elem.find("canvas")[0];
   var settings = $parse(attrs.settings)(scope);
   var plot = matrixplot(canvas, settings);
   scope.$watch(attrs.settings, 
    function(newv, oldv) {
      if (newv) {
       plot.refresh(newv); 
      }
     },true);
    }
   }; 
  }]);




