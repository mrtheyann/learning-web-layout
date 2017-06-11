paper = Snap 800, 400
console.log paper

style =
  fill: '#387'
  stroke: '#aaa'
  strokeWidth: '5'

# circle = paper
#   .circle 150, 150, 100
#   .attr style
#   .drag()

paper.click (e) ->
  if e.target.tagName is 'svg'
    paper
      .circle e.offsetX, e.offsetY, 15
      .attr style
      .drag()
