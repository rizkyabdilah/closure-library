
/*
Copyright (C) 2012 Ansvia
*/

goog.provide("mt.ui.InputToken");

goog.require("goog.string");

goog.require("goog.dom");

goog.require("goog.ui.Component");

goog.require("goog.ui.Control");

goog.require("goog.dom.classes");

goog.require("goog.style");

goog.require("goog.events.EventType");

goog.require("goog.events");

goog.require("mt.ui.InputTokenRenderer");

mt.ui.InputToken = (function() {

  /*
    @constructor
  */

  function InputToken(elm, opt_domHelper) {
    this.opt_domHelper = opt_domHelper;
    goog.ui.Component.call(this, this.opt_domHelper);
    this.renderers_ = [];
    if (elm) {
      if (typeof elm === "string") elm = goog.dom.getElement(elm);
      this.decorateInternal(elm);
    }
  }

  goog.inherits(InputToken, goog.ui.Component);

  InputToken.prototype.decorate = function(elm) {
    if (typeof elm === "string") elm = goog.dom.getElement(elm);
    return this.decorateInternal(elm);
  };

  InputToken.prototype.decorateInternal = function(elm) {
    var clear, self;
    InputToken.superClass_.decorateInternal.call(this, elm);
    this.setElementInternal(elm);
    goog.dom.classes.add(elm, goog.getCssName("mt-input-token"));
    goog.style.setStyle(elm, {
      'min-height': '15px'
    });
    this.itemsWrappers_ = goog.dom.createElement("div");
    goog.dom.classes.add(this.itemsWrappers_, goog.getCssName("items"));
    goog.style.setStyle(this.itemsWrappers_, {
      "float": "left"
    });
    elm.appendChild(this.itemsWrappers_);
    this.inputElm_ = goog.dom.createElement("input");
    goog.style.setStyle(this.inputElm_, {
      "float": "left"
    });
    this.inputElm_.setAttribute("type", "text");
    elm.appendChild(this.inputElm_);
    self = this;
    goog.events.listen(this.inputElm_, goog.events.EventType.KEYUP, function(e) {
      console.log(e);
      if (e.keyCode === 13) {
        self.add(goog.string.trim(self.inputElm_.value));
        self.inputElm_.value = "";
        return self.inputElm_.focus();
      }
    });
    clear = goog.dom.createDom("div");
    goog.style.setStyle(clear, {
      "clear": "both"
    });
    return elm.appendChild(clear);
  };

  InputToken.prototype.add = function(text) {
    var celm, renderer, self;
    renderer = new mt.ui.InputTokenRenderer(text);
    celm = goog.dom.createElement("div");
    celm.innerHTML = text;
    goog.style.setStyle(celm, {
      "max-height": "17px",
      "overflow": "hidden"
    });
    renderer.decorateInternal(celm);
    this.itemsWrappers_.appendChild(celm);
    this.renderers_.push(renderer);
    self = this;
    goog.events.listen(celm, goog.events.EventType.CLICK, function(e) {
      return self.remove(e.target.innerHTML);
    });
  };

  InputToken.prototype.remove = function(text) {
    var i, renderer, _len, _ref;
    _ref = this.renderers_;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      renderer = _ref[i];
      if (renderer.text === text) {
        this.renderers_.splice(i, 1);
        renderer.dispose();
      }
    }
  };

  return InputToken;

})();