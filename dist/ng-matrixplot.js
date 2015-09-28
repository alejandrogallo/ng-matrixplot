/*! ng-matrixplot 
 MIT 29-09-2015 alejandro gallo <alejandroamsg@hotmail.com> */




function MatrixPlotClass(canvas, settings) {
 // Class definition
 // Settings must be a json object {"data":[[0-100]], "options":{"width":- , "height": - , color:0..360}}
 var self = this;
 self.initParameters = function(){
  self.settings = settings;
  canvas.width = self.settings.options.width;
  canvas.height = self.settings.options.height;
  self.maincolor = self.settings.options.color || "120";
  rows = self.settings.data.length;
  try{
   cols = self.settings.data[0].length;
  }
  catch (e) {
   console.log(e);
   cols=0;
  }
  self.pixelWidth = self.settings.options.width/cols; 
  self.pixelHeight = self.settings.options.height/rows;
  // check if it works in all browsers
  self.context = canvas.getContext("2d");
  self.context.clearRect(0, 0, self.settings.options.width, self.settings.options.height);
 };
 // draw function
 self.draw = function() {
  self.settings.data.forEach(function(d,i) {
   d.forEach(function(q,l) {
    self.context.beginPath();
    self.context.rect(l*self.pixelWidth, i*self.pixelHeight, self.pixelWidth, self.pixelHeight);
    self.context.fillStyle="hsl("+self.maincolor+", 100%,"+q+"%)";
    self.context.fill();
   });
  });
 };
 // refresh graph
 self.refresh = function(settings){
  self.settings = settings;
  self.initParameters();
  self.draw();
 };
}

// wrapper
var matrixplot = function (canvas, settings) {
 var instance = new MatrixPlotClass(canvas, settings);
 return instance;
};
;angular.module("ng-matrixplot", []).directive("matrixPlot", 
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




