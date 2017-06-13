paper = Snap 800, 400
console.log paper

style =
  fill: '#387'
  stroke: '#aaa'
  strokeWidth: 5

path = paper
  .path ""
  .attr
      stroke: '#222'
      fill: 'transparent'
      strokeWidth: 3

pathArray = []

paper.click (e) ->
  if e.target.tagName is 'svg'
    paper
      .circle e.offsetX, e.offsetY, 15
      .attr style
      .drag()
      pathString = path.attr 'd'
      coords = "#{e.offsetX},#{e.offsetY}"
      path.attr
        d: if pathString then pathString + "L #{coords} " else "M #{coords}"
