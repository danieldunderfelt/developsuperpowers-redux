/* */ 
"format cjs";
(function(process) {
  ;
  (function(window) {
    if (window.jQuery) {
      return;
    }
    var $ = function(selector, context) {
      return new $.fn.init(selector, context);
    };
    $.isWindow = function(obj) {
      return obj != null && obj == obj.window;
    };
    $.type = function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    };
    $.isArray = Array.isArray || function(obj) {
      return $.type(obj) === "array";
    };
    function isArraylike(obj) {
      var length = obj.length,
          type = $.type(obj);
      if (type === "function" || $.isWindow(obj)) {
        return false;
      }
      if (obj.nodeType === 1 && length) {
        return true;
      }
      return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    $.isPlainObject = function(obj) {
      var key;
      if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (e) {
        return false;
      }
      for (key in obj) {}
      return key === undefined || hasOwn.call(obj, key);
    };
    $.each = function(obj, callback, args) {
      var value,
          i = 0,
          length = obj.length,
          isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    };
    $.data = function(node, key, value) {
      if (value === undefined) {
        var id = node[$.expando],
            store = id && cache[id];
        if (key === undefined) {
          return store;
        } else if (store) {
          if (key in store) {
            return store[key];
          }
        }
      } else if (key !== undefined) {
        var id = node[$.expando] || (node[$.expando] = ++$.uuid);
        cache[id] = cache[id] || {};
        cache[id][key] = value;
        return value;
      }
    };
    $.removeData = function(node, keys) {
      var id = node[$.expando],
          store = id && cache[id];
      if (store) {
        $.each(keys, function(_, key) {
          delete store[key];
        });
      }
    };
    $.extend = function() {
      var src,
          copyIsArray,
          copy,
          name,
          options,
          clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
      }
      if (typeof target !== "object" && $.type(target) !== "function") {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue;
            }
            if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && $.isArray(src) ? src : [];
              } else {
                clone = src && $.isPlainObject(src) ? src : {};
              }
              target[name] = $.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    };
    $.queue = function(elem, type, data) {
      function $makeArray(arr, results) {
        var ret = results || [];
        if (arr != null) {
          if (isArraylike(Object(arr))) {
            (function(first, second) {
              var len = +second.length,
                  j = 0,
                  i = first.length;
              while (j < len) {
                first[i++] = second[j++];
              }
              if (len !== len) {
                while (second[j] !== undefined) {
                  first[i++] = second[j++];
                }
              }
              first.length = i;
              return first;
            })(ret, typeof arr === "string" ? [arr] : arr);
          } else {
            [].push.call(ret, arr);
          }
        }
        return ret;
      }
      if (!elem) {
        return;
      }
      type = (type || "fx") + "queue";
      var q = $.data(elem, type);
      if (!data) {
        return q || [];
      }
      if (!q || $.isArray(data)) {
        q = $.data(elem, type, $makeArray(data));
      } else {
        q.push(data);
      }
      return q;
    };
    $.dequeue = function(elems, type) {
      $.each(elems.nodeType ? [elems] : elems, function(i, elem) {
        type = type || "fx";
        var queue = $.queue(elem, type),
            fn = queue.shift();
        if (fn === "inprogress") {
          fn = queue.shift();
        }
        if (fn) {
          if (type === "fx") {
            queue.unshift("inprogress");
          }
          fn.call(elem, function() {
            $.dequeue(elem, type);
          });
        }
      });
    };
    $.fn = $.prototype = {
      init: function(selector) {
        if (selector.nodeType) {
          this[0] = selector;
          return this;
        } else {
          throw new Error("Not a DOM node.");
        }
      },
      offset: function() {
        var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
          top: 0,
          left: 0
        };
        return {
          top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
          left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
        };
      },
      position: function() {
        function offsetParent() {
          var offsetParent = this.offsetParent || document;
          while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || document;
        }
        var elem = this[0],
            offsetParent = offsetParent.apply(elem),
            offset = this.offset(),
            parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {
              top: 0,
              left: 0
            } : $(offsetParent).offset();
        offset.top -= parseFloat(elem.style.marginTop) || 0;
        offset.left -= parseFloat(elem.style.marginLeft) || 0;
        if (offsetParent.style) {
          parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0;
          parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0;
        }
        return {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        };
      }
    };
    var cache = {};
    $.expando = "velocity" + (new Date().getTime());
    $.uuid = 0;
    var class2type = {},
        hasOwn = class2type.hasOwnProperty,
        toString = class2type.toString;
    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
      class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }
    $.fn.init.prototype = $.fn;
    window.Velocity = {Utilities: $};
  })(window);
  ;
  (function(factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      define(factory);
    } else {
      factory();
    }
  }(function() {
    return function(global, window, document, undefined) {
      var IE = (function() {
        if (document.documentMode) {
          return document.documentMode;
        } else {
          for (var i = 7; i > 4; i--) {
            var div = document.createElement("div");
            div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";
            if (div.getElementsByTagName("span").length) {
              div = null;
              return i;
            }
          }
        }
        return undefined;
      })();
      var rAFShim = (function() {
        var timeLast = 0;
        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          var timeCurrent = (new Date()).getTime(),
              timeDelta;
          timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
          timeLast = timeCurrent + timeDelta;
          return setTimeout(function() {
            callback(timeCurrent + timeDelta);
          }, timeDelta);
        };
      })();
      function compactSparseArray(array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result.push(value);
          }
        }
        return result;
      }
      function sanitizeElements(elements) {
        if (Type.isWrapped(elements)) {
          elements = [].slice.call(elements);
        } else if (Type.isNode(elements)) {
          elements = [elements];
        }
        return elements;
      }
      var Type = {
        isString: function(variable) {
          return (typeof variable === "string");
        },
        isArray: Array.isArray || function(variable) {
          return Object.prototype.toString.call(variable) === "[object Array]";
        },
        isFunction: function(variable) {
          return Object.prototype.toString.call(variable) === "[object Function]";
        },
        isNode: function(variable) {
          return variable && variable.nodeType;
        },
        isNodeList: function(variable) {
          return typeof variable === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
        },
        isWrapped: function(variable) {
          return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
        },
        isSVG: function(variable) {
          return window.SVGElement && (variable instanceof window.SVGElement);
        },
        isEmptyObject: function(variable) {
          for (var name in variable) {
            return false;
          }
          return true;
        }
      };
      var $,
          isJQuery = false;
      if (global.fn && global.fn.jquery) {
        $ = global;
        isJQuery = true;
      } else {
        $ = window.Velocity.Utilities;
      }
      if (IE <= 8 && !isJQuery) {
        throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
      } else if (IE <= 7) {
        jQuery.fn.velocity = jQuery.fn.animate;
        return;
      }
      var DURATION_DEFAULT = 400,
          EASING_DEFAULT = "swing";
      var Velocity = {
        State: {
          isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
          isAndroid: /Android/i.test(navigator.userAgent),
          isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
          isChrome: window.chrome,
          isFirefox: /Firefox/i.test(navigator.userAgent),
          prefixElement: document.createElement("div"),
          prefixMatches: {},
          scrollAnchor: null,
          scrollPropertyLeft: null,
          scrollPropertyTop: null,
          isTicking: false,
          calls: []
        },
        CSS: {},
        Utilities: $,
        Redirects: {},
        Easings: {},
        Promise: window.Promise,
        defaults: {
          queue: "",
          duration: DURATION_DEFAULT,
          easing: EASING_DEFAULT,
          begin: undefined,
          complete: undefined,
          progress: undefined,
          display: undefined,
          visibility: undefined,
          loop: false,
          delay: false,
          mobileHA: true,
          _cacheValues: true
        },
        init: function(element) {
          $.data(element, "velocity", {
            isSVG: Type.isSVG(element),
            isAnimating: false,
            computedStyle: null,
            tweensContainer: null,
            rootPropertyValueCache: {},
            transformCache: {}
          });
        },
        hook: null,
        mock: false,
        version: {
          major: 1,
          minor: 2,
          patch: 1
        },
        debug: false
      };
      if (window.pageYOffset !== undefined) {
        Velocity.State.scrollAnchor = window;
        Velocity.State.scrollPropertyLeft = "pageXOffset";
        Velocity.State.scrollPropertyTop = "pageYOffset";
      } else {
        Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
        Velocity.State.scrollPropertyLeft = "scrollLeft";
        Velocity.State.scrollPropertyTop = "scrollTop";
      }
      function Data(element) {
        var response = $.data(element, "velocity");
        return response === null ? undefined : response;
      }
      ;
      function generateStep(steps) {
        return function(p) {
          return Math.round(p * steps) * (1 / steps);
        };
      }
      function generateBezier(mX1, mY1, mX2, mY2) {
        var NEWTON_ITERATIONS = 4,
            NEWTON_MIN_SLOPE = 0.001,
            SUBDIVISION_PRECISION = 0.0000001,
            SUBDIVISION_MAX_ITERATIONS = 10,
            kSplineTableSize = 11,
            kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
            float32ArraySupported = "Float32Array" in window;
        if (arguments.length !== 4) {
          return false;
        }
        for (var i = 0; i < 4; ++i) {
          if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
            return false;
          }
        }
        mX1 = Math.min(mX1, 1);
        mX2 = Math.min(mX2, 1);
        mX1 = Math.max(mX1, 0);
        mX2 = Math.max(mX2, 0);
        var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
        function A(aA1, aA2) {
          return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }
        function B(aA1, aA2) {
          return 3.0 * aA2 - 6.0 * aA1;
        }
        function C(aA1) {
          return 3.0 * aA1;
        }
        function calcBezier(aT, aA1, aA2) {
          return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
        }
        function getSlope(aT, aA1, aA2) {
          return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }
        function newtonRaphsonIterate(aX, aGuessT) {
          for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0)
              return aGuessT;
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
          }
          return aGuessT;
        }
        function calcSampleValues() {
          for (var i = 0; i < kSplineTableSize; ++i) {
            mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
          }
        }
        function binarySubdivide(aX, aA, aB) {
          var currentX,
              currentT,
              i = 0;
          do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
              aB = currentT;
            } else {
              aA = currentT;
            }
          } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
          return currentT;
        }
        function getTForX(aX) {
          var intervalStart = 0.0,
              currentSample = 1,
              lastSample = kSplineTableSize - 1;
          for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;
          var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
              guessForT = intervalStart + dist * kSampleStepSize,
              initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT);
          } else if (initialSlope == 0.0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
          }
        }
        var _precomputed = false;
        function precompute() {
          _precomputed = true;
          if (mX1 != mY1 || mX2 != mY2)
            calcSampleValues();
        }
        var f = function(aX) {
          if (!_precomputed)
            precompute();
          if (mX1 === mY1 && mX2 === mY2)
            return aX;
          if (aX === 0)
            return 0;
          if (aX === 1)
            return 1;
          return calcBezier(getTForX(aX), mY1, mY2);
        };
        f.getControlPoints = function() {
          return [{
            x: mX1,
            y: mY1
          }, {
            x: mX2,
            y: mY2
          }];
        };
        var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
        f.toString = function() {
          return str;
        };
        return f;
      }
      var generateSpringRK4 = (function() {
        function springAccelerationForState(state) {
          return (-state.tension * state.x) - (state.friction * state.v);
        }
        function springEvaluateStateWithDerivative(initialState, dt, derivative) {
          var state = {
            x: initialState.x + derivative.dx * dt,
            v: initialState.v + derivative.dv * dt,
            tension: initialState.tension,
            friction: initialState.friction
          };
          return {
            dx: state.v,
            dv: springAccelerationForState(state)
          };
        }
        function springIntegrateState(state, dt) {
          var a = {
            dx: state.v,
            dv: springAccelerationForState(state)
          },
              b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
              c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
              d = springEvaluateStateWithDerivative(state, dt, c),
              dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
              dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);
          state.x = state.x + dxdt * dt;
          state.v = state.v + dvdt * dt;
          return state;
        }
        return function springRK4Factory(tension, friction, duration) {
          var initState = {
            x: -1,
            v: 0,
            tension: null,
            friction: null
          },
              path = [0],
              time_lapsed = 0,
              tolerance = 1 / 10000,
              DT = 16 / 1000,
              have_duration,
              dt,
              last_state;
          tension = parseFloat(tension) || 500;
          friction = parseFloat(friction) || 20;
          duration = duration || null;
          initState.tension = tension;
          initState.friction = friction;
          have_duration = duration !== null;
          if (have_duration) {
            time_lapsed = springRK4Factory(tension, friction);
            dt = time_lapsed / duration * DT;
          } else {
            dt = DT;
          }
          while (true) {
            last_state = springIntegrateState(last_state || initState, dt);
            path.push(1 + last_state.x);
            time_lapsed += 16;
            if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
              break;
            }
          }
          return !have_duration ? time_lapsed : function(percentComplete) {
            return path[(percentComplete * (path.length - 1)) | 0];
          };
        };
      }());
      Velocity.Easings = {
        linear: function(p) {
          return p;
        },
        swing: function(p) {
          return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        spring: function(p) {
          return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
        }
      };
      $.each([["ease", [0.25, 0.1, 0.25, 1.0]], ["ease-in", [0.42, 0.0, 1.00, 1.0]], ["ease-out", [0.00, 0.0, 0.58, 1.0]], ["ease-in-out", [0.42, 0.0, 0.58, 1.0]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function(i, easingArray) {
        Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
      });
      function getEasing(value, duration) {
        var easing = value;
        if (Type.isString(value)) {
          if (!Velocity.Easings[value]) {
            easing = false;
          }
        } else if (Type.isArray(value) && value.length === 1) {
          easing = generateStep.apply(null, value);
        } else if (Type.isArray(value) && value.length === 2) {
          easing = generateSpringRK4.apply(null, value.concat([duration]));
        } else if (Type.isArray(value) && value.length === 4) {
          easing = generateBezier.apply(null, value);
        } else {
          easing = false;
        }
        if (easing === false) {
          if (Velocity.Easings[Velocity.defaults.easing]) {
            easing = Velocity.defaults.easing;
          } else {
            easing = EASING_DEFAULT;
          }
        }
        return easing;
      }
      var CSS = Velocity.CSS = {
        RegEx: {
          isHex: /^#([A-f\d]{3}){1,2}$/i,
          valueUnwrap: /^[A-z]+\((.*)\)$/i,
          wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
          valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
        },
        Lists: {
          colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
          transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
          transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
        },
        Hooks: {
          templates: {
            "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
            "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
            "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
            "backgroundPosition": ["X Y", "0% 0%"],
            "transformOrigin": ["X Y Z", "50% 50% 0px"],
            "perspectiveOrigin": ["X Y", "50% 50%"]
          },
          registered: {},
          register: function() {
            for (var i = 0; i < CSS.Lists.colors.length; i++) {
              var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
              CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
            }
            var rootProperty,
                hookTemplate,
                hookNames;
            if (IE) {
              for (rootProperty in CSS.Hooks.templates) {
                hookTemplate = CSS.Hooks.templates[rootProperty];
                hookNames = hookTemplate[0].split(" ");
                var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);
                if (hookNames[0] === "Color") {
                  hookNames.push(hookNames.shift());
                  defaultValues.push(defaultValues.shift());
                  CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
                }
              }
            }
            for (rootProperty in CSS.Hooks.templates) {
              hookTemplate = CSS.Hooks.templates[rootProperty];
              hookNames = hookTemplate[0].split(" ");
              for (var i in hookNames) {
                var fullHookName = rootProperty + hookNames[i],
                    hookPosition = i;
                CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
              }
            }
          },
          getRoot: function(property) {
            var hookData = CSS.Hooks.registered[property];
            if (hookData) {
              return hookData[0];
            } else {
              return property;
            }
          },
          cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
            if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
              rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
            }
            if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
              rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
            }
            return rootPropertyValue;
          },
          extractValue: function(fullHookName, rootPropertyValue) {
            var hookData = CSS.Hooks.registered[fullHookName];
            if (hookData) {
              var hookRoot = hookData[0],
                  hookPosition = hookData[1];
              rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
              return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
            } else {
              return rootPropertyValue;
            }
          },
          injectValue: function(fullHookName, hookValue, rootPropertyValue) {
            var hookData = CSS.Hooks.registered[fullHookName];
            if (hookData) {
              var hookRoot = hookData[0],
                  hookPosition = hookData[1],
                  rootPropertyValueParts,
                  rootPropertyValueUpdated;
              rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
              rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
              rootPropertyValueParts[hookPosition] = hookValue;
              rootPropertyValueUpdated = rootPropertyValueParts.join(" ");
              return rootPropertyValueUpdated;
            } else {
              return rootPropertyValue;
            }
          }
        },
        Normalizations: {
          registered: {
            clip: function(type, element, propertyValue) {
              switch (type) {
                case "name":
                  return "clip";
                case "extract":
                  var extracted;
                  if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                    extracted = propertyValue;
                  } else {
                    extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);
                    extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                  }
                  return extracted;
                case "inject":
                  return "rect(" + propertyValue + ")";
              }
            },
            blur: function(type, element, propertyValue) {
              switch (type) {
                case "name":
                  return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
                case "extract":
                  var extracted = parseFloat(propertyValue);
                  if (!(extracted || extracted === 0)) {
                    var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                    if (blurComponent) {
                      extracted = blurComponent[1];
                    } else {
                      extracted = 0;
                    }
                  }
                  return extracted;
                case "inject":
                  if (!parseFloat(propertyValue)) {
                    return "none";
                  } else {
                    return "blur(" + propertyValue + ")";
                  }
              }
            },
            opacity: function(type, element, propertyValue) {
              if (IE <= 8) {
                switch (type) {
                  case "name":
                    return "filter";
                  case "extract":
                    var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);
                    if (extracted) {
                      propertyValue = extracted[1] / 100;
                    } else {
                      propertyValue = 1;
                    }
                    return propertyValue;
                  case "inject":
                    element.style.zoom = 1;
                    if (parseFloat(propertyValue) >= 1) {
                      return "";
                    } else {
                      return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                    }
                }
              } else {
                switch (type) {
                  case "name":
                    return "opacity";
                  case "extract":
                    return propertyValue;
                  case "inject":
                    return propertyValue;
                }
              }
            }
          },
          register: function() {
            if (!(IE <= 9) && !Velocity.State.isGingerbread) {
              CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
            }
            for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
              (function() {
                var transformName = CSS.Lists.transformsBase[i];
                CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
                  switch (type) {
                    case "name":
                      return "transform";
                    case "extract":
                      if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                        return /^scale/i.test(transformName) ? 1 : 0;
                      } else {
                        return Data(element).transformCache[transformName].replace(/[()]/g, "");
                      }
                    case "inject":
                      var invalid = false;
                      switch (transformName.substr(0, transformName.length - 1)) {
                        case "translate":
                          invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                          break;
                        case "scal":
                        case "scale":
                          if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                            propertyValue = 1;
                          }
                          invalid = !/(\d)$/i.test(propertyValue);
                          break;
                        case "skew":
                          invalid = !/(deg|\d)$/i.test(propertyValue);
                          break;
                        case "rotate":
                          invalid = !/(deg|\d)$/i.test(propertyValue);
                          break;
                      }
                      if (!invalid) {
                        Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                      }
                      return Data(element).transformCache[transformName];
                  }
                };
              })();
            }
            for (var i = 0; i < CSS.Lists.colors.length; i++) {
              (function() {
                var colorName = CSS.Lists.colors[i];
                CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                  switch (type) {
                    case "name":
                      return colorName;
                    case "extract":
                      var extracted;
                      if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                        extracted = propertyValue;
                      } else {
                        var converted,
                            colorNames = {
                              black: "rgb(0, 0, 0)",
                              blue: "rgb(0, 0, 255)",
                              gray: "rgb(128, 128, 128)",
                              green: "rgb(0, 128, 0)",
                              red: "rgb(255, 0, 0)",
                              white: "rgb(255, 255, 255)"
                            };
                        if (/^[A-z]+$/i.test(propertyValue)) {
                          if (colorNames[propertyValue] !== undefined) {
                            converted = colorNames[propertyValue];
                          } else {
                            converted = colorNames.black;
                          }
                        } else if (CSS.RegEx.isHex.test(propertyValue)) {
                          converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                        } else if (!(/^rgba?\(/i.test(propertyValue))) {
                          converted = colorNames.black;
                        }
                        extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                      }
                      if (!(IE <= 8) && extracted.split(" ").length === 3) {
                        extracted += " 1";
                      }
                      return extracted;
                    case "inject":
                      if (IE <= 8) {
                        if (propertyValue.split(" ").length === 4) {
                          propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                        }
                      } else if (propertyValue.split(" ").length === 3) {
                        propertyValue += " 1";
                      }
                      return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                  }
                };
              })();
            }
          }
        },
        Names: {
          camelCase: function(property) {
            return property.replace(/-(\w)/g, function(match, subMatch) {
              return subMatch.toUpperCase();
            });
          },
          SVGAttribute: function(property) {
            var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
            if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
              SVGAttributes += "|transform";
            }
            return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
          },
          prefixCheck: function(property) {
            if (Velocity.State.prefixMatches[property]) {
              return [Velocity.State.prefixMatches[property], true];
            } else {
              var vendors = ["", "Webkit", "Moz", "ms", "O"];
              for (var i = 0,
                  vendorsLength = vendors.length; i < vendorsLength; i++) {
                var propertyPrefixed;
                if (i === 0) {
                  propertyPrefixed = property;
                } else {
                  propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) {
                    return match.toUpperCase();
                  });
                }
                if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                  Velocity.State.prefixMatches[property] = propertyPrefixed;
                  return [propertyPrefixed, true];
                }
              }
              return [property, false];
            }
          }
        },
        Values: {
          hexToRgb: function(hex) {
            var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                rgbParts;
            hex = hex.replace(shortformRegex, function(m, r, g, b) {
              return r + r + g + g + b + b;
            });
            rgbParts = longformRegex.exec(hex);
            return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
          },
          isCSSNullValue: function(value) {
            return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
          },
          getUnitType: function(property) {
            if (/^(rotate|skew)/i.test(property)) {
              return "deg";
            } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
              return "";
            } else {
              return "px";
            }
          },
          getDisplayType: function(element) {
            var tagName = element && element.tagName.toString().toLowerCase();
            if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
              return "inline";
            } else if (/^(li)$/i.test(tagName)) {
              return "list-item";
            } else if (/^(tr)$/i.test(tagName)) {
              return "table-row";
            } else if (/^(table)$/i.test(tagName)) {
              return "table";
            } else if (/^(tbody)$/i.test(tagName)) {
              return "table-row-group";
            } else {
              return "block";
            }
          },
          addClass: function(element, className) {
            if (element.classList) {
              element.classList.add(className);
            } else {
              element.className += (element.className.length ? " " : "") + className;
            }
          },
          removeClass: function(element, className) {
            if (element.classList) {
              element.classList.remove(className);
            } else {
              element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
            }
          }
        },
        getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
          function computePropertyValue(element, property) {
            var computedValue = 0;
            if (IE <= 8) {
              computedValue = $.css(element, property);
            } else {
              var toggleDisplay = false;
              if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                toggleDisplay = true;
                CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
              }
              function revertDisplay() {
                if (toggleDisplay) {
                  CSS.setPropertyValue(element, "display", "none");
                }
              }
              if (!forceStyleLookup) {
                if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                  var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                  revertDisplay();
                  return contentBoxHeight;
                } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                  var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                  revertDisplay();
                  return contentBoxWidth;
                }
              }
              var computedStyle;
              if (Data(element) === undefined) {
                computedStyle = window.getComputedStyle(element, null);
              } else if (!Data(element).computedStyle) {
                computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null);
              } else {
                computedStyle = Data(element).computedStyle;
              }
              if (property === "borderColor") {
                property = "borderTopColor";
              }
              if (IE === 9 && property === "filter") {
                computedValue = computedStyle.getPropertyValue(property);
              } else {
                computedValue = computedStyle[property];
              }
              if (computedValue === "" || computedValue === null) {
                computedValue = element.style[property];
              }
              revertDisplay();
            }
            if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
              var position = computePropertyValue(element, "position");
              if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
                computedValue = $(element).position()[property] + "px";
              }
            }
            return computedValue;
          }
          var propertyValue;
          if (CSS.Hooks.registered[property]) {
            var hook = property,
                hookRoot = CSS.Hooks.getRoot(hook);
            if (rootPropertyValue === undefined) {
              rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]);
            }
            if (CSS.Normalizations.registered[hookRoot]) {
              rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
            }
            propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);
          } else if (CSS.Normalizations.registered[property]) {
            var normalizedPropertyName,
                normalizedPropertyValue;
            normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);
            if (normalizedPropertyName !== "transform") {
              normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]);
              if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                normalizedPropertyValue = CSS.Hooks.templates[property][1];
              }
            }
            propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
          }
          if (!/^[\d-]/.test(propertyValue)) {
            if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
              if (/^(height|width)$/i.test(property)) {
                try {
                  propertyValue = element.getBBox()[property];
                } catch (error) {
                  propertyValue = 0;
                }
              } else {
                propertyValue = element.getAttribute(property);
              }
            } else {
              propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]);
            }
          }
          if (CSS.Values.isCSSNullValue(propertyValue)) {
            propertyValue = 0;
          }
          if (Velocity.debug >= 2)
            console.log("Get " + property + ": " + propertyValue);
          return propertyValue;
        },
        setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
          var propertyName = property;
          if (property === "scroll") {
            if (scrollData.container) {
              scrollData.container["scroll" + scrollData.direction] = propertyValue;
            } else {
              if (scrollData.direction === "Left") {
                window.scrollTo(propertyValue, scrollData.alternateValue);
              } else {
                window.scrollTo(scrollData.alternateValue, propertyValue);
              }
            }
          } else {
            if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
              CSS.Normalizations.registered[property]("inject", element, propertyValue);
              propertyName = "transform";
              propertyValue = Data(element).transformCache[property];
            } else {
              if (CSS.Hooks.registered[property]) {
                var hookName = property,
                    hookRoot = CSS.Hooks.getRoot(property);
                rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot);
                propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                property = hookRoot;
              }
              if (CSS.Normalizations.registered[property]) {
                propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                property = CSS.Normalizations.registered[property]("name", element);
              }
              propertyName = CSS.Names.prefixCheck(property)[0];
              if (IE <= 8) {
                try {
                  element.style[propertyName] = propertyValue;
                } catch (error) {
                  if (Velocity.debug)
                    console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
                }
              } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                element.setAttribute(property, propertyValue);
              } else {
                element.style[propertyName] = propertyValue;
              }
              if (Velocity.debug >= 2)
                console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
            }
          }
          return [propertyName, propertyValue];
        },
        flushTransformCache: function(element) {
          var transformString = "";
          if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
            function getTransformFloat(transformProperty) {
              return parseFloat(CSS.getPropertyValue(element, transformProperty));
            }
            var SVGTransforms = {
              translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
              skewX: [getTransformFloat("skewX")],
              skewY: [getTransformFloat("skewY")],
              scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
              rotate: [getTransformFloat("rotateZ"), 0, 0]
            };
            $.each(Data(element).transformCache, function(transformName) {
              if (/^translate/i.test(transformName)) {
                transformName = "translate";
              } else if (/^scale/i.test(transformName)) {
                transformName = "scale";
              } else if (/^rotate/i.test(transformName)) {
                transformName = "rotate";
              }
              if (SVGTransforms[transformName]) {
                transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";
                delete SVGTransforms[transformName];
              }
            });
          } else {
            var transformValue,
                perspective;
            $.each(Data(element).transformCache, function(transformName) {
              transformValue = Data(element).transformCache[transformName];
              if (transformName === "transformPerspective") {
                perspective = transformValue;
                return true;
              }
              if (IE === 9 && transformName === "rotateZ") {
                transformName = "rotate";
              }
              transformString += transformName + transformValue + " ";
            });
            if (perspective) {
              transformString = "perspective" + perspective + " " + transformString;
            }
          }
          CSS.setPropertyValue(element, "transform", transformString);
        }
      };
      CSS.Hooks.register();
      CSS.Normalizations.register();
      Velocity.hook = function(elements, arg2, arg3) {
        var value = undefined;
        elements = sanitizeElements(elements);
        $.each(elements, function(i, element) {
          if (Data(element) === undefined) {
            Velocity.init(element);
          }
          if (arg3 === undefined) {
            if (value === undefined) {
              value = Velocity.CSS.getPropertyValue(element, arg2);
            }
          } else {
            var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);
            if (adjustedSet[0] === "transform") {
              Velocity.CSS.flushTransformCache(element);
            }
            value = adjustedSet;
          }
        });
        return value;
      };
      var animate = function() {
        function getChain() {
          if (isUtility) {
            return promiseData.promise || null;
          } else {
            return elementsWrapped;
          }
        }
        var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
            isUtility,
            elementsWrapped,
            argumentIndex;
        var elements,
            propertiesMap,
            options;
        if (Type.isWrapped(this)) {
          isUtility = false;
          argumentIndex = 0;
          elements = this;
          elementsWrapped = this;
        } else {
          isUtility = true;
          argumentIndex = 1;
          elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
        }
        elements = sanitizeElements(elements);
        if (!elements) {
          return;
        }
        if (syntacticSugar) {
          propertiesMap = arguments[0].properties || arguments[0].p;
          options = arguments[0].options || arguments[0].o;
        } else {
          propertiesMap = arguments[argumentIndex];
          options = arguments[argumentIndex + 1];
        }
        var elementsLength = elements.length,
            elementsIndex = 0;
        if (!/^(stop|finish)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
          var startingArgumentPosition = argumentIndex + 1;
          options = {};
          for (var i = startingArgumentPosition; i < arguments.length; i++) {
            if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
              options.duration = arguments[i];
            } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
              options.easing = arguments[i];
            } else if (Type.isFunction(arguments[i])) {
              options.complete = arguments[i];
            }
          }
        }
        var promiseData = {
          promise: null,
          resolver: null,
          rejecter: null
        };
        if (isUtility && Velocity.Promise) {
          promiseData.promise = new Velocity.Promise(function(resolve, reject) {
            promiseData.resolver = resolve;
            promiseData.rejecter = reject;
          });
        }
        var action;
        switch (propertiesMap) {
          case "scroll":
            action = "scroll";
            break;
          case "reverse":
            action = "reverse";
            break;
          case "finish":
          case "stop":
            $.each(elements, function(i, element) {
              if (Data(element) && Data(element).delayTimer) {
                clearTimeout(Data(element).delayTimer.setTimeout);
                if (Data(element).delayTimer.next) {
                  Data(element).delayTimer.next();
                }
                delete Data(element).delayTimer;
              }
            });
            var callsToStop = [];
            $.each(Velocity.State.calls, function(i, activeCall) {
              if (activeCall) {
                $.each(activeCall[1], function(k, activeElement) {
                  var queueName = (options === undefined) ? "" : options;
                  if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                    return true;
                  }
                  $.each(elements, function(l, element) {
                    if (element === activeElement) {
                      if (options === true || Type.isString(options)) {
                        $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                          if (Type.isFunction(item)) {
                            item(null, true);
                          }
                        });
                        $.queue(element, Type.isString(options) ? options : "", []);
                      }
                      if (propertiesMap === "stop") {
                        if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                          $.each(Data(element).tweensContainer, function(m, activeTween) {
                            activeTween.endValue = activeTween.currentValue;
                          });
                        }
                        callsToStop.push(i);
                      } else if (propertiesMap === "finish") {
                        activeCall[2].duration = 1;
                      }
                    }
                  });
                });
              }
            });
            if (propertiesMap === "stop") {
              $.each(callsToStop, function(i, j) {
                completeCall(j, true);
              });
              if (promiseData.promise) {
                promiseData.resolver(elements);
              }
            }
            return getChain();
          default:
            if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
              action = "start";
            } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
              var opts = $.extend({}, options),
                  durationOriginal = opts.duration,
                  delayOriginal = opts.delay || 0;
              if (opts.backwards === true) {
                elements = $.extend(true, [], elements).reverse();
              }
              $.each(elements, function(elementIndex, element) {
                if (parseFloat(opts.stagger)) {
                  opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
                } else if (Type.isFunction(opts.stagger)) {
                  opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
                }
                if (opts.drag) {
                  opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);
                  opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
                }
                Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
              });
              return getChain();
            } else {
              var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";
              if (promiseData.promise) {
                promiseData.rejecter(new Error(abortError));
              } else {
                console.log(abortError);
              }
              return getChain();
            }
        }
        var callUnitConversionData = {
          lastParent: null,
          lastPosition: null,
          lastFontSize: null,
          lastPercentToPxWidth: null,
          lastPercentToPxHeight: null,
          lastEmToPx: null,
          remToPx: null,
          vwToPx: null,
          vhToPx: null
        };
        var call = [];
        function processElement() {
          var element = this,
              opts = $.extend({}, Velocity.defaults, options),
              tweensContainer = {},
              elementUnitConversionData;
          if (Data(element) === undefined) {
            Velocity.init(element);
          }
          if (parseFloat(opts.delay) && opts.queue !== false) {
            $.queue(element, opts.queue, function(next) {
              Velocity.velocityQueueEntryFlag = true;
              Data(element).delayTimer = {
                setTimeout: setTimeout(next, parseFloat(opts.delay)),
                next: next
              };
            });
          }
          switch (opts.duration.toString().toLowerCase()) {
            case "fast":
              opts.duration = 200;
              break;
            case "normal":
              opts.duration = DURATION_DEFAULT;
              break;
            case "slow":
              opts.duration = 600;
              break;
            default:
              opts.duration = parseFloat(opts.duration) || 1;
          }
          if (Velocity.mock !== false) {
            if (Velocity.mock === true) {
              opts.duration = opts.delay = 1;
            } else {
              opts.duration *= parseFloat(Velocity.mock) || 1;
              opts.delay *= parseFloat(Velocity.mock) || 1;
            }
          }
          opts.easing = getEasing(opts.easing, opts.duration);
          if (opts.begin && !Type.isFunction(opts.begin)) {
            opts.begin = null;
          }
          if (opts.progress && !Type.isFunction(opts.progress)) {
            opts.progress = null;
          }
          if (opts.complete && !Type.isFunction(opts.complete)) {
            opts.complete = null;
          }
          if (opts.display !== undefined && opts.display !== null) {
            opts.display = opts.display.toString().toLowerCase();
            if (opts.display === "auto") {
              opts.display = Velocity.CSS.Values.getDisplayType(element);
            }
          }
          if (opts.visibility !== undefined && opts.visibility !== null) {
            opts.visibility = opts.visibility.toString().toLowerCase();
          }
          opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);
          function buildQueue(next) {
            if (opts.begin && elementsIndex === 0) {
              try {
                opts.begin.call(elements, elements);
              } catch (error) {
                setTimeout(function() {
                  throw error;
                }, 1);
              }
            }
            if (action === "scroll") {
              var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                  scrollOffset = parseFloat(opts.offset) || 0,
                  scrollPositionCurrent,
                  scrollPositionCurrentAlternate,
                  scrollPositionEnd;
              if (opts.container) {
                if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                  opts.container = opts.container[0] || opts.container;
                  scrollPositionCurrent = opts.container["scroll" + scrollDirection];
                  scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset;
                } else {
                  opts.container = null;
                }
              } else {
                scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]];
                scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]];
                scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset;
              }
              tweensContainer = {
                scroll: {
                  rootPropertyValue: false,
                  startValue: scrollPositionCurrent,
                  currentValue: scrollPositionCurrent,
                  endValue: scrollPositionEnd,
                  unitType: "",
                  easing: opts.easing,
                  scrollData: {
                    container: opts.container,
                    direction: scrollDirection,
                    alternateValue: scrollPositionCurrentAlternate
                  }
                },
                element: element
              };
              if (Velocity.debug)
                console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
            } else if (action === "reverse") {
              if (!Data(element).tweensContainer) {
                $.dequeue(element, opts.queue);
                return;
              } else {
                if (Data(element).opts.display === "none") {
                  Data(element).opts.display = "auto";
                }
                if (Data(element).opts.visibility === "hidden") {
                  Data(element).opts.visibility = "visible";
                }
                Data(element).opts.loop = false;
                Data(element).opts.begin = null;
                Data(element).opts.complete = null;
                if (!options.easing) {
                  delete opts.easing;
                }
                if (!options.duration) {
                  delete opts.duration;
                }
                opts = $.extend({}, Data(element).opts, opts);
                var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);
                for (var lastTween in lastTweensContainer) {
                  if (lastTween !== "element") {
                    var lastStartValue = lastTweensContainer[lastTween].startValue;
                    lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                    lastTweensContainer[lastTween].endValue = lastStartValue;
                    if (!Type.isEmptyObject(options)) {
                      lastTweensContainer[lastTween].easing = opts.easing;
                    }
                    if (Velocity.debug)
                      console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                  }
                }
                tweensContainer = lastTweensContainer;
              }
            } else if (action === "start") {
              var lastTweensContainer;
              if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                lastTweensContainer = Data(element).tweensContainer;
              }
              function parsePropertyValue(valueData, skipResolvingEasing) {
                var endValue = undefined,
                    easing = undefined,
                    startValue = undefined;
                if (Type.isArray(valueData)) {
                  endValue = valueData[0];
                  if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                    startValue = valueData[1];
                  } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                    easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);
                    if (valueData[2] !== undefined) {
                      startValue = valueData[2];
                    }
                  }
                } else {
                  endValue = valueData;
                }
                if (!skipResolvingEasing) {
                  easing = easing || opts.easing;
                }
                if (Type.isFunction(endValue)) {
                  endValue = endValue.call(element, elementsIndex, elementsLength);
                }
                if (Type.isFunction(startValue)) {
                  startValue = startValue.call(element, elementsIndex, elementsLength);
                }
                return [endValue || 0, easing, startValue];
              }
              $.each(propertiesMap, function(property, value) {
                if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
                  var valueData = parsePropertyValue(value, true),
                      endValue = valueData[0],
                      easing = valueData[1],
                      startValue = valueData[2];
                  if (CSS.RegEx.isHex.test(endValue)) {
                    var colorComponents = ["Red", "Green", "Blue"],
                        endValueRGB = CSS.Values.hexToRgb(endValue),
                        startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;
                    for (var i = 0; i < colorComponents.length; i++) {
                      var dataArray = [endValueRGB[i]];
                      if (easing) {
                        dataArray.push(easing);
                      }
                      if (startValueRGB !== undefined) {
                        dataArray.push(startValueRGB[i]);
                      }
                      propertiesMap[property + colorComponents[i]] = dataArray;
                    }
                    delete propertiesMap[property];
                  }
                }
              });
              for (var property in propertiesMap) {
                var valueData = parsePropertyValue(propertiesMap[property]),
                    endValue = valueData[0],
                    easing = valueData[1],
                    startValue = valueData[2];
                property = CSS.Names.camelCase(property);
                var rootProperty = CSS.Hooks.getRoot(property),
                    rootPropertyValue = false;
                if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                  if (Velocity.debug)
                    console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
                  continue;
                }
                if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                  startValue = 0;
                }
                if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                  if (startValue === undefined) {
                    startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                  }
                  rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                } else {
                  if (CSS.Hooks.registered[property]) {
                    if (startValue === undefined) {
                      rootPropertyValue = CSS.getPropertyValue(element, rootProperty);
                      startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                    } else {
                      rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                    }
                  } else if (startValue === undefined) {
                    startValue = CSS.getPropertyValue(element, property);
                  }
                }
                var separatedValue,
                    endValueUnitType,
                    startValueUnitType,
                    operator = false;
                function separateValue(property, value) {
                  var unitType,
                      numericValue;
                  numericValue = (value || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(match) {
                    unitType = match;
                    return "";
                  });
                  if (!unitType) {
                    unitType = CSS.Values.getUnitType(property);
                  }
                  return [numericValue, unitType];
                }
                separatedValue = separateValue(property, startValue);
                startValue = separatedValue[0];
                startValueUnitType = separatedValue[1];
                separatedValue = separateValue(property, endValue);
                endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                  operator = subMatch;
                  return "";
                });
                endValueUnitType = separatedValue[1];
                startValue = parseFloat(startValue) || 0;
                endValue = parseFloat(endValue) || 0;
                if (endValueUnitType === "%") {
                  if (/^(fontSize|lineHeight)$/.test(property)) {
                    endValue = endValue / 100;
                    endValueUnitType = "em";
                  } else if (/^scale/.test(property)) {
                    endValue = endValue / 100;
                    endValueUnitType = "";
                  } else if (/(Red|Green|Blue)$/i.test(property)) {
                    endValue = (endValue / 100) * 255;
                    endValueUnitType = "";
                  }
                }
                function calculateUnitRatios() {
                  var sameRatioIndicators = {
                    myParent: element.parentNode || document.body,
                    position: CSS.getPropertyValue(element, "position"),
                    fontSize: CSS.getPropertyValue(element, "fontSize")
                  },
                      samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                      sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);
                  callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                  callUnitConversionData.lastPosition = sameRatioIndicators.position;
                  callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;
                  var measurement = 100,
                      unitRatios = {};
                  if (!sameEmRatio || !samePercentRatio) {
                    var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");
                    Velocity.init(dummy);
                    sameRatioIndicators.myParent.appendChild(dummy);
                    $.each(["overflow", "overflowX", "overflowY"], function(i, property) {
                      Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                    });
                    Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                    Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                    Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");
                    $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(i, property) {
                      Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                    });
                    Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");
                    unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement;
                    unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement;
                    unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement;
                    sameRatioIndicators.myParent.removeChild(dummy);
                  } else {
                    unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                    unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                    unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                  }
                  if (callUnitConversionData.remToPx === null) {
                    callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16;
                  }
                  if (callUnitConversionData.vwToPx === null) {
                    callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100;
                    callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100;
                  }
                  unitRatios.remToPx = callUnitConversionData.remToPx;
                  unitRatios.vwToPx = callUnitConversionData.vwToPx;
                  unitRatios.vhToPx = callUnitConversionData.vhToPx;
                  if (Velocity.debug >= 1)
                    console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
                  return unitRatios;
                }
                if (/[\/*]/.test(operator)) {
                  endValueUnitType = startValueUnitType;
                } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                  if (endValue === 0) {
                    endValueUnitType = startValueUnitType;
                  } else {
                    elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();
                    var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";
                    switch (startValueUnitType) {
                      case "%":
                        startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                        break;
                      case "px":
                        break;
                      default:
                        startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                    }
                    switch (endValueUnitType) {
                      case "%":
                        startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                        break;
                      case "px":
                        break;
                      default:
                        startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                    }
                  }
                }
                switch (operator) {
                  case "+":
                    endValue = startValue + endValue;
                    break;
                  case "-":
                    endValue = startValue - endValue;
                    break;
                  case "*":
                    endValue = startValue * endValue;
                    break;
                  case "/":
                    endValue = startValue / endValue;
                    break;
                }
                tweensContainer[property] = {
                  rootPropertyValue: rootPropertyValue,
                  startValue: startValue,
                  currentValue: startValue,
                  endValue: endValue,
                  unitType: endValueUnitType,
                  easing: easing
                };
                if (Velocity.debug)
                  console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
              }
              tweensContainer.element = element;
            }
            if (tweensContainer.element) {
              CSS.Values.addClass(element, "velocity-animating");
              call.push(tweensContainer);
              if (opts.queue === "") {
                Data(element).tweensContainer = tweensContainer;
                Data(element).opts = opts;
              }
              Data(element).isAnimating = true;
              if (elementsIndex === elementsLength - 1) {
                Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);
                if (Velocity.State.isTicking === false) {
                  Velocity.State.isTicking = true;
                  tick();
                }
              } else {
                elementsIndex++;
              }
            }
          }
          if (opts.queue === false) {
            if (opts.delay) {
              setTimeout(buildQueue, opts.delay);
            } else {
              buildQueue();
            }
          } else {
            $.queue(element, opts.queue, function(next, clearQueue) {
              if (clearQueue === true) {
                if (promiseData.promise) {
                  promiseData.resolver(elements);
                }
                return true;
              }
              Velocity.velocityQueueEntryFlag = true;
              buildQueue(next);
            });
          }
          if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
            $.dequeue(element);
          }
        }
        $.each(elements, function(i, element) {
          if (Type.isNode(element)) {
            processElement.call(element);
          }
        });
        var opts = $.extend({}, Velocity.defaults, options),
            reverseCallsCount;
        opts.loop = parseInt(opts.loop);
        reverseCallsCount = (opts.loop * 2) - 1;
        if (opts.loop) {
          for (var x = 0; x < reverseCallsCount; x++) {
            var reverseOptions = {
              delay: opts.delay,
              progress: opts.progress
            };
            if (x === reverseCallsCount - 1) {
              reverseOptions.display = opts.display;
              reverseOptions.visibility = opts.visibility;
              reverseOptions.complete = opts.complete;
            }
            animate(elements, "reverse", reverseOptions);
          }
        }
        return getChain();
      };
      Velocity = $.extend(animate, Velocity);
      Velocity.animate = animate;
      var ticker = window.requestAnimationFrame || rAFShim;
      if (!Velocity.State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", function() {
          if (document.hidden) {
            ticker = function(callback) {
              return setTimeout(function() {
                callback(true);
              }, 16);
            };
            tick();
          } else {
            ticker = window.requestAnimationFrame || rAFShim;
          }
        });
      }
      function tick(timestamp) {
        if (timestamp) {
          var timeCurrent = (new Date).getTime();
          var callsLength = Velocity.State.calls.length;
          if (callsLength > 10000) {
            Velocity.State.calls = compactSparseArray(Velocity.State.calls);
          }
          for (var i = 0; i < callsLength; i++) {
            if (!Velocity.State.calls[i]) {
              continue;
            }
            var callContainer = Velocity.State.calls[i],
                call = callContainer[0],
                opts = callContainer[2],
                timeStart = callContainer[3],
                firstTick = !!timeStart,
                tweenDummyValue = null;
            if (!timeStart) {
              timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
            }
            var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);
            for (var j = 0,
                callLength = call.length; j < callLength; j++) {
              var tweensContainer = call[j],
                  element = tweensContainer.element;
              if (!Data(element)) {
                continue;
              }
              var transformPropertyExists = false;
              if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
                if (opts.display === "flex") {
                  var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                  $.each(flexValues, function(i, flexValue) {
                    CSS.setPropertyValue(element, "display", flexValue);
                  });
                }
                CSS.setPropertyValue(element, "display", opts.display);
              }
              if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                CSS.setPropertyValue(element, "visibility", opts.visibility);
              }
              for (var property in tweensContainer) {
                if (property !== "element") {
                  var tween = tweensContainer[property],
                      currentValue,
                      easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;
                  if (percentComplete === 1) {
                    currentValue = tween.endValue;
                  } else {
                    var tweenDelta = tween.endValue - tween.startValue;
                    currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));
                    if (!firstTick && (currentValue === tween.currentValue)) {
                      continue;
                    }
                  }
                  tween.currentValue = currentValue;
                  if (property === "tween") {
                    tweenDummyValue = currentValue;
                  } else {
                    if (CSS.Hooks.registered[property]) {
                      var hookRoot = CSS.Hooks.getRoot(property),
                          rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];
                      if (rootPropertyValueCache) {
                        tween.rootPropertyValue = rootPropertyValueCache;
                      }
                    }
                    var adjustedSetData = CSS.setPropertyValue(element, property, tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType), tween.rootPropertyValue, tween.scrollData);
                    if (CSS.Hooks.registered[property]) {
                      if (CSS.Normalizations.registered[hookRoot]) {
                        Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                      } else {
                        Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                      }
                    }
                    if (adjustedSetData[0] === "transform") {
                      transformPropertyExists = true;
                    }
                  }
                }
              }
              if (opts.mobileHA) {
                if (Data(element).transformCache.translate3d === undefined) {
                  Data(element).transformCache.translate3d = "(0px, 0px, 0px)";
                  transformPropertyExists = true;
                }
              }
              if (transformPropertyExists) {
                CSS.flushTransformCache(element);
              }
            }
            if (opts.display !== undefined && opts.display !== "none") {
              Velocity.State.calls[i][2].display = false;
            }
            if (opts.visibility !== undefined && opts.visibility !== "hidden") {
              Velocity.State.calls[i][2].visibility = false;
            }
            if (opts.progress) {
              opts.progress.call(callContainer[1], callContainer[1], percentComplete, Math.max(0, (timeStart + opts.duration) - timeCurrent), timeStart, tweenDummyValue);
            }
            if (percentComplete === 1) {
              completeCall(i);
            }
          }
        }
        if (Velocity.State.isTicking) {
          ticker(tick);
        }
      }
      function completeCall(callIndex, isStopped) {
        if (!Velocity.State.calls[callIndex]) {
          return false;
        }
        var call = Velocity.State.calls[callIndex][0],
            elements = Velocity.State.calls[callIndex][1],
            opts = Velocity.State.calls[callIndex][2],
            resolver = Velocity.State.calls[callIndex][4];
        var remainingCallsExist = false;
        for (var i = 0,
            callLength = call.length; i < callLength; i++) {
          var element = call[i].element;
          if (!isStopped && !opts.loop) {
            if (opts.display === "none") {
              CSS.setPropertyValue(element, "display", opts.display);
            }
            if (opts.visibility === "hidden") {
              CSS.setPropertyValue(element, "visibility", opts.visibility);
            }
          }
          if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
            if (Data(element)) {
              Data(element).isAnimating = false;
              Data(element).rootPropertyValueCache = {};
              var transformHAPropertyExists = false;
              $.each(CSS.Lists.transforms3D, function(i, transformName) {
                var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                    currentValue = Data(element).transformCache[transformName];
                if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                  transformHAPropertyExists = true;
                  delete Data(element).transformCache[transformName];
                }
              });
              if (opts.mobileHA) {
                transformHAPropertyExists = true;
                delete Data(element).transformCache.translate3d;
              }
              if (transformHAPropertyExists) {
                CSS.flushTransformCache(element);
              }
              CSS.Values.removeClass(element, "velocity-animating");
            }
          }
          if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
            try {
              opts.complete.call(elements, elements);
            } catch (error) {
              setTimeout(function() {
                throw error;
              }, 1);
            }
          }
          if (resolver && opts.loop !== true) {
            resolver(elements);
          }
          if (opts.loop === true && !isStopped) {
            $.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
              if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
                tweenContainer.endValue = 0;
                tweenContainer.startValue = 360;
              }
              if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
                tweenContainer.endValue = 0;
                tweenContainer.startValue = 100;
              }
            });
            Velocity(element, "reverse", {
              loop: true,
              delay: opts.delay
            });
          }
          if (opts.queue !== false) {
            $.dequeue(element, opts.queue);
          }
        }
        Velocity.State.calls[callIndex] = false;
        for (var j = 0,
            callsLength = Velocity.State.calls.length; j < callsLength; j++) {
          if (Velocity.State.calls[j] !== false) {
            remainingCallsExist = true;
            break;
          }
        }
        if (remainingCallsExist === false) {
          Velocity.State.isTicking = false;
          delete Velocity.State.calls;
          Velocity.State.calls = [];
        }
      }
      global.Velocity = Velocity;
      if (global !== window) {
        global.fn.velocity = animate;
        global.fn.velocity.defaults = Velocity.defaults;
      }
      $.each(["Down", "Up"], function(i, direction) {
        Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
          var opts = $.extend({}, options),
              begin = opts.begin,
              complete = opts.complete,
              computedValues = {
                height: "",
                marginTop: "",
                marginBottom: "",
                paddingTop: "",
                paddingBottom: ""
              },
              inlineValues = {};
          if (opts.display === undefined) {
            opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
          }
          opts.begin = function() {
            begin && begin.call(elements, elements);
            for (var property in computedValues) {
              inlineValues[property] = element.style[property];
              var propertyValue = Velocity.CSS.getPropertyValue(element, property);
              computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
            }
            inlineValues.overflow = element.style.overflow;
            element.style.overflow = "hidden";
          };
          opts.complete = function() {
            for (var property in inlineValues) {
              element.style[property] = inlineValues[property];
            }
            complete && complete.call(elements, elements);
            promiseData && promiseData.resolver(elements);
          };
          Velocity(element, computedValues, opts);
        };
      });
      $.each(["In", "Out"], function(i, direction) {
        Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
          var opts = $.extend({}, options),
              propertiesMap = {opacity: (direction === "In") ? 1 : 0},
              originalComplete = opts.complete;
          if (elementsIndex !== elementsSize - 1) {
            opts.complete = opts.begin = null;
          } else {
            opts.complete = function() {
              if (originalComplete) {
                originalComplete.call(elements, elements);
              }
              promiseData && promiseData.resolver(elements);
            };
          }
          if (opts.display === undefined) {
            opts.display = (direction === "In" ? "auto" : "none");
          }
          Velocity(this, propertiesMap, opts);
        };
      });
      return Velocity;
    }((window.jQuery || window.Zepto || window), window, document);
  }));
})(require("process"));
