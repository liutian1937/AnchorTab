/*
* AnchorTab (http://www.niumowang.org/js/anchortab/)
* Version : 1.0
* Author : pizi , ok8008@yeah.net
*/
(function() {
  var AnchorTab = function(params) {
    this.params = params || {};
    this.speed = this.params.speed || 50;
    this.follow = this.params.follow.replace('#', '');
    this.sectionArray = this.params.section.replace('#', '').split(" ");
    this.navArray = this.params.nav.replace('#', '').split(" ");

    this.sectionWrap = this.sectionArray[0] || 'section_wrap';
    this.section = this.sectionArray[1] || 'section';
    this.navWrap = this.navArray[0] || 'nav';
    this.navNode = this.navArray[1] || 'a';

    this.followTop = document.getElementById(this.follow).offsetTop;
    this.topArray = new Array();
    this.sec = document.getElementById(this.sectionWrap).getElementsByTagName(this.section);
    for (var i = 0; i < this.sec.length; i++) {
      this.top = this.sec[i].offsetTop;
      this.topArray.push(this.top);
    };
    this.nodes = document.getElementById(this.navWrap).getElementsByTagName(this.navNode);

    for (var j = 0; j < this.nodes.length; j++) {
      var _this = this; (function(i) {
        _this.nodes[j].onclick = function() {
          _this.bodyTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          _this.scrollFn(0, _this.bodyTop, _this.topArray[i] - _this.bodyTop, _this.speed);
          return false;
        }
      })(j)
    };

    this.init();
  };
  AnchorTab.prototype = {
    init: function() {
      var _this = this;
      if (window.addEventListener) {
        window.addEventListener("scroll",
        function() {
          _this.move.call(_this);
          if (_this.follow) {
            _this.followFn();
          }
        },
        false);
      } else {
        window.attachEvent("onscroll",
        function() {
          _this.move.call(_this);
          if (_this.follow) {
            _this.followFn();
          }
        });
      };
    },
    move: function() {
      var _this = this;
      _this.bodyTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      _this.nowIndex = _this.getIndex(_this.bodyTop);
      _this.navSelect(_this.nowIndex);
    },
    getIndex: function(top) {
      var _this = this;
      top += 20;
      for (i = 0; i < _this.sec.length; i++) {
        if (i == _this.sec.length - 1) {
          if (_this.topArray[i] <= top) return i;
        } else {
          if (_this.topArray[i] <= top && _this.topArray[i + 1] > top) {
            return i;
          }
        }
      };
    },
    navSelect: function(no) {
      var _this = this;
      for (var i = 0; i < _this.nodes.length; i++) {
        _this.reg = new RegExp('(\\s|^)selected(\\s|$)');
		_this.nodes[i].className = _this.nodes[i].className.replace(_this.reg, '');
      }
      _this.nodes[no].className += ' selected';
    },
    scrollFn: function(t, b, c, d) {
      var _this = this;
      clearTimeout(_this.timer);
      function _run() {
        if (t < d) {
          t++;
          _this.moTop = Math.ceil(c * t / d + b);
          window.scrollTo(0, _this.moTop);
          _this.timer = setTimeout(_run, 10)
        } else {
          window.scrollTo(0, c + b);
        }
      }
      _run();
    },
    followFn: function() {
      var _this = this;
      _this.nowFollowTop = document.getElementById('nav').offsetTop;
      if (_this.bodyTop >= _this.followTop) {
        if (!- [1, ] && !window.XMLHttpRequest) {
          clearTimeout(_this.timerS);
          document.getElementById('nav').style.display = 'none';
          _this.timerS = setTimeout(function() {
            document.getElementById('nav').style.display = 'block';
            document.getElementById('nav').style.top = _this.bodyTop + 'px';
          },
          200);
        }
      }
    }
  };
  window.AnchorTab = AnchorTab;
})();