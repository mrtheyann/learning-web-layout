paper = Snap 800, 400
console.log paper

style =
  fill: '#387'
  stroke: '#222'
  strokeWidth: 5

path = paper
  .path ""
  .attr
      stroke: '#222'
      fill: 'transparent'
      strokeWidth: 3

pathArray = []

updatePath = ->
  first = pathArray[0]
  pathString = "M #{first.x},#{first.y}"
  for node in pathArray.slice 1
    pathString += "L #{node.x},#{node.y}"
  path.attr "d": pathString

paper.click (e) ->
  if e.target.tagName is 'svg'
    paper
      .circle e.offsetX, e.offsetY, 15
      .attr style
      .data 'i', pathArray.length
      .mouseover ->
        @stop().animate {r: 25}, 1000, mina.elastic
      .mouseout ->
        @stop().animate {r: 15}, 300, mina.elasticinout
      .drag (dx, dy, x, y) ->
        @attr
          cx: x
          cy: y
        currentNode = pathArray[@data 'i']
        currentNode.x = x
        currentNode.y = y
        do updatePath

    pathArray.push
      x: e.offsetX
      y: e.offsetY

    do updatePath
