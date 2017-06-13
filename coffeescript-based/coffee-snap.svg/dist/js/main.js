(function() {
  var paper, path, pathArray, style;

  paper = Snap(800, 400);

  console.log(paper);

  style = {
    fill: '#387',
    stroke: '#aaa',
    strokeWidth: 5
  };

  path = paper.path("").attr({
    stroke: '#222',
    fill: 'transparent',
    strokeWidth: 3
  });

  pathArray = [];

  paper.click(function(e) {
    var coords, pathString;
    if (e.target.tagName === 'svg') {
      paper.circle(e.offsetX, e.offsetY, 15).attr(style).drag();
      pathString = path.attr('d');
      coords = e.offsetX + "," + e.offsetY;
      return path.attr({
        d: pathString ? pathString + ("L " + coords + " ") : "M " + coords
      });
    }
  });

}).call(this);
