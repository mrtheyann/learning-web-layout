# TODO: Make code modular


#=============================================
# Util
#=============================================

polarToCartesian = (cx, cy, r, angle) ->
  angle = (angle - 90) * Math.PI / 180 # Degrees to radians
  x: cx + r * Math.cos angle
  y: cy + r * Math.sin angle

describeArc = (x, y, r, startAngle, endAngle, continueLine) ->
  start = polarToCartesian x, y, r, startAngle %= 360
  end = polarToCartesian x, y, r, endAngle %= 360
  large = Math.abs(endAngle - startAngle) >= 180
  alter = endAngle > startAngle
  "
  #{if continueLine then 'L' else 'M'}#{start.x},#{start.y}
  A#{r},#{r}, 0
  #{if large then 1 else 0},
  #{if alter then 1 else 0}, #{end.x}, #{end.y}
  "
describeSector = (x, y, r, r2, startAngle, endAngle) ->
  "
  #{describeArc x, y, r, startAngle, endAngle}
  #{describeArc x, y, r2, endAngle, startAngle, true}Z
  "

#=============================================
# GUI
#=============================================

class GUI
  constructor: (buttons) ->
    @paper = Snap window.innerWidth, window.innerHeight
    @nav = new RadialNav @paper, buttons
    do @_bindEvents

  #==================
  # Private
  #==================

  _bindEvents: ->
    window.addEventListener 'resize', =>
      @paper.attr
        width: window.innerWidth
        height: window.innerHeight


#=============================================
# RadialNav
#=============================================

class RadialNav
  constructor: (paper, buttons) ->
    @area = paper
      .svg 0, 0, @size = 500, @size
      .addClass 'radialnav'
    @c = @size / 2 #Center
    @r = @size * .25 # Outer Radius
    @r2 = @r * .35 # Inner Radius
    @angle = 360 / buttons.length

    @container = do @area.g

    @updateButtons buttons

  #==================
  # Private
  #==================

  _sector: ->
    @area
      .path describeSector @c, @c, @r, @r2, 0, @angle
      .addClass 'radialnav-sector'

  _button: (btn, sector) ->
    @area
      .g sector

  #==================
  # Public
  #==================

  updateButtons: (buttons) ->
    do @container.clear
    for btn, i in buttons
      button = @_button btn, @_sector()
      button.transform "r#{@angle * i},#{@c},#{@c}"
      @container.add


#=============================================
# Test
#=============================================

gui = new GUI [
  {
    icon: 'pin'
    action: -> console.log 'Pinning...'
  }
  {
    icon: 'search'
    action: -> console.log 'Opening Search...'
  }
  {
    icon: 'cloud'
    action: -> console.log 'Connecting to Cloud...'
  }
  {
    icon: 'settings'
    action: -> console.log 'Opening Settings...'
  }
  {
    icon: 'rewind'
    action: -> console.log 'Rewinding...'
  }
  {
    icon: 'preview'
    action: -> console.log 'Preview Activated...'
  }
  {
    icon: 'delete'
    action: -> console.log 'Deleting...'
  }
]
