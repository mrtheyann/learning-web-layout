(function() {
  var GUI, RadialNav, animate, describeArc, describeSector, gui, iconsPath, polarToCartesian;

  iconsPath = 'icons.svg';

  Snap.plugin(function(Snap, Element) {
    return Element.prototype.hover = function(f_in, f_out, s_in, s_out) {
      return this.mouseover(f_in, s_in).mouseout(f_out || f_in, s_out || s_in);
    };
  });

  polarToCartesian = function(cx, cy, r, angle) {
    angle = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  describeArc = function(x, y, r, startAngle, endAngle, continueLine) {
    var alter, end, large, start;
    start = polarToCartesian(x, y, r, startAngle %= 360);
    end = polarToCartesian(x, y, r, endAngle %= 360);
    large = Math.abs(endAngle - startAngle) >= 180;
    alter = endAngle > startAngle;
    return "" + (continueLine ? 'L' : 'M') + start.x + "," + start.y + " A" + r + "," + r + ", 0 " + (large ? 1 : 0) + ", " + (alter ? 1 : 0) + ", " + end.x + ", " + end.y;
  };

  describeSector = function(x, y, r, r2, startAngle, endAngle) {
    return (describeArc(x, y, r, startAngle, endAngle)) + " " + (describeArc(x, y, r2, endAngle, startAngle, true)) + "Z";
  };

  animate = function(obj, index, start, end, duration, easing, fn, cb) {
    var ref;
    if ((ref = (obj.animation != null ? obj.animation : obj.animation = [])[index]) != null) {
      ref.stop();
    }
    return obj.animation[index] = Snap.animate(start, end, fn, duration, easing, cb);
  };

  GUI = (function() {
    function GUI(buttons) {
      this.paper = Snap(window.innerWidth, window.innerHeight);
      Snap.load(iconsPath, (function(_this) {
        return function(icons) {
          _this.nav = new RadialNav(_this.paper, buttons, icons);
          return _this._bindEvents();
        };
      })(this));
    }

    GUI.prototype._bindEvents = function() {
      return window.addEventListener('resize', (function(_this) {
        return function() {
          return _this.paper.attr({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
      })(this));
    };

    return GUI;

  })();

  RadialNav = (function() {
    function RadialNav(paper, buttons, icons) {
      this.area = paper.svg(0, 0, this.size = 500, this.size).addClass('radialnav');
      this.c = this.size / 2;
      this.r = this.size * .25;
      this.r2 = this.r * .35;
      this.angle = 360 / buttons.length;
      this.container = this.area.g();
      this.updateButtons(buttons, icons);
    }

    RadialNav.prototype._animateButtonHover = function(button, start, end, duration, easing, cb) {
      return animate(button, 1, start, end, duration, easing, ((function(_this) {
        return function(val) {
          return button[0].attr({
            d: describeSector(_this.c, _this.c, _this.r - val * 10, _this.r2, 0, _this.angle)
          });
        };
      })(this)), cb);
    };

    RadialNav.prototype._sector = function() {
      return this.area.path(describeSector(this.c, this.c, this.r, this.r2, 0, this.angle)).addClass('radialnav-sector');
    };

    RadialNav.prototype._icon = function(btn, icons) {
      var bbox, icon;
      icon = icons.select("#" + btn.icon).addClass('radialnav-icon');
      bbox = icon.getBBox();
      return icon.transform("T" + (this.c - bbox.x - bbox.width / 2) + ", " + (this.c - this.r + this.r2 - bbox.y - bbox.height / 2 - 5) + " R" + (this.angle / 2) + ", " + this.c + ", " + this.c + "S.7");
    };

    RadialNav.prototype._hint = function(btn) {
      var hint;
      hint = this.area.text(0, 0, btn.icon).addClass('radialnav-hint hide').attr({
        textpath: describeArc(this.c, this.c, this.r, 0, this.angle)
      });
      hint.select('*').attr({
        startOffset: '50%'
      });
      return hint;
    };

    RadialNav.prototype._button = function(btn, sector, icon, hint) {
      return this.area.g(sector, icon, hint).hover(function() {
        var el, j, len, ref, results;
        ref = [this[0], this[1], this[2]];
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          el = ref[j];
          results.push(el.toggleClass('active'));
        }
        return results;
      }).hover(this._buttonOver(this), this._buttonOut(this));
    };

    RadialNav.prototype._buttonOver = function(nav) {
      return function() {
        nav._animateButtonHover(this, 0, 1, 200, mina.easeinout);
        return this[2].removeClass('hide');
      };
    };

    RadialNav.prototype._buttonOut = function(nav) {
      return function() {
        return nav._animateButtonHover(this, 1, 0, 150, mina.elastic, (function() {
          return this.addClass('hide');
        }).bind(this[2]));
      };
    };

    RadialNav.prototype.updateButtons = function(buttons, icons) {
      var btn, button, i, j, len, results;
      this.container.clear();
      results = [];
      for (i = j = 0, len = buttons.length; j < len; i = ++j) {
        btn = buttons[i];
        button = this._button(btn, this._sector(), this._icon(btn, icons), this._hint(btn));
        button.transform("r" + (this.angle * i) + "," + this.c + "," + this.c);
        results.push(this.container.add(button));
      }
      return results;
    };

    return RadialNav;

  })();

  gui = new GUI([
    {
      icon: 'pin',
      action: function() {
        return console.log('Pinning...');
      }
    }, {
      icon: 'search',
      action: function() {
        return console.log('Opening Search...');
      }
    }, {
      icon: 'cloud',
      action: function() {
        return console.log('Connecting to Cloud...');
      }
    }, {
      icon: 'settings',
      action: function() {
        return console.log('Opening Settings...');
      }
    }, {
      icon: 'rewind',
      action: function() {
        return console.log('Rewinding...');
      }
    }, {
      icon: 'preview',
      action: function() {
        return console.log('Preview Activated...');
      }
    }, {
      icon: 'delete',
      action: function() {
        return console.log('Deleting...');
      }
    }
  ]);

}).call(this);
