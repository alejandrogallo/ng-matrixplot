function MatrixPlotClass(canvas, settings) {
  // Settings must be a json object {"data":[[0-100]], "options":{"width":- , "height": - , color:0..360}}
  var self      = this;
  self.settings = settings;
  self.canvas   = canvas;
  self.initParameters = function(){
    self.canvas.width  = self.settings.options.width;
    self.canvas.height = self.settings.options.height;
    self.maincolor     = self.settings.options.color || "120";
    if (self.settings.data == []) {
      self.settings.data = [[]];
    }
    rows               = self.settings.data.length;
    try{
      cols = self.settings.data[0].length;
    }
    catch (e) {
      console.log(e);
      cols=0;
    }
    self.pixelWidth  = self.settings.options.width/cols;
    self.pixelHeight = self.settings.options.height/rows;
    // TODO: check if it works in all browsers
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
  // refresh method
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
