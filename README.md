# ng-matrixplot v.0.0.1

##A javascript and AngularJs plugin for simple rendering of 2D matrix plots

This simple plugin allows you to embed 2D matrix plots into your project either through 
pure javascript or as a directive on AngularJs.

The API is very simple:
	
### Pure Javascript

Select a "canvas" element and 

```javascript
var settings = {data: [[0,1],[100,0]], options: [width: 500, height: 500, color: 120]};
var myPlot = matrixplot(canvas, settings);
myPlot.initParameters();
myPlot.draw();
```

where `color` ranges from 0 to 360 through the [color wheel](https://en.wikipedia.org/wiki/HSL_and_HSV). The entrances of the matrix are the lightness of the *hsl* color. This feature is open to be generalised to other color spaces. The parameters `width` and `height` are the dimensions of the canvas HTMLElement. 
If you need to redraw the plot, just call the `refresh` method with new settings like this
```javascript
var myNewSettings = {data: [[23,1],[100,51],[2,3]], options: [width: 500, height: 500, color: 120]};
myPlot.refresh(myNewSettings);
```

### AngularJs

Inject `ng-matrixplot` into your module: 

```javascript
app.module("myApp", ['ng-matrixplot']).
controller("MyController", ["$scope", function($scope){
	$scope.mySettings = {data: [[0,1],[100,0]], options: [width: 500, height: 500, color: 120]};
}]);
```
and use the `matrixPlot` directive like so 
```html
<matrix-plot settings="mySettings"> </matrix-plot>
```

and *voilà*. Of course in that way you can change the settings parameters or the data and the plot will change 
automatically. 
