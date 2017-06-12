paper = Snap 800, 400
console.log paper

style =
  fill: '#387'
  stroke: '#aaa'
  strokeWidth: '5'

pathArray = []
updatePath = ->
  first = pathArray[0]
  pathString = "M #{first.x}, #{first.y}"
  for node in pathArray.slice 1
    pathString += "L #{node.x}, #{node.y}"
  path.attr d: pathString

paper.click (e) ->
  if e.target.tagName is 'svg'
    paper
      .circle e.offsetX, e.offsetY, 15
      .data 'i', pathArray.length
      .attr style
      .drag(dx, dy, x, y) ->
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
