# ng-matrixplot v.0.0.1

##A javascript and AngularJs plugin for simple rendering of 2D matrix plots

This simple plugin allows you to embed 2D matrix plots into your project either through 
pure javascript or as a directive on AngularJs.

The API is very simple:
	
### Pure Javascript

Select a "canvas" element and 

```javascript
var settings = {data: [[0,1],[100,0]], options: [width: 500, height: 500, color: 120]};
var plot = matrixplot(canvas, settings);
plot.initParameters();
plot.draw();
```

where `color` ranges from 0 to 360 through the [color wheel](https://en.wikipedia.org/wiki/HSL_and_HSV).
