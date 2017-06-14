(function() {
  var paper, path, pathArray, style, updatePath;

  paper = Snap(800, 400);

  console.log(paper);

  style = {
    fill: '#387',
    stroke: '#222',
    strokeWidth: 5
  };

  path = paper.path("").attr({
    stroke: '#222',
    fill: 'transparent',
    strokeWidth: 3
  });

  pathArray = [];

  updatePath = function() {
    var first, i, len, node, pathString, ref;
    first = pathArray[0];
    pathString = "M " + first.x + "," + first.y;
    ref = pathArray.slice(1);
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      pathString += "L " + node.x + "," + node.y;
    }
    return path.attr({
      "d": pathString
    });
  };

  paper.click(function(e) {
    if (e.target.tagName === 'svg') {
      paper.circle(e.offsetX, e.offsetY, 15).attr(style).data('i', pathArray.length).mouseover(function() {
        return this.stop().animate({
          r: 25
        }, 1000, mina.elastic);
      }).mouseout(function() {
        return this.stop().animate({
          r: 15
        }, 300, mina.elasticinout);
      }).drag(function(dx, dy, x, y) {
        var currentNode;
        this.attr({
          cx: x,
          cy: y
        });
        currentNode = pathArray[this.data('i')];
        currentNode.x = x;
        currentNode.y = y;
        return updatePath();
      });
      pathArray.push({
        x: e.offsetX,
        y: e.offsetY
      });
      return updatePath();
    }
  });

}).call(this);
