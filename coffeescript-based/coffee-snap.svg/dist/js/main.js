(function() {
  var paper, style;

  paper = Snap(800, 400);

  console.log(paper);

  style = {
    fill: '#387',
    stroke: '#aaa',
    strokeWidth: '5'
  };

  paper.click(function(e) {
    if (e.target.tagName === 'svg') {
      return paper.circle(e.offsetX, e.offsetY, 15).attr(style).drag();
    }
  });

}).call(this);
