#=============================================
# GUI
#=============================================

class GUI
  constructor: (buttons) ->
    @paper = Snap window.innerWidth, window.innerHeight
    do @_bindEvents

  #=============================================
  # private
  #=============================================

  _bindEvents: ->
    window.addEventListener 'resize', =>
      @paper.attr
        width: window.innerWidth
        height: window.innerHeight

#=============================================
# Test
#=============================================
