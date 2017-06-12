(function() {
  var paper, pathArray, style, updatePath;

  paper = Snap(800, 400);

  console.log(paper);

  style = {
    fill: '#387',
    stroke: '#aaa',
    strokeWidth: '5'
  };

  pathArray = [];

  updatePath = function() {
    var first, i, len, node, pathString, ref;
    first = pathArray[0];
    pathString = "M " + first.x + ", " + first.y;
    ref = pathArray.slice(1);
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      pathString += "L " + node.x + ", " + node.y;
    }
    return path.attr({
      d: pathString
    });
  };

  paper.click(function(e) {
    if (e.target.tagName === 'svg') {
      paper.circle(e.offsetX, e.offsetY, 15).data('i', pathArray.length).attr(style).drag(dx, dy, x, y)(function() {
        var currentNode;
        return this.attr({
          cx: x,
          cy: y
        }, currentNode = pathArray[this.data('i')], currentNode.x = x, currentNode.y = y, updatePath());
      });
      pathArray.push({
        x: e.offsetX,
        y: e.offsetY
      });
      return updatePath();
    }
  });

}).call(this);
