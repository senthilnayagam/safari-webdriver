var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a;
      a in e.pathToNames || (e.pathToNames[a] = {});
      e.pathToNames[a][d] = true
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {});
      e.requires[a][b] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = true;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return typeof a != "undefined" && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;b >= 0;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = d == -1 ? c.length : d;
        if(c.substr(d - 7, 7) == "base.js") {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = true)
}, goog.writeScriptTag_ = function(a) {
  if(goog.inHtmlDocument_()) {
    goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>');
    return true
  }
  return false
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited)) {
        d.visited[e] = true;
        if(e in d.requires) {
          for(var g in d.requires[e]) {
            if(!goog.isProvided_(g)) {
              if(g in d.nameToPath) {
                a(d.nameToPath[g])
              }else {
                throw Error("Undefined nameToPath for " + g);
              }
            }
          }
        }
      }
      if(!(e in c)) {
        c[e] = true;
        b.push(e)
      }
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if(b == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if(c == "[object Window]") {
        return"object"
      }
      if(c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(b == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return a !== void 0
};
goog.isNull = function(a) {
  return a === null
};
goog.isDefAndNotNull = function(a) {
  return a != null
};
goog.isArray = function(a) {
  return goog.typeOf(a) == "array"
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return b == "array" || b == "object" && typeof a.length == "number"
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && typeof a.getFullYear == "function"
};
goog.isString = function(a) {
  return typeof a == "string"
};
goog.isBoolean = function(a) {
  return typeof a == "boolean"
};
goog.isNumber = function(a) {
  return typeof a == "number"
};
goog.isFunction = function(a) {
  return goog.typeOf(a) == "function"
};
goog.isObject = function(a) {
  var b = typeof a;
  return b == "object" && a != null || b == "function"
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if(b == "object" || b == "array") {
    if(a.clone) {
      return a.clone()
    }
    var b = b == "array" ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(arguments.length > 2) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global._et_ != "undefined") {
          delete goog.global._et_;
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = false;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = false, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = true
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b
};
goog.object.isImmutableView = function(a) {
  return!!Object.isFrozen && Object.isFrozen(a)
};
var bot = {ErrorCode:{SUCCESS:0, NO_SUCH_ELEMENT:7, NO_SUCH_FRAME:8, UNKNOWN_COMMAND:9, UNSUPPORTED_OPERATION:9, STALE_ELEMENT_REFERENCE:10, ELEMENT_NOT_VISIBLE:11, INVALID_ELEMENT_STATE:12, UNKNOWN_ERROR:13, ELEMENT_NOT_SELECTABLE:15, JAVASCRIPT_ERROR:17, XPATH_LOOKUP_ERROR:19, TIMEOUT:21, NO_SUCH_WINDOW:23, INVALID_COOKIE_DOMAIN:24, UNABLE_TO_SET_COOKIE:25, MODAL_DIALOG_OPENED:26, NO_MODAL_DIALOG_OPEN:27, SCRIPT_TIMEOUT:28, INVALID_ELEMENT_COORDINATES:29, IME_NOT_AVAILABLE:30, IME_ENGINE_ACTIVATION_FAILED:31, 
INVALID_SELECTOR_ERROR:32, SESSION_NOT_CREATED:33, MOVE_TARGET_OUT_OF_BOUNDS:34, SQL_DATABASE_ERROR:35}, Error:function(a, b) {
  this.code = a;
  this.message = b || "";
  this.name = bot.Error.NAMES_[a] || bot.Error.NAMES_[bot.ErrorCode.UNKNOWN_ERROR];
  var c = Error(this.message);
  c.name = this.name;
  this.stack = c.stack || ""
}};
goog.inherits(bot.Error, Error);
bot.Error.NAMES_ = goog.object.create(bot.ErrorCode.NO_SUCH_ELEMENT, "NoSuchElementError", bot.ErrorCode.NO_SUCH_FRAME, "NoSuchFrameError", bot.ErrorCode.UNKNOWN_COMMAND, "UnknownCommandError", bot.ErrorCode.STALE_ELEMENT_REFERENCE, "StaleElementReferenceError", bot.ErrorCode.ELEMENT_NOT_VISIBLE, "ElementNotVisibleError", bot.ErrorCode.INVALID_ELEMENT_STATE, "InvalidElementStateError", bot.ErrorCode.UNKNOWN_ERROR, "UnknownError", bot.ErrorCode.ELEMENT_NOT_SELECTABLE, "ElementNotSelectableError", 
bot.ErrorCode.XPATH_LOOKUP_ERROR, "XPathLookupError", bot.ErrorCode.NO_SUCH_WINDOW, "NoSuchWindowError", bot.ErrorCode.INVALID_COOKIE_DOMAIN, "InvalidCookieDomainError", bot.ErrorCode.UNABLE_TO_SET_COOKIE, "UnableToSetCookieError", bot.ErrorCode.MODAL_DIALOG_OPENED, "ModalDialogOpenedError", bot.ErrorCode.NO_MODAL_DIALOG_OPEN, "NoModalDialogOpenError", bot.ErrorCode.SCRIPT_TIMEOUT, "ScriptTimeoutError", bot.ErrorCode.INVALID_SELECTOR_ERROR, "InvalidSelectorError", bot.ErrorCode.SQL_DATABASE_ERROR, 
"SqlDatabaseError", bot.ErrorCode.MOVE_TARGET_OUT_OF_BOUNDS, "MoveTargetOutOfBoundsError");
bot.Error.prototype.isAutomationError = !0;
goog.DEBUG && (bot.Error.prototype.toString = function() {
  return this.name + ": " + this.message
});
bot.response = {};
bot.response.isResponseObject = function(a) {
  return goog.isObject(a) && goog.isNumber(a.status)
};
bot.response.createResponse = function(a) {
  return bot.response.isResponseObject(a) ? a : {status:bot.ErrorCode.SUCCESS, value:a}
};
bot.response.createErrorResponse = function(a) {
  return bot.response.isResponseObject(a) ? a : {status:a && goog.isNumber(a.code) ? a.code : bot.ErrorCode.UNKNOWN_ERROR, value:{message:(a && a.message || a) + ""}}
};
bot.response.checkResponse = function(a) {
  var b = a.status;
  if(b == bot.ErrorCode.SUCCESS) {
    return a
  }
  b = b || bot.ErrorCode.UNKNOWN_ERROR;
  a = a.value;
  if(!a || !goog.isObject(a)) {
    throw new bot.Error(b, a + "");
  }
  throw new bot.Error(b, a.message + "");
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", j = e[g] || "", i = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var l = i.exec(h) || ["", "", ""], m = k.exec(j) || ["", "", ""];
      if(0 == l[0].length && 0 == m[0].length) {
        break
      }
      var c = 0 == l[1].length ? 0 : parseInt(l[1], 10), n = 0 == m[1].length ? 0 : parseInt(m[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == l[2].length, 0 == m[2].length) || goog.string.compareElements_(l[2], m[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var j = g[h];
      b.call(c, j, h, a) && (e[f++] = j)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var j = f + g >> 1, i;
    i = c ? b.call(e, a[j], j, a) : b(d, a[j]);
    0 < i ? f = j + 1 : (g = j, h = !i)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  for(var c = c || goog.array.defaultCompare, d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e
  });
  return d
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.structs = {};
goog.structs.getCount = function(a) {
  return"function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
  if("function" == typeof a.getValues) {
    return a.getValues()
  }
  if(goog.isString(a)) {
    return a.split("")
  }
  if(goog.isArrayLike(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
  if("function" == typeof a.getKeys) {
    return a.getKeys()
  }
  if("function" != typeof a.getValues) {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      for(var b = [], a = a.length, c = 0;c < a;c++) {
        b.push(c)
      }
      return b
    }
    return goog.object.getKeys(a)
  }
};
goog.structs.contains = function(a, b) {
  return"function" == typeof a.contains ? a.contains(b) : "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
  return"function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
  "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c)
    }else {
      for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a)
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if("function" == typeof a.filter) {
    return a.filter(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      b.call(c, f[h], void 0, a) && d.push(f[h])
    }
  }
  return d
};
goog.structs.map = function(a, b, c) {
  if("function" == typeof a.map) {
    return a.map(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c)
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if(e) {
    d = {};
    for(var h = 0;h < g;h++) {
      d[e[h]] = b.call(c, f[h], e[h], a)
    }
  }else {
    d = [];
    for(h = 0;h < g;h++) {
      d[h] = b.call(c, f[h], void 0, a)
    }
  }
  return d
};
goog.structs.some = function(a, b, c) {
  if("function" == typeof a.some) {
    return a.some(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(b.call(c, e[g], d && d[g], a)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function(a, b, c) {
  if("function" == typeof a.every) {
    return a.every(b, c)
  }
  if(goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c)
  }
  for(var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if(!b.call(c, e[g], d && d[g], a)) {
      return!1
    }
  }
  return!0
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function() {
  return this
};
goog.iter.toIterator = function(a) {
  if(a instanceof goog.iter.Iterator) {
    return a
  }
  if("function" == typeof a.__iterator__) {
    return a.__iterator__(!1)
  }
  if(goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for(;;) {
        if(b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if(b in a) {
          return a[b++]
        }
        b++
      }
    };
    return c
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if(goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c)
    }catch(d) {
      if(d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }else {
    a = goog.iter.toIterator(a);
    try {
      for(;;) {
        b.call(c, a.next(), void 0, a)
      }
    }catch(e) {
      if(e !== goog.iter.StopIteration) {
        throw e;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var d = goog.iter.toIterator(a), a = new goog.iter.Iterator;
  a.next = function() {
    for(;;) {
      var a = d.next();
      if(b.call(c, a, void 0, d)) {
        return a
      }
    }
  };
  return a
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  1 < arguments.length && (d = a, e = b);
  if(0 == f) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if(f > 0 && d >= e || f < 0 && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d = d + f;
    return a
  };
  return g
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
  var d = goog.iter.toIterator(a), a = new goog.iter.Iterator;
  a.next = function() {
    for(;;) {
      var a = d.next();
      return b.call(c, a, void 0, d)
    }
  };
  return a
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a)
  });
  return e
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(b.call(c, a.next(), void 0, a)) {
        return!0
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!1
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for(;;) {
      if(!b.call(c, a.next(), void 0, a)) {
        return!1
      }
    }
  }catch(d) {
    if(d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return!0
};
goog.iter.chain = function(a) {
  var b = arguments, c = b.length, d = 0, e = new goog.iter.Iterator;
  e.next = function() {
    try {
      if(d >= c) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator(b[d]).next()
    }catch(a) {
      if(a !== goog.iter.StopIteration || d >= c) {
        throw a;
      }
      d++;
      return this.next()
    }
  };
  return e
};
goog.iter.dropWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a), a = new goog.iter.Iterator, e = !0;
  a.next = function() {
    for(;;) {
      var a = d.next();
      if(!e || !b.call(c, a, void 0, d)) {
        return e = !1, a
      }
    }
  };
  return a
};
goog.iter.takeWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a), a = new goog.iter.Iterator, e = !0;
  a.next = function() {
    for(;;) {
      if(e) {
        var a = d.next();
        if(b.call(c, a, void 0, d)) {
          return a
        }
        e = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return a
};
goog.iter.toArray = function(a) {
  if(goog.isArrayLike(a)) {
    return goog.array.toArray(a)
  }
  var a = goog.iter.toIterator(a), b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a)
  });
  return b
};
goog.iter.equals = function(a, b) {
  var a = goog.iter.toIterator(a), b = goog.iter.toIterator(b), c, d;
  try {
    for(;;) {
      c = d = !1;
      var e = a.next();
      c = !0;
      var f = b.next();
      d = !0;
      if(e != f) {
        break
      }
    }
  }catch(g) {
    if(g !== goog.iter.StopIteration) {
      throw g;
    }
    if(c && !d) {
      return!1
    }
    if(!d) {
      try {
        b.next()
      }catch(h) {
        if(h !== goog.iter.StopIteration) {
          throw h;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next()
  }catch(c) {
    if(c != goog.iter.StopIteration) {
      throw c;
    }
    return b
  }
};
goog.iter.product = function(a) {
  if(goog.array.some(arguments, function(a) {
    return!a.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if(d) {
      for(var a = goog.array.map(d, function(a, b) {
        return c[b][a]
      }), b = d.length - 1;0 <= b;b--) {
        goog.asserts.assert(d);
        if(d[b] < c[b].length - 1) {
          d[b]++;
          break
        }
        if(0 == b) {
          d = null;
          break
        }
        d[b] = 0
      }
      return a
    }
    throw goog.iter.StopIteration;
  };
  return b
};
goog.iter.cycle = function(a) {
  var b = goog.iter.toIterator(a), c = [], d = 0, a = new goog.iter.Iterator, e = !1;
  a.next = function() {
    var a = null;
    if(!e) {
      try {
        return a = b.next(), c.push(a), a
      }catch(g) {
        if(g != goog.iter.StopIteration || goog.array.isEmpty(c)) {
          throw g;
        }
        e = !0
      }
    }
    a = c[d];
    d = (d + 1) % c.length;
    return a
  };
  return a
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  var c = arguments.length;
  if(1 < c) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    a && this.addAll(a)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for(var a = [], b = 0;b < this.keys_.length;b++) {
    a.push(this.map_[this.keys_[b]])
  }
  return a
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
  for(var b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    if(goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function(a, b) {
  if(this === a) {
    return!0
  }
  if(this.count_ != a.getCount()) {
    return!1
  }
  var c = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var d, e = 0;d = this.keys_[e];e++) {
    if(!c(this.get(d), a.get(d))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if(this.count_ != this.keys_.length) {
    for(var a = 0, b = 0;a < this.keys_.length;) {
      var c = this.keys_[a];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
      a++
    }
    this.keys_.length = b
  }
  if(this.count_ != this.keys_.length) {
    for(var d = {}, b = a = 0;a < this.keys_.length;) {
      c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++
    }
    this.keys_.length = b
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
  var b;
  a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
  for(var c = 0;c < b.length;c++) {
    this.set(b[c], a[c])
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
  for(var a = new goog.structs.Map, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c)
  }
  return a
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for(var a = {}, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c]
  }
  return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.keys_, d = this.map_, e = this.version_, f = this, g = new goog.iter.Iterator;
  g.next = function() {
    for(;;) {
      if(e != f.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(b >= c.length) {
        throw goog.iter.StopIteration;
      }
      var g = c[b++];
      return a ? g : d[g]
    }
  };
  return g
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !0;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var b = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == a.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != a.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == b.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = "function" == typeof a ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(a) {
  return goog.userAgent.isDocumentModeCache_[a] || (goog.userAgent.isDocumentModeCache_[a] = goog.userAgent.IE && !!document.documentMode && document.documentMode >= a)
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = "";
  a && (h += a + ":");
  c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
  e && (h += e);
  f && (h += "?" + f);
  g && (h += "#" + g);
  return h
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a) {
  return a && decodeURIComponent(a)
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getEffectiveScheme = function(a) {
  a = goog.uri.utils.getScheme(a);
  !a && self.location && (a = self.location.protocol, a = a.substr(0, a.length - 1));
  return a ? a.toLowerCase() : ""
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a))
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a))
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if(goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if(a[1]) {
    var b = a[0], c = b.indexOf("#");
    0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
  }
  return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if(goog.isArray(b)) {
    goog.asserts.assertArray(b);
    for(var d = 0;d < b.length;d++) {
      goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c)
    }
  }else {
    null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for(c = c || 0;c < b.length;c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a)
  }
  return a
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for(var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a)
  }
  return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
  return goog.uri.utils.appendQueryData_([a, "&", b, "=", goog.string.urlEncode(c)])
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for(var e = c.length;0 <= (b = a.indexOf(c, b)) && b < d;) {
    var f = a.charCodeAt(b - 1);
    if(f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if(f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b
      }
    }
    b += e + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if(0 > d) {
    return null
  }
  var e = a.indexOf("&", d);
  if(0 > e || e > c) {
    e = c
  }
  d += b.length + 1;
  return goog.string.urlDecode(a.substr(d, e - d))
};
goog.uri.utils.getParamValues = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    d = a.indexOf("&", e);
    if(0 > d || d > c) {
      d = c
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)))
  }
  return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for(var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c)
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.Uri = function(a, b) {
  var c;
  a instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(b) ? b : a.getIgnoreCase(), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split(String(a))) ? (this.ignoreCase_ = !!b, this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || 
  "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!b, this.queryData_ = new goog.Uri.QueryData(null, null, this.ignoreCase_))
};
goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function() {
  var a = [], b = this.getScheme();
  b && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  if(b = this.getDomain()) {
    a.push("//");
    var c = this.getUserInfo();
    c && a.push(goog.Uri.encodeSpecialChars_(c, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@");
    a.push(goog.string.urlEncode(b));
    b = this.getPort();
    null != b && a.push(":", String(b))
  }
  if(b = this.getPath()) {
    this.hasDomain() && "/" != b.charAt(0) && a.push("/"), a.push(goog.Uri.encodeSpecialChars_(b, "/" == b.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_))
  }
  (b = this.getEncodedQuery()) && a.push("?", b);
  (b = this.getFragment()) && a.push("#", goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInFragment_));
  return a.join("")
};
goog.Uri.prototype.resolve = function(a) {
  var b = this.clone(), c = a.hasScheme();
  c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
  c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
  c ? b.setDomain(a.getDomain()) : c = a.hasPort();
  var d = a.getPath();
  if(c) {
    b.setPort(a.getPort())
  }else {
    if(c = a.hasPath()) {
      if("/" != d.charAt(0)) {
        if(this.hasDomain() && !this.hasPath()) {
          d = "/" + d
        }else {
          var e = b.getPath().lastIndexOf("/");
          -1 != e && (d = b.getPath().substr(0, e + 1) + d)
        }
      }
      d = goog.Uri.removeDotSegments(d)
    }
  }
  c ? b.setPath(d) : c = a.hasQuery();
  c ? b.setQueryData(a.getDecodedQuery()) : c = a.hasFragment();
  c && b.setFragment(a.getFragment());
  return b
};
goog.Uri.prototype.clone = function() {
  return new goog.Uri(this)
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function(a, b) {
  this.enforceReadOnly();
  if(this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a) : a) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(a, b) {
  this.enforceReadOnly();
  this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasUserInfo = function() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function(a, b) {
  this.enforceReadOnly();
  this.domain_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasDomain = function() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function() {
  return this.port_
};
goog.Uri.prototype.setPort = function(a) {
  this.enforceReadOnly();
  if(a) {
    a = Number(a);
    if(isNaN(a) || 0 > a) {
      throw Error("Bad port number " + a);
    }
    this.port_ = a
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function() {
  return null != this.port_
};
goog.Uri.prototype.getPath = function() {
  return this.path_
};
goog.Uri.prototype.setPath = function(a, b) {
  this.enforceReadOnly();
  this.path_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasPath = function() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function() {
  return"" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function(a, b) {
  this.enforceReadOnly();
  a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, null, this.ignoreCase_));
  return this
};
goog.Uri.prototype.setQuery = function(a, b) {
  return this.setQueryData(a, b)
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(a, b) {
  this.enforceReadOnly();
  this.queryData_.set(a, b);
  return this
};
goog.Uri.prototype.setParameterValues = function(a, b) {
  this.enforceReadOnly();
  goog.isArray(b) || (b = [String(b)]);
  this.queryData_.setValues(a, b);
  return this
};
goog.Uri.prototype.getParameterValues = function(a) {
  return this.queryData_.getValues(a)
};
goog.Uri.prototype.getParameterValue = function(a) {
  return this.queryData_.get(a)
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function(a, b) {
  this.enforceReadOnly();
  this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this
};
goog.Uri.prototype.hasFragment = function() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(a) {
  return(!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function(a) {
  this.enforceReadOnly();
  this.queryData_.remove(a);
  return this
};
goog.Uri.prototype.setReadOnly = function(a) {
  this.isReadOnly_ = a;
  return this
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(a) {
  this.ignoreCase_ = a;
  this.queryData_ && this.queryData_.setIgnoreCase(a);
  return this
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_
};
goog.Uri.parse = function(a, b) {
  return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b)
};
goog.Uri.create = function(a, b, c, d, e, f, g, h) {
  h = new goog.Uri(null, h);
  a && h.setScheme(a);
  b && h.setUserInfo(b);
  c && h.setDomain(c);
  d && h.setPort(d);
  e && h.setPath(e);
  f && h.setQueryData(f);
  g && h.setFragment(g);
  return h
};
goog.Uri.resolve = function(a, b) {
  a instanceof goog.Uri || (a = goog.Uri.parse(a));
  b instanceof goog.Uri || (b = goog.Uri.parse(b));
  return a.resolve(b)
};
goog.Uri.removeDotSegments = function(a) {
  if(".." == a || "." == a) {
    return""
  }
  if(!goog.string.contains(a, "./") && !goog.string.contains(a, "/.")) {
    return a
  }
  for(var b = goog.string.startsWith(a, "/"), a = a.split("/"), c = [], d = 0;d < a.length;) {
    var e = a[d++];
    "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
  }
  return c.join("/")
};
goog.Uri.decodeOrEmpty_ = function(a) {
  return a ? decodeURIComponent(a) : ""
};
goog.Uri.encodeSpecialChars_ = function(a, b) {
  return goog.isString(a) ? encodeURI(a).replace(b, goog.Uri.encodeChar_) : null
};
goog.Uri.encodeChar_ = function(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(a, b, c) {
  this.encodedQuery_ = a || null;
  this.ignoreCase_ = !!c
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if(!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    for(var a = this.encodedQuery_.split("&"), b = 0;b < a.length;b++) {
      var c = a[b].indexOf("="), d = null, e = null;
      0 <= c ? (d = a[b].substring(0, c), e = a[b].substring(c + 1)) : d = a[b];
      d = goog.string.urlDecode(d);
      d = this.getKeyName_(d);
      this.add(d, e ? goog.string.urlDecode(e) : "")
    }
  }
};
goog.Uri.QueryData.createFromMap = function(a, b, c) {
  b = goog.structs.getKeys(a);
  if("undefined" == typeof b) {
    throw Error("Keys are undefined");
  }
  for(var c = new goog.Uri.QueryData(null, null, c), a = goog.structs.getValues(a), d = 0;d < b.length;d++) {
    var e = b[d], f = a[d];
    goog.isArray(f) ? c.setValues(e, f) : c.add(e, f)
  }
  return c
};
goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
  if(a.length != b.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  c = new goog.Uri.QueryData(null, null, d);
  for(d = 0;d < a.length;d++) {
    c.add(a[d], b[d])
  }
  return c
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  var a = this.getKeyName_(a), c = this.keyMap_.get(a);
  c || this.keyMap_.set(a, c = []);
  c.push(b);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a) ? (this.invalidateCache_(), this.count_ -= this.keyMap_.get(a).length, this.keyMap_.remove(a)) : !1
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a)
};
goog.Uri.QueryData.prototype.containsValue = function(a) {
  var b = this.getValues();
  return goog.array.contains(b, a)
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  for(var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0;d < b.length;d++) {
    for(var e = a[d], f = 0;f < e.length;f++) {
      c.push(b[d])
    }
  }
  return c
};
goog.Uri.QueryData.prototype.getValues = function(a) {
  this.ensureKeyMapInitialized_();
  var b = [];
  if(a) {
    this.containsKey(a) && (b = goog.array.concat(b, this.keyMap_.get(this.getKeyName_(a))))
  }else {
    for(var a = this.keyMap_.getValues(), c = 0;c < a.length;c++) {
      b = goog.array.concat(b, a[c])
    }
  }
  return b
};
goog.Uri.QueryData.prototype.set = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  this.containsKey(a) && (this.count_ -= this.keyMap_.get(a).length);
  this.keyMap_.set(a, [b]);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function(a, b) {
  var c = a ? this.getValues(a) : [];
  return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < c.length ? c[0] : b : 0 < c.length ? String(c[0]) : b
};
goog.Uri.QueryData.prototype.setValues = function(a, b) {
  this.remove(a);
  0 < b.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(a), goog.array.clone(b)), this.count_ += b.length)
};
goog.Uri.QueryData.prototype.toString = function() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  for(var a = [], b = this.keyMap_.getKeys(), c = 0;c < b.length;c++) {
    for(var d = b[c], e = goog.string.urlEncode(d), d = this.getValues(d), f = 0;f < d.length;f++) {
      var g = e;
      "" !== d[f] && (g += "=" + goog.string.urlEncode(d[f]));
      a.push(g)
    }
  }
  return this.encodedQuery_ = a.join("&")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  return goog.Uri.decodeOrEmpty_(this.toString())
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  this.encodedQuery_ = null
};
goog.Uri.QueryData.prototype.filterKeys = function(a) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function(b, c) {
    goog.array.contains(a, c) || this.remove(c)
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function() {
  var a = new goog.Uri.QueryData;
  a.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && (a.keyMap_ = this.keyMap_.clone());
  return a
};
goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
  a = String(a);
  this.ignoreCase_ && (a = a.toLowerCase());
  return a
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
  a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), goog.structs.forEach(this.keyMap_, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.setValues(d, a))
  }, this));
  this.ignoreCase_ = a
};
goog.Uri.QueryData.prototype.extend = function(a) {
  for(var b = 0;b < arguments.length;b++) {
    goog.structs.forEach(arguments[b], function(a, b) {
      this.add(b, a)
    }, this)
  }
};
goog.structs.Collection = function() {
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return"object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.add(a[c])
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  for(var a = goog.structs.getValues(a), b = a.length, c = 0;c < b;c++) {
    this.remove(a[c])
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
  for(var b = new goog.structs.Set, a = goog.structs.getValues(a), c = 0;c < a.length;c++) {
    var d = a[c];
    this.contains(d) && b.add(d)
  }
  return b
};
goog.structs.Set.prototype.difference = function(a) {
  var b = this.clone();
  b.removeAll(a);
  return b
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if(this.getCount() > b) {
    return!1
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b)
  })
};
goog.structs.Set.prototype.__iterator__ = function() {
  return this.map_.__iterator__(!1)
};
goog.debug.catchErrors = function(a, b, c) {
  var c = c || goog.global, d = c.onerror, e = !!b;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersion("535.3") && (e = !e);
  c.onerror = function(b, c, h) {
    d && d(b, c, h);
    a({message:b, fileName:c, line:h});
    return e
  }
};
goog.debug.expose = function(a, b) {
  if("undefined" == typeof a) {
    return"undefined"
  }
  if(null == a) {
    return"NULL"
  }
  var c = [], d;
  for(d in a) {
    if(b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d]
      }catch(f) {
        e += "*** " + f + " ***"
      }
      c.push(e)
    }
  }
  return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
  var c = new goog.structs.Set, d = [], e = function(a, g) {
    var h = g + "  ";
    try {
      if(goog.isDef(a)) {
        if(goog.isNull(a)) {
          d.push("NULL")
        }else {
          if(goog.isString(a)) {
            d.push('"' + a.replace(/\n/g, "\n" + g) + '"')
          }else {
            if(goog.isFunction(a)) {
              d.push(String(a).replace(/\n/g, "\n" + g))
            }else {
              if(goog.isObject(a)) {
                if(c.contains(a)) {
                  d.push("*** reference loop detected ***")
                }else {
                  c.add(a);
                  d.push("{");
                  for(var j in a) {
                    if(b || !goog.isFunction(a[j])) {
                      d.push("\n"), d.push(h), d.push(j + " = "), e(a[j], h)
                    }
                  }
                  d.push("\n" + g + "}")
                }
              }else {
                d.push(a)
              }
            }
          }
        }
      }else {
        d.push("undefined")
      }
    }catch(i) {
      d.push("*** " + i + " ***")
    }
  };
  e(a, "");
  return d.join("")
};
goog.debug.exposeArray = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c])
  }
  return"[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a);
    return"Message: " + goog.string.htmlEscape(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + goog.string.htmlEscape(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + goog.string.htmlEscape(goog.debug.getStacktrace(b) + "-> ")
  }catch(d) {
    return"Exception trying to expose exception! You win, we lose. " + d
  }
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if(goog.isString(a)) {
    return{message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"}
  }
  var c, d, e = !1;
  try {
    c = a.lineNumber || a.line || "Not available"
  }catch(f) {
    c = "Not available", e = !0
  }
  try {
    d = a.fileName || a.filename || a.sourceURL || b
  }catch(g) {
    d = "Not available", e = !0
  }
  return e || !a.lineNumber || !a.fileName || !a.stack ? {message:a.message, name:a.name, lineNumber:c, fileName:d, stack:a.stack || "Not available"} : a
};
goog.debug.enhanceError = function(a, b) {
  var c = "string" == typeof a ? Error(a) : a;
  c.stack || (c.stack = goog.debug.getStacktrace(arguments.callee.caller));
  if(b) {
    for(var d = 0;c["message" + d];) {
      ++d
    }
    c["message" + d] = String(b)
  }
  return c
};
goog.debug.getStacktraceSimple = function(a) {
  for(var b = [], c = arguments.callee.caller, d = 0;c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller
    }catch(e) {
      b.push("[exception trying to get caller]\n");
      break
    }
    d++;
    if(d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getStacktrace = function(a) {
  return goog.debug.getStacktraceHelper_(a || arguments.callee.caller, [])
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if(goog.array.contains(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        0 < e && c.push(", ");
        var f;
        f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = String(f);
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
};
goog.debug.setFunctionResolver = function(a) {
  goog.debug.fnNameResolver_ = a
};
goog.debug.getFunctionName = function(a) {
  if(goog.debug.fnNameCache_[a]) {
    return goog.debug.fnNameCache_[a]
  }
  if(goog.debug.fnNameResolver_) {
    var b = goog.debug.fnNameResolver_(a);
    if(b) {
      return goog.debug.fnNameCache_[a] = b
    }
  }
  a = String(a);
  goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.prototype.exceptionText_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
  delete this.exceptionText_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a
};
goog.debug.LogRecord.prototype.getExceptionText = function() {
  return this.exceptionText_
};
goog.debug.LogRecord.prototype.setExceptionText = function(a) {
  this.exceptionText_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if(this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if(b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d])
    }while(d != c)
  }
};
goog.debug.Logger = function(a) {
  this.name_ = a
};
goog.debug.Logger.prototype.parent_ = null;
goog.debug.Logger.prototype.level_ = null;
goog.debug.Logger.prototype.children_ = null;
goog.debug.Logger.prototype.handlers_ = null;
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for(var a = 0, b;b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b;
    goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if(a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a]
  }
  for(var b = 0;b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if(c.value <= a) {
      return c
    }
  }
  return null
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    if(!this.handlers_) {
      this.handlers_ = []
    }
    this.handlers_.push(a)
  }else {
    goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootHandlers_.push(a)
  }
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
  return!!b && goog.array.remove(b, a)
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
  if(!this.children_) {
    this.children_ = {}
  }
  return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    this.level_ = a
  }else {
    goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false.");
    goog.debug.Logger.rootLevel_ = a
  }
};
goog.debug.Logger.prototype.getLevel = function() {
  return this.level_
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if(!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_
  }
  if(this.level_) {
    return this.level_
  }
  if(this.parent_) {
    return this.parent_.getEffectiveLevel()
  }
  goog.asserts.fail("Root logger has no level set.");
  return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  this.isLoggable(a) && this.doLogRecord_(this.getLogRecord(a, b, c))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  var d = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
  if(c) {
    d.setException(c);
    d.setExceptionText(goog.debug.exposeException(c, arguments.callee.caller))
  }
  return d
};
goog.debug.Logger.prototype.shout = function(a, b) {
  this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
  this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
  this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
  this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
  this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
  this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
  this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
  this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
  this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  goog.debug.Logger.logToProfilers("log:" + a.getMessage());
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    for(var b = this;b;) {
      b.callPublish_(a);
      b = b.getParent()
    }
  }else {
    for(var b = 0, c;c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if(this.handlers_) {
    for(var b = 0, c;c = this.handlers_[b];b++) {
      c(a)
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  if(!goog.debug.LogManager.rootLogger_) {
    goog.debug.LogManager.rootLogger_ = new goog.debug.Logger("");
    goog.debug.LogManager.loggers_[""] = goog.debug.LogManager.rootLogger_;
    goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG)
  }
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
  }
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if(goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d)
  }
  return goog.debug.LogManager.loggers_[a] = b
};
var webdriver = {Command:function(a) {
  this.name_ = a;
  this.parameters_ = {}
}};
webdriver.Command.prototype.getName = function() {
  return this.name_
};
webdriver.Command.prototype.setParameter = function(a, b) {
  this.parameters_[a] = b;
  return this
};
webdriver.Command.prototype.setParameters = function(a) {
  this.parameters_ = a;
  return this
};
webdriver.Command.prototype.getParameter = function(a) {
  return this.parameters_[a]
};
webdriver.Command.prototype.getParameters = function() {
  return this.parameters_
};
webdriver.CommandName = {GET_SERVER_STATUS:"getStatus", NEW_SESSION:"newSession", GET_SESSIONS:"getSessions", DESCRIBE_SESSION:"getSessionCapabilities", CLOSE:"close", QUIT:"quit", GET_CURRENT_URL:"getCurrentUrl", GET:"get", GO_BACK:"goBack", GO_FORWARD:"goForward", REFRESH:"refresh", ADD_COOKIE:"addCookie", GET_COOKIE:"getCookie", GET_ALL_COOKIES:"getCookies", DELETE_COOKIE:"deleteCookie", DELETE_ALL_COOKIES:"deleteAllCookies", GET_ACTIVE_ELEMENT:"getActiveElement", FIND_ELEMENT:"findElement", FIND_ELEMENTS:"findElements", 
FIND_CHILD_ELEMENT:"findChildElement", FIND_CHILD_ELEMENTS:"findChildElements", CLEAR_ELEMENT:"clearElement", CLICK_ELEMENT:"clickElement", SEND_KEYS_TO_ELEMENT:"sendKeysToElement", SUBMIT_ELEMENT:"submitElement", GET_CURRENT_WINDOW_HANDLE:"getCurrentWindowHandle", GET_WINDOW_HANDLES:"getWindowHandles", GET_WINDOW_POSITION:"getWindowPosition", SET_WINDOW_POSITION:"setWindowPosition", GET_WINDOW_SIZE:"getWindowSize", SET_WINDOW_SIZE:"setWindowSize", MAXIMIZE_WINDOW:"maximizeWindow", SWITCH_TO_WINDOW:"switchToWindow", 
SWITCH_TO_FRAME:"switchToFrame", GET_PAGE_SOURCE:"getPageSource", GET_TITLE:"getTitle", EXECUTE_SCRIPT:"executeScript", EXECUTE_ASYNC_SCRIPT:"executeAsyncScript", GET_ELEMENT_TEXT:"getElementText", GET_ELEMENT_TAG_NAME:"getElementTagName", IS_ELEMENT_SELECTED:"isElementSelected", IS_ELEMENT_ENABLED:"isElementEnabled", IS_ELEMENT_DISPLAYED:"isElementDisplayed", GET_ELEMENT_LOCATION:"getElementLocation", GET_ELEMENT_LOCATION_IN_VIEW:"getElementLocationOnceScrolledIntoView", GET_ELEMENT_SIZE:"getElementSize", 
GET_ELEMENT_ATTRIBUTE:"getElementAttribute", GET_ELEMENT_VALUE_OF_CSS_PROPERTY:"getElementValueOfCssProperty", ELEMENT_EQUALS:"elementEquals", SCREENSHOT:"screenshot", DIMISS_ALERT:"dimissAlert", IMPLICITLY_WAIT:"implicitlyWait", SET_SCRIPT_TIMEOUT:"setScriptTimeout", GET_ALERT:"getAlert", ACCEPT_ALERT:"acceptAlert", DISMISS_ALERT:"dismissAlert", GET_ALERT_TEXT:"getAlertText", SET_ALERT_VALUE:"setAlertValue", EXECUTE_SQL:"executeSQL", GET_LOCATION:"getLocation", SET_LOCATION:"setLocation", GET_APP_CACHE:"getAppCache", 
GET_APP_CACHE_STATUS:"getStatus", CLEAR_APP_CACHE:"clearAppCache", IS_BROWSER_ONLINE:"isBrowserOnline", SET_BROWSER_ONLINE:"setBrowserOnline", GET_LOCAL_STORAGE_ITEM:"getLocalStorageItem", GET_LOCAL_STORAGE_KEYS:"getLocalStorageKeys", SET_LOCAL_STORAGE_ITEM:"setLocalStorageItem", REMOVE_LOCAL_STORAGE_ITEM:"removeLocalStorageItem", CLEAR_LOCAL_STORAGE:"clearLocalStorage", GET_LOCAL_STORAGE_SIZE:"getLocalStorageSize", GET_SESSION_STORAGE_ITEM:"getSessionStorageItem", GET_SESSION_STORAGE_KEYS:"getSessionStorageKey", 
SET_SESSION_STORAGE_ITEM:"setSessionStorageItem", REMOVE_SESSION_STORAGE_ITEM:"removeSessionStorageItem", CLEAR_SESSION_STORAGE:"clearSessionStorage", GET_SESSION_STORAGE_SIZE:"getSessionStorageSize", SET_SCREEN_ORIENTATION:"setScreenOrientation", GET_SCREEN_ORIENTATION:"getScreenOrientation", CLICK:"mouseClick", DOUBLE_CLICK:"mouseDoubleClick", MOUSE_DOWN:"mouseDown", MOUSE_UP:"mouseUp", MOVE_TO:"mouseMove", SEND_KEYS_TO_ACTIVE_ELEMENT:"sendKeysToActiveElement", TOUCH_SINGLE_TAP:"touchSingleTap", 
TOUCH_DOWN:"touchDown", TOUCH_UP:"touchUp", TOUCH_MOVE:"touchMove", TOUCH_SCROLL:"touchScroll", TOUCH_DOUBLE_TAP:"touchDoubleTap", TOUCH_LONG_PRESS:"touchLongPress", TOUCH_FLICK:"touchFlick", GET_LOGS:"getLogs"};
webdriver.CommandExecutor = function() {
};
var safaridriver = {Command:function(a, b, c) {
  webdriver.Command.call(this, b);
  this.id = a;
  c && this.setParameters(c)
}};
goog.inherits(safaridriver.Command, webdriver.Command);
safaridriver.Command.fromJSONObject = function(a) {
  return!goog.isString(a.id) || !goog.isString(a.name) || !goog.isObject(a.parameters) ? null : new safaridriver.Command(a.id, a.name, a.parameters)
};
safaridriver.Command.prototype.getId = function() {
  return this.id
};
safaridriver.Command.prototype.toJSON = function() {
  return{id:this.id, name:this.getName(), parameters:this.getParameters()}
};
safaridriver.Command.prototype.toString = function() {
  return JSON.stringify(this)
};
safaridriver.message = {};
safaridriver.message.ORIGIN = 0;
safaridriver.message.LOG_ = goog.debug.Logger.getLogger("safaridriver.message");
safaridriver.message.FORCE_SYNCHRONOUS_PROXY_SEND = !1;
safaridriver.message.factoryRegistry_ = {};
safaridriver.message.registerMessageType = function(a, b) {
  goog.asserts.assert(!(a in safaridriver.message.factoryRegistry_), "Message type has already been registered: " + a);
  safaridriver.message.factoryRegistry_[a] = b
};
safaridriver.message.fromEvent = function(a) {
  a = a.message || a.data;
  goog.isString(a) && (a = JSON.parse(a));
  if(!goog.isObject(a) || !goog.isString(a[safaridriver.message.Message.Field.ORIGIN]) && !goog.isNumber(a[safaridriver.message.Message.Field.ORIGIN]) || !goog.isString(a[safaridriver.message.Message.Field.TYPE])) {
    throw Error("Invalid message: " + JSON.stringify(a));
  }
  var b = safaridriver.message.factoryRegistry_[a[safaridriver.message.Message.Field.TYPE]];
  b || (safaridriver.message.LOG_.fine("Unknown message type; falling back to the default factory: " + JSON.stringify(a)), b = safaridriver.message.Message.fromData_);
  b = b(a);
  b.setOrigin(a[safaridriver.message.Message.Field.ORIGIN]);
  return b
};
safaridriver.message.Message = function(a) {
  this.data_ = {};
  this.data_[safaridriver.message.Message.Field.ORIGIN] = safaridriver.message.ORIGIN;
  this.data_[safaridriver.message.Message.Field.TYPE] = a
};
safaridriver.message.Message.Field = {ORIGIN:"origin", TYPE:"type"};
safaridriver.message.Message.fromData_ = function(a) {
  return new safaridriver.message.Message(a[safaridriver.message.Message.Field.TYPE])
};
safaridriver.message.Message.prototype.setField = function(a, b) {
  goog.asserts.assert(a !== safaridriver.message.Message.Field.TYPE, "The specified field may not be overridden: " + a);
  this.data_[a] = b
};
safaridriver.message.Message.prototype.getField = function(a) {
  return this.data_[a]
};
safaridriver.message.Message.prototype.setOrigin = function(a) {
  this.setField(safaridriver.message.Message.Field.ORIGIN, a)
};
safaridriver.message.Message.prototype.getOrigin = function() {
  return this.getField(safaridriver.message.Message.Field.ORIGIN)
};
safaridriver.message.Message.prototype.isSameOrigin = function() {
  return this.getOrigin() === safaridriver.message.ORIGIN
};
safaridriver.message.Message.prototype.getType = function() {
  return this.getField(safaridriver.message.Message.Field.TYPE)
};
safaridriver.message.Message.prototype.isType = function(a) {
  return this.getField(safaridriver.message.Message.Field.TYPE) === a
};
safaridriver.message.Message.prototype.send = function(a) {
  this.setOrigin(safaridriver.message.ORIGIN);
  if(a.postMessage) {
    a.postMessage(this.data_, "*")
  }else {
    if(safaridriver.message.FORCE_SYNCHRONOUS_PROXY_SEND && a.canLoad) {
      return this.sendSync(a)
    }
    a.dispatchMessage(this.getType(), this.data_)
  }
};
safaridriver.message.Message.SYNCHRONOUS_MESSAGE_RESPONSE_ATTRIBUTE_ = "safaridriver.message.syncResponse";
safaridriver.message.Message.setSynchronousMessageResponse = function(a) {
  document.documentElement.setAttribute(safaridriver.message.Message.SYNCHRONOUS_MESSAGE_RESPONSE_ATTRIBUTE_, a)
};
safaridriver.message.Message.prototype.sendSync = function(a) {
  if(a.postMessage) {
    goog.asserts.assert(a === window, "Synchrnous messages may only be sent to a window when that window is the same as the current context");
    var b = document.createEvent("MessageEvent");
    b.initMessageEvent("message", !1, !1, this.data_, window.location.origin, "0", window, null);
    a.dispatchEvent(b);
    a = document.documentElement.getAttribute(safaridriver.message.Message.SYNCHRONOUS_MESSAGE_RESPONSE_ATTRIBUTE_);
    document.documentElement.removeAttribute(safaridriver.message.Message.SYNCHRONOUS_MESSAGE_RESPONSE_ATTRIBUTE_);
    return a
  }
  b = document.createEvent("Events");
  b.initEvent("beforeload", !1, !1);
  return a.canLoad(b, this.data_)
};
safaridriver.message.Message.prototype.toJSON = function() {
  return this.data_
};
safaridriver.message.Message.prototype.toString = function() {
  return JSON.stringify(this)
};
webdriver.EventEmitter = function() {
  this.events_ = {}
};
webdriver.EventEmitter.prototype.emit = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1), d = this.events_[a];
  if(d) {
    for(var e = 0;e < d.length;) {
      var f = d[e];
      f.fn.apply(f.scope, c);
      d[e] === f && (d[e].oneshot ? d.splice(e, 1) : e += 1)
    }
  }
};
webdriver.EventEmitter.prototype.listeners = function(a) {
  var b = this.events_[a];
  b || (b = this.events_[a] = []);
  return b
};
webdriver.EventEmitter.prototype.addListener_ = function(a, b, c, d) {
  for(var a = this.listeners(a), e = a.length, f = 0;f < e;++f) {
    if(a[f].fn == b) {
      return this
    }
  }
  a.push({fn:b, scope:c, oneshot:!!d});
  return this
};
webdriver.EventEmitter.prototype.addListener = function(a, b, c) {
  return this.addListener_(a, b, c)
};
webdriver.EventEmitter.prototype.once = function(a, b, c) {
  return this.addListener_(a, b, c, !0)
};
webdriver.EventEmitter.prototype.on = webdriver.EventEmitter.prototype.addListener;
webdriver.EventEmitter.prototype.removeListener = function(a, b) {
  var c = this.events_[a];
  if(c) {
    for(var d = c.length, e = 0;e < d;++e) {
      if(c[e].fn == b) {
        c.splice(e, 1);
        break
      }
    }
  }
  return this
};
webdriver.EventEmitter.prototype.removeAllListeners = function(a) {
  goog.isDef(a) ? delete this.events_[a] : this.events_ = {};
  return this
};
safaridriver.message.MessageTarget = function(a) {
  webdriver.EventEmitter.call(this);
  this.source_ = a;
  this.log_ = goog.debug.Logger.getLogger("safaridriver.message.MessageTarget");
  this.boundOnMessage_ = goog.bind(this.onMessage_, this);
  this.source_.addEventListener("message", this.boundOnMessage_, !0)
};
goog.inherits(safaridriver.message.MessageTarget, webdriver.EventEmitter);
safaridriver.message.MessageTarget.prototype.setLogger = function(a) {
  this.log_ = goog.isString(a) ? goog.debug.Logger.getLogger(a) : a
};
safaridriver.message.MessageTarget.prototype.dispose = function() {
  this.removeAllListeners();
  this.source_.removeEventListener("message", this.boundOnMessage_, !0)
};
safaridriver.message.MessageTarget.prototype.log = function(a, b, c) {
  this.log_.log(b || goog.debug.Logger.Level.INFO, a, c)
};
safaridriver.message.MessageTarget.prototype.onMessage_ = function(a) {
  try {
    var b = safaridriver.message.fromEvent(a)
  }catch(c) {
    this.log("Unable to parse message: " + (a.name ? a.name + ": " : "") + JSON.stringify(a.message || a.data), goog.debug.Logger.Level.SEVERE, c);
    return
  }
  this.emit(b.getType(), b, a)
};
safaridriver.Tab = function(a) {
  safaridriver.message.MessageTarget.call(this, a);
  this.setLogger("safaridriver.Tab");
  this.id_ = goog.string.getRandomString();
  this.isReady_ = !0;
  this.readyListeners_ = []
};
goog.inherits(safaridriver.Tab, safaridriver.message.MessageTarget);
safaridriver.Tab.prototype.idleStateWaitKey_ = null;
safaridriver.Tab.prototype.getId = function() {
  return this.id_
};
safaridriver.Tab.prototype.log = function(a, b, c) {
  safaridriver.Tab.superClass_.log.call(this, "[" + this.id_ + "] " + a, b, c)
};
safaridriver.Tab.prototype.isReady = function() {
  return this.isReady_
};
safaridriver.Tab.prototype.whenReady = function(a) {
  this.isReady_ ? a() : (this.log("Tab is not ready; registering callback", goog.debug.Logger.Level.FINER), this.readyListeners_.push(a))
};
safaridriver.Tab.prototype.notifyReady = function() {
  this.log("Tab may be ready; waiting for idle state");
  var a = this;
  a.idleStateWaitKey_ || (a.idleStateWaitKey_ = setTimeout(function() {
    a.isReady_ = !0;
    a.idleStateWaitKey_ = null;
    for(a.log("Tab looks ready; notifying listeners");a.readyListeners_.length;) {
      if(!a.isReady_) {
        a.log("Tab is no longer ready");
        break
      }
      a.readyListeners_.shift()()
    }
  }, 100))
};
safaridriver.Tab.prototype.notifyUnready = function() {
  this.log("Tab is not ready");
  this.isReady_ = !1;
  this.idleStateWaitKey_ && (clearTimeout(this.idleStateWaitKey_), this.idleStateWaitKey_ = null)
};
safaridriver.message.BaseCommandMessage = function(a, b) {
  safaridriver.message.Message.call(this, a);
  this.command_ = b
};
goog.inherits(safaridriver.message.BaseCommandMessage, safaridriver.message.Message);
safaridriver.message.BaseCommandMessage.COMMAND_FIELD_ = "command";
safaridriver.message.BaseCommandMessage.prototype.getCommand = function() {
  return this.command_
};
safaridriver.message.BaseCommandMessage.prototype.toJSON = function() {
  this.setField(safaridriver.message.BaseCommandMessage.COMMAND_FIELD_, this.command_.toJSON());
  return safaridriver.message.BaseCommandMessage.superClass_.toJSON.call(this)
};
safaridriver.message.BaseCommandMessage.prototype.send = function(a) {
  this.setField(safaridriver.message.BaseCommandMessage.COMMAND_FIELD_, this.command_.toJSON());
  safaridriver.message.BaseCommandMessage.superClass_.send.call(this, a)
};
safaridriver.message.BaseCommandMessage.defineCommandMessageType = function(a) {
  var b = function(b) {
    safaridriver.message.BaseCommandMessage.call(this, a, b)
  };
  goog.inherits(b, safaridriver.message.BaseCommandMessage);
  b.TYPE = a;
  safaridriver.message.registerMessageType(a, function(a) {
    var d = a[safaridriver.message.BaseCommandMessage.COMMAND_FIELD_];
    if(!goog.isObject(d)) {
      throw Error("Invalid command message: " + JSON.stringify(a));
    }
    d = safaridriver.Command.fromJSONObject(d);
    if(!d) {
      throw Error("Invalid command message: " + JSON.stringify(a));
    }
    return new b(d)
  });
  return b
};
safaridriver.message.Command = safaridriver.message.BaseCommandMessage.defineCommandMessageType("command");
safaridriver.message.Response = function(a, b) {
  safaridriver.message.Message.call(this, safaridriver.message.Response.TYPE);
  this.setField(safaridriver.message.Response.Field_.ID, a);
  this.setField(safaridriver.message.Response.Field_.RESPONSE, b)
};
goog.inherits(safaridriver.message.Response, safaridriver.message.Message);
safaridriver.message.Response.TYPE = "response";
safaridriver.message.Response.Field_ = {ID:"id", RESPONSE:"response"};
safaridriver.message.Response.fromData_ = function(a) {
  var b = a[safaridriver.message.Response.Field_.ID], c = a[safaridriver.message.Response.Field_.RESPONSE];
  if(!goog.isString(b) || !goog.isObject(c)) {
    throw Error("Invalid response message: " + JSON.stringify(a));
  }
  return new safaridriver.message.Response(b, c)
};
safaridriver.message.Response.prototype.getId = function() {
  return this.getField(safaridriver.message.Response.Field_.ID)
};
safaridriver.message.Response.prototype.getResponse = function() {
  return this.getField(safaridriver.message.Response.Field_.RESPONSE)
};
safaridriver.message.registerMessageType(safaridriver.message.Response.TYPE, safaridriver.message.Response.fromData_);
safaridriver.message.BaseLoadMessage = function(a, b) {
  safaridriver.message.Message.call(this, a);
  this.setField(safaridriver.message.BaseLoadMessage.IS_FRAME_FIELD_, !!b)
};
goog.inherits(safaridriver.message.BaseLoadMessage, safaridriver.message.Message);
safaridriver.message.BaseLoadMessage.IS_FRAME_FIELD_ = "isFrame";
safaridriver.message.BaseLoadMessage.prototype.isFrame = function() {
  return!!this.getField(safaridriver.message.BaseLoadMessage.IS_FRAME_FIELD_)
};
safaridriver.message.BaseLoadMessage.defineLoadMessageType = function(a) {
  var b = function(b) {
    safaridriver.message.BaseLoadMessage.call(this, a, b)
  };
  goog.inherits(b, safaridriver.message.BaseLoadMessage);
  b.TYPE = a;
  safaridriver.message.registerMessageType(a, function(a) {
    return new b(!!a[safaridriver.message.BaseLoadMessage.IS_FRAME_FIELD_])
  });
  return b
};
safaridriver.message.Load = safaridriver.message.BaseLoadMessage.defineLoadMessageType("load");
safaridriver.message.PendingFrame = safaridriver.message.BaseLoadMessage.defineLoadMessageType("pendingFrame");
safaridriver.message.PendingFrame.prototype.send = function() {
  throw Error("This message may only be sent synchronously.");
};
safaridriver.message.Unload = safaridriver.message.BaseLoadMessage.defineLoadMessageType("unload");
safaridriver.extension = {};
safaridriver.extension.Tab = function(a) {
  safaridriver.Tab.call(this, a);
  this.setLogger("safaridriver.extension.Tab");
  this.browserTab_ = a;
  a.addEventListener("close", goog.bind(this.dispose, this), !1);
  this.on(safaridriver.message.Load.TYPE, goog.bind(this.onLoad_, this));
  this.on(safaridriver.message.Unload.TYPE, goog.bind(this.onUnload_, this));
  this.on(safaridriver.message.PendingFrame.TYPE, goog.bind(this.onPendingFrame_, this))
};
goog.inherits(safaridriver.extension.Tab, safaridriver.Tab);
safaridriver.extension.Tab.prototype.frameIsLoading_ = !1;
safaridriver.extension.Tab.prototype.onLoad_ = function() {
  this.frameIsLoading_ = !1;
  this.notifyReady()
};
safaridriver.extension.Tab.prototype.onPendingFrame_ = function(a, b) {
  goog.asserts.assert("canLoad" === b.name, "Received an async pending frame query");
  this.log("onPendingFrame_(frameIsLoading=" + this.frameIsLoading_ + ")");
  b.message = this.frameIsLoading_;
  b.stopPropagation()
};
safaridriver.extension.Tab.prototype.onUnload_ = function(a) {
  this.log("Received unload notification: " + a);
  this.log("Is frame currently ready? " + this.isReady());
  a.isFrame() && this.isReady() ? this.frameIsLoading_ = !0 : (this.frameIsLoading_ = !1, this.notifyUnready())
};
safaridriver.extension.Tab.prototype.getBrowserTab = function() {
  return this.browserTab_
};
safaridriver.extension.Tab.prototype.loadsNewPage = function(a) {
  var b = new goog.Uri(this.browserTab_.url), c = new goog.Uri(a);
  return b.toString() === c.toString() ? !!b.getFragment() || /#$/.test(this.browserTab_.url) === /#$/.test(a) : b.toString() === c.toString() || b.setFragment("").toString() !== c.setFragment("").toString()
};
safaridriver.extension.Tab.prototype.send = function(a, b) {
  function c(a) {
    a || i.removeListener(safaridriver.message.Response.TYPE, e);
    i.removeListener(safaridriver.message.Unload.TYPE, f);
    i.browserTab_.removeEventListener("close", g, !0);
    clearTimeout(k)
  }
  function d() {
    i.log("Sending message: " + j);
    if(0 < b) {
      var d = goog.now();
      k = setTimeout(function() {
        c();
        h.isPending() && h.reject(new bot.Error(bot.ErrorCode.SCRIPT_TIMEOUT, 'Timed out awaiting response to command "' + a.getName() + '" after ' + (goog.now() - d) + " ms"))
      }, b)
    }
    i.addListener(safaridriver.message.Response.TYPE, e);
    i.addListener(safaridriver.message.Unload.TYPE, f);
    i.browserTab_.addEventListener("close", g, !0);
    j.send(i.browserTab_.page)
  }
  function e(b) {
    h.isPending() ? b.getId() !== a.getId() ? i.log("Ignoring response to another command: " + b + " (" + a.getId() + ")", goog.debug.Logger.Level.FINE) : h.isPending() ? (c(), i.log("Received response: " + b), h.resolve(b.getResponse())) : i.log("Received command response after promise has been resolved; perhaps it previously timed-out? " + b, goog.debug.Logger.Level.WARNING) : c()
  }
  function f() {
    c(!0);
    i.log("Tab has unloaded before we received a response; waiting for the page to reload before we try again");
    setTimeout(function() {
      i.whenReady(function() {
        h.isPending() && d()
      })
    }, 150)
  }
  function g() {
    c();
    h.isPending() && (i.log("The window closed before a response was received.returning a null-success response.", goog.debug.Logger.Level.WARNING), h.resolve(bot.response.createResponse(null)))
  }
  var h = new webdriver.promise.Deferred, j = new safaridriver.message.Command(a), i = this, k;
  this.whenReady(d);
  return h.promise
};
safaridriver.extension.Tab.prototype.visibleContentsAsDataURL = function(a) {
  var b = this.browserTab_;
  this.whenReady(function() {
    b.visibleContentsAsDataURL(a)
  })
};
webdriver.stacktrace = {};
webdriver.stacktrace.Snapshot = function(a) {
  this.slice_ = a || 0;
  this.error_ = Error();
  webdriver.stacktrace.CAN_CAPTURE_STACK_TRACE_ ? Error.captureStackTrace(this.error_, webdriver.stacktrace.Snapshot) : this.slice_ += 1;
  this.stack_ = this.error_.stack
};
webdriver.stacktrace.CAN_CAPTURE_STACK_TRACE_ = goog.isFunction(Error.captureStackTrace);
webdriver.stacktrace.Snapshot.prototype.parsedStack_ = null;
webdriver.stacktrace.Snapshot.prototype.getStacktrace = function() {
  if(goog.isNull(this.parsedStack_)) {
    var a = webdriver.stacktrace.parse(this.error_);
    this.slice_ && (a = goog.array.slice(a, this.slice_));
    this.parsedStack_ = a.join("\n");
    delete this.error_;
    delete this.slice_;
    delete this.stack_
  }
  return this.parsedStack_
};
webdriver.stacktrace.Frame_ = function(a, b, c, d) {
  this.context_ = a || "";
  this.name_ = b || "";
  this.alias_ = c || "";
  this.path_ = d || ""
};
webdriver.stacktrace.ANONYMOUS_FRAME_ = new webdriver.stacktrace.Frame_("", "", "", "");
webdriver.stacktrace.Frame_.prototype.getName = function() {
  return this.name_
};
webdriver.stacktrace.Frame_.prototype.isAnonymous = function() {
  return!this.name_ || "[object Object]" == this.context_
};
webdriver.stacktrace.Frame_.prototype.toString = function() {
  var a = this.context_;
  a && "new " !== a && (a += ".");
  var a = a + this.name_, a = a + (this.alias_ ? " [as " + this.alias_ + "]" : ""), b = this.path_ || "<anonymous>";
  return"    at " + (a ? a + " (" + b + ")" : b)
};
webdriver.stacktrace.MAX_FIREFOX_FRAMESTRING_LENGTH_ = 5E5;
webdriver.stacktrace.IDENTIFIER_PATTERN_ = "[a-zA-Z_$][\\w$]*";
webdriver.stacktrace.CONTEXT_PATTERN_ = "(" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + "(?:\\." + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")*)\\.";
webdriver.stacktrace.QUALIFIED_NAME_PATTERN_ = "(?:" + webdriver.stacktrace.CONTEXT_PATTERN_ + ")?(" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")";
webdriver.stacktrace.V8_ALIAS_PATTERN_ = "(?: \\[as (" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")\\])?";
webdriver.stacktrace.V8_FUNCTION_NAME_PATTERN_ = "(?:" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + "|<anonymous>)";
webdriver.stacktrace.V8_CONTEXT_PATTERN_ = "(?:((?:new )?(?:\\[object Object\\]|" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + "(?:\\." + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")*))\\.|(new ))";
webdriver.stacktrace.V8_FUNCTION_CALL_PATTERN_ = " (?:" + webdriver.stacktrace.V8_CONTEXT_PATTERN_ + ")?(" + webdriver.stacktrace.V8_FUNCTION_NAME_PATTERN_ + ")" + webdriver.stacktrace.V8_ALIAS_PATTERN_;
webdriver.stacktrace.URL_PATTERN_ = "((?:http|https|file)://[^\\s)]+|javascript:.*)";
webdriver.stacktrace.V8_LOCATION_PATTERN_ = " (?:\\((.*)\\)|(.*))";
webdriver.stacktrace.V8_STACK_FRAME_REGEXP_ = RegExp("^    at(?:" + webdriver.stacktrace.V8_FUNCTION_CALL_PATTERN_ + ")?" + webdriver.stacktrace.V8_LOCATION_PATTERN_ + "$");
webdriver.stacktrace.FIREFOX_FUNCTION_CALL_PATTERN_ = "(" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")?(?:\\(.*\\))?@";
webdriver.stacktrace.FIREFOX_STACK_FRAME_REGEXP_ = RegExp("^" + webdriver.stacktrace.FIREFOX_FUNCTION_CALL_PATTERN_ + "(?::0|" + webdriver.stacktrace.URL_PATTERN_ + ")$");
webdriver.stacktrace.OPERA_ANONYMOUS_FUNCTION_NAME_PATTERN_ = "<anonymous function(?:\\: " + webdriver.stacktrace.QUALIFIED_NAME_PATTERN_ + ")?>";
webdriver.stacktrace.OPERA_FUNCTION_CALL_PATTERN_ = "(?:(?:(" + webdriver.stacktrace.IDENTIFIER_PATTERN_ + ")|" + webdriver.stacktrace.OPERA_ANONYMOUS_FUNCTION_NAME_PATTERN_ + ")(?:\\(.*\\)))?@";
webdriver.stacktrace.OPERA_STACK_FRAME_REGEXP_ = RegExp("^" + webdriver.stacktrace.OPERA_FUNCTION_CALL_PATTERN_ + webdriver.stacktrace.URL_PATTERN_ + "?$");
webdriver.stacktrace.UNKNOWN_CLOSURE_FRAME_ = "> (unknown)";
webdriver.stacktrace.ANONYMOUS_CLOSURE_FRAME_ = "> anonymous";
webdriver.stacktrace.CLOSURE_FUNCTION_CALL_PATTERN_ = webdriver.stacktrace.QUALIFIED_NAME_PATTERN_ + "(?:\\(.*\\))?" + webdriver.stacktrace.V8_ALIAS_PATTERN_;
webdriver.stacktrace.CLOSURE_STACK_FRAME_REGEXP_ = RegExp("^> (?:" + webdriver.stacktrace.CLOSURE_FUNCTION_CALL_PATTERN_ + "(?: at )?)?(?:(.*:\\d+:\\d+)|" + webdriver.stacktrace.URL_PATTERN_ + ")?$");
webdriver.stacktrace.parseStackFrame_ = function(a) {
  var b = a.match(webdriver.stacktrace.V8_STACK_FRAME_REGEXP_);
  return b ? new webdriver.stacktrace.Frame_(b[1] || b[2], b[3], b[4], b[5] || b[6]) : a.length > webdriver.stacktrace.MAX_FIREFOX_FRAMESTRING_LENGTH_ ? webdriver.stacktrace.parseLongFirefoxFrame_(a) : (b = a.match(webdriver.stacktrace.FIREFOX_STACK_FRAME_REGEXP_)) ? new webdriver.stacktrace.Frame_("", b[1], "", b[2]) : (b = a.match(webdriver.stacktrace.OPERA_STACK_FRAME_REGEXP_)) ? new webdriver.stacktrace.Frame_(b[2], b[1] || b[3], "", b[4]) : a == webdriver.stacktrace.UNKNOWN_CLOSURE_FRAME_ || 
  a == webdriver.stacktrace.ANONYMOUS_CLOSURE_FRAME_ ? webdriver.stacktrace.ANONYMOUS_FRAME_ : (b = a.match(webdriver.stacktrace.CLOSURE_STACK_FRAME_REGEXP_)) ? new webdriver.stacktrace.Frame_(b[1], b[2], b[3], b[4] || b[5]) : null
};
webdriver.stacktrace.parseLongFirefoxFrame_ = function(a) {
  var b = a.indexOf("("), c = a.lastIndexOf("@"), d = a.lastIndexOf(":"), e = "";
  0 <= b && b < c && (e = a.substring(0, b));
  b = "";
  0 <= c && c + 1 < d && (b = a.substring(c + 1));
  return new webdriver.stacktrace.Frame_("", e, "", b)
};
webdriver.stacktrace.format = function(a) {
  var b = webdriver.stacktrace.parse(a).join("\n");
  a.stack = a.toString() + "\n" + b;
  return a
};
webdriver.stacktrace.parse = function(a) {
  var b = a.stack || a.stackTrace;
  if(!b) {
    return[]
  }
  a += "\n";
  goog.string.startsWith(b, a) && (b = b.substring(a.length));
  for(var b = b.replace(/\s*$/, "").split("\n"), a = [], c = 0;c < b.length;c++) {
    var d = webdriver.stacktrace.parseStackFrame_(b[c]);
    a.push(d || webdriver.stacktrace.ANONYMOUS_FRAME_)
  }
  return a
};
webdriver.stacktrace.get = function() {
  return(new webdriver.stacktrace.Snapshot(1)).getStacktrace()
};
/*
 Portions of this code are from the Dojo toolkit, received under the
 BSD License:
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
     this list of conditions and the following disclaimer in the documentation
     and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
     may be used to endorse or promote products derived from this software
     without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
*/
webdriver.promise = {};
webdriver.promise.Promise = function() {
};
webdriver.promise.Promise.prototype.cancel = function() {
  throw new TypeError('Unimplemented function: "cancel"');
};
webdriver.promise.Promise.prototype.isPending = function() {
  throw new TypeError('Unimplemented function: "isPending"');
};
webdriver.promise.Promise.prototype.then = function() {
  throw new TypeError('Unimplemented function: "then"');
};
webdriver.promise.Promise.prototype.addCallback = function(a, b) {
  return this.then(goog.bind(a, b))
};
webdriver.promise.Promise.prototype.addErrback = function(a, b) {
  return this.then(null, goog.bind(a, b))
};
webdriver.promise.Promise.prototype.addBoth = function(a, b) {
  a = goog.bind(a, b);
  return this.then(a, a)
};
webdriver.promise.Promise.prototype.addCallbacks = function(a, b, c) {
  return this.then(goog.bind(a, c), goog.bind(b, c))
};
webdriver.promise.Deferred = function(a) {
  function b() {
    return i == webdriver.promise.Deferred.State_.PENDING
  }
  function c(a, c) {
    if(!b()) {
      throw Error("This Deferred has already been resolved.");
    }
    i = a;
    for(k = c;h.length;) {
      d(h.shift())
    }
    if(!j && i == webdriver.promise.Deferred.State_.REJECTED) {
      var e = webdriver.promise.Application.getInstance();
      e.pendingRejections_ += 1;
      setTimeout(function() {
        e.pendingRejections_ -= 1;
        j || e.abortFrame_(k)
      }, 0)
    }
  }
  function d(a) {
    var b = i == webdriver.promise.Deferred.State_.RESOLVED ? a.callback : a.errback;
    b ? (b = webdriver.promise.Application.getInstance().runInNewFrame_(goog.partial(b, k)), webdriver.promise.asap(b, a.deferred.resolve, a.deferred.reject)) : i == webdriver.promise.Deferred.State_.REJECTED ? a.deferred.reject(k) : a.deferred.resolve(k)
  }
  function e(a) {
    webdriver.promise.isPromise(a) && a !== m ? a instanceof webdriver.promise.Deferred ? a.then(goog.partial(c, webdriver.promise.Deferred.State_.RESOLVED), goog.partial(c, webdriver.promise.Deferred.State_.REJECTED)) : webdriver.promise.asap(a, e, f) : c(webdriver.promise.Deferred.State_.RESOLVED, a)
  }
  function f(a) {
    webdriver.promise.isPromise(a) && a !== m ? a instanceof webdriver.promise.Deferred ? a.then(goog.partial(c, webdriver.promise.Deferred.State_.REJECTED), goog.partial(c, webdriver.promise.Deferred.State_.REJECTED)) : webdriver.promise.asap(a, f, f) : c(webdriver.promise.Deferred.State_.REJECTED, a)
  }
  function g(c) {
    if(!b()) {
      throw Error("This Deferred has already been resolved.");
    }
    a && (c = a(c) || c);
    b() && f(c)
  }
  webdriver.promise.Promise.call(this);
  var h = [], j = !1, i = webdriver.promise.Deferred.State_.PENDING, k, l = new webdriver.promise.Promise, m = this;
  this.promise = l;
  this.promise.then = this.then = function(a, b) {
    if(!a && !b) {
      return l
    }
    j = !0;
    var c = {callback:a, errback:b, deferred:new webdriver.promise.Deferred(g)};
    i == webdriver.promise.Deferred.State_.PENDING ? h.push(c) : d(c);
    return c.deferred.promise
  };
  this.promise.cancel = this.cancel = g;
  this.promise.isPending = this.isPending = b;
  this.resolve = this.callback = e;
  this.reject = this.errback = f;
  goog.exportProperty(this, "then", this.then);
  goog.exportProperty(this, "cancel", g);
  goog.exportProperty(this, "resolve", e);
  goog.exportProperty(this, "reject", f);
  goog.exportProperty(this, "isPending", b);
  goog.exportProperty(this, "promise", this.promise);
  goog.exportProperty(this.promise, "then", this.then);
  goog.exportProperty(this.promise, "cancel", g);
  goog.exportProperty(this.promise, "isPending", b)
};
goog.inherits(webdriver.promise.Deferred, webdriver.promise.Promise);
webdriver.promise.Deferred.State_ = {REJECTED:-1, PENDING:0, RESOLVED:1};
webdriver.promise.isPromise = function(a) {
  return!!a && goog.isObject(a) && goog.isFunction(a.then)
};
webdriver.promise.delayed = function(a) {
  var b, c = new webdriver.promise.Deferred(function() {
    clearTimeout(b)
  });
  b = setTimeout(c.resolve, a);
  return c.promise
};
webdriver.promise.resolved = function(a) {
  if(a instanceof webdriver.promise.Promise) {
    return a
  }
  var b = new webdriver.promise.Deferred;
  b.resolve(a);
  return b.promise
};
webdriver.promise.rejected = function(a) {
  var b = new webdriver.promise.Deferred;
  b.reject(a);
  return b.promise
};
webdriver.promise.checkedNodeCall = function(a) {
  var b = new webdriver.promise.Deferred(function() {
    throw Error("This Deferred may not be cancelled");
  });
  try {
    a(function(a, c) {
      b.isPending() && (a ? b.reject(a) : b.resolve(c))
    })
  }catch(c) {
    b.isPending() && b.reject(c)
  }
  return b.promise
};
webdriver.promise.when = function(a, b, c) {
  function d(a, b) {
    e.isPending() && a(b)
  }
  if(a instanceof webdriver.promise.Promise) {
    return a.then(b, c)
  }
  var e = new webdriver.promise.Deferred;
  webdriver.promise.asap(a, goog.partial(d, e.resolve), goog.partial(d, e.reject));
  return e.then(b, c)
};
webdriver.promise.asap = function(a, b, c) {
  webdriver.promise.isPromise(a) ? a.then(b, c) : a && goog.isObject(a) && goog.isFunction(a.addCallbacks) ? a.addCallbacks(b, c) : b && b(a)
};
webdriver.promise.fullyResolved = function(a) {
  return webdriver.promise.isPromise(a) ? webdriver.promise.when(a, webdriver.promise.fullyResolveValue_) : webdriver.promise.fullyResolveValue_(a)
};
webdriver.promise.fullyResolveValue_ = function(a) {
  switch(goog.typeOf(a)) {
    case "array":
      return webdriver.promise.fullyResolveKeys_(a, a.length, function(a, c, d) {
        for(var e = a.length, f = 0;f < e;++f) {
          c.call(d, a[f], f, a)
        }
      });
    case "object":
      return webdriver.promise.isPromise(a) ? a : goog.isNumber(a.nodeType) ? webdriver.promise.resolved(a) : webdriver.promise.fullyResolveKeys_(a, goog.object.getKeys(a).length, goog.object.forEach);
    default:
      return webdriver.promise.resolved(a)
  }
};
webdriver.promise.fullyResolveKeys_ = function(a, b, c) {
  if(!b) {
    return webdriver.promise.resolved(a)
  }
  var d = 0, e = new webdriver.promise.Deferred;
  c(a, function(c, g) {
    function h() {
      ++d == b && e.isPending() && e.resolve(a)
    }
    var j = goog.typeOf(c);
    if("array" != j && "object" != j) {
      return h()
    }
    webdriver.promise.fullyResolved(c).then(function(b) {
      e.isPending() && (a[g] = b, h())
    }, function(a) {
      e.isPending() && e.reject(a)
    })
  });
  return e.promise
};
webdriver.promise.Application = function() {
  webdriver.EventEmitter.call(this);
  this.history_ = []
};
goog.inherits(webdriver.promise.Application, webdriver.EventEmitter);
goog.addSingletonGetter(webdriver.promise.Application);
webdriver.promise.Application.EventType = {IDLE:"idle", SCHEDULE_TASK:"scheduleTask", UNCAUGHT_EXCEPTION:"uncaughtException"};
webdriver.promise.Application.EVENT_LOOP_FREQUENCY = 10;
webdriver.promise.Application.prototype.activeFrame_ = null;
webdriver.promise.Application.prototype.schedulingFrame_ = null;
webdriver.promise.Application.prototype.shutdownId_ = null;
webdriver.promise.Application.prototype.eventLoopId_ = null;
webdriver.promise.Application.prototype.pendingRejections_ = 0;
webdriver.promise.Application.prototype.numAbortedFrames_ = 0;
webdriver.promise.Application.prototype.reset = function() {
  this.activeFrame_ = null;
  this.clearHistory();
  this.removeAllListeners();
  this.cancelShutdown_();
  this.cancelEventLoop_()
};
webdriver.promise.Application.prototype.getHistory = function() {
  for(var a = [], b = this.activeFrame_;b;) {
    var c = b.getPendingTask();
    c && a.push(c);
    b = b.getParent()
  }
  a = goog.array.concat(this.history_, a);
  return goog.array.map(a, function(a) {
    return a.toString()
  })
};
webdriver.promise.Application.prototype.clearHistory = function() {
  this.history_ = []
};
webdriver.promise.Application.prototype.trimHistory_ = function() {
  this.numAbortedFrames_ && (goog.array.splice(this.history_, this.history_.length - this.numAbortedFrames_, this.numAbortedFrames_), this.numAbortedFrames_ = 0);
  this.history_.pop()
};
webdriver.promise.Application.ANNOTATION_PROPERTY_ = "webdriver_promise_error_";
webdriver.promise.Application.prototype.annotateError = function(a) {
  if(a[webdriver.promise.Application.ANNOTATION_PROPERTY_]) {
    return a
  }
  a = webdriver.stacktrace.format(a);
  a.stack += ["\n==== async task ====\n", this.getHistory().join("\n==== async task ====\n")].join("");
  a[webdriver.promise.Application.ANNOTATION_PROPERTY_] = !0;
  return a
};
webdriver.promise.Application.prototype.getSchedule = function() {
  return this.activeFrame_ ? this.activeFrame_.getRoot().toString() : "[]"
};
webdriver.promise.Application.prototype.schedule = function(a, b) {
  this.cancelShutdown_();
  this.activeFrame_ || (this.activeFrame_ = new webdriver.promise.Application.Frame_);
  var c = new webdriver.stacktrace.Snapshot(1), c = new webdriver.promise.Application.Task_(b, a, c);
  (this.schedulingFrame_ || this.activeFrame_).addChild(c);
  this.emit(webdriver.promise.Application.EventType.SCHEDULE_TASK);
  this.scheduleEventLoopStart_();
  return c.promise
};
webdriver.promise.Application.prototype.scheduleTimeout = function(a, b) {
  return this.schedule(a, function() {
    return webdriver.promise.delayed(b)
  })
};
webdriver.promise.Application.prototype.scheduleWait = function(a, b, c, d) {
  var e = Math.min(c, 100), f = this;
  return this.schedule(a, function() {
    function a() {
      var k = f.runInNewFrame_(b);
      return webdriver.promise.when(k, function(b) {
        var f = goog.now() - h;
        b ? (i.isWaiting = !1, j.resolve(b)) : f >= c ? j.reject(Error((d ? d + "\n" : "") + "Wait timed out after " + f + "ms")) : setTimeout(a, e)
      }, j.reject)
    }
    var h = goog.now(), j = new webdriver.promise.Deferred, i = f.activeFrame_;
    i.isWaiting = !0;
    a();
    return j.promise
  })
};
webdriver.promise.Application.prototype.scheduleEventLoopStart_ = function() {
  this.eventLoopId_ || (this.eventLoopId_ = setInterval(goog.bind(this.runEventLoop_, this), webdriver.promise.Application.EVENT_LOOP_FREQUENCY))
};
webdriver.promise.Application.prototype.cancelEventLoop_ = function() {
  this.eventLoopId_ && (clearInterval(this.eventLoopId_), this.eventLoopId_ = null)
};
webdriver.promise.Application.prototype.runEventLoop_ = function() {
  if(!this.pendingRejections_) {
    if(this.activeFrame_) {
      var a;
      if(!this.activeFrame_.getPendingTask() && (a = this.getNextTask_())) {
        var b = this.activeFrame_;
        b.setPendingTask(a);
        var c = goog.bind(function() {
          this.history_.push(a);
          b.setPendingTask(null)
        }, this);
        this.trimHistory_();
        var d = this.runInNewFrame_(a.execute, !0), e = this;
        webdriver.promise.asap(d, function(b) {
          c();
          a.resolve(b)
        }, function(b) {
          c();
          a.reject(e.annotateError(b))
        })
      }
    }else {
      this.commenceShutdown_()
    }
  }
};
webdriver.promise.Application.prototype.getNextTask_ = function() {
  var a = this.activeFrame_.getFirstChild();
  if(!a) {
    return this.activeFrame_.isWaiting || this.resolveFrame_(this.activeFrame_), null
  }
  if(a instanceof webdriver.promise.Application.Frame_) {
    return this.activeFrame_ = a, this.getNextTask_()
  }
  a.getParent().removeChild(a);
  return a
};
webdriver.promise.Application.prototype.resolveFrame_ = function(a) {
  this.activeFrame_ === a && (this.activeFrame_ = a.getParent());
  a.getParent() && a.getParent().removeChild(a);
  this.trimHistory_();
  a.resolve();
  this.activeFrame_ || this.commenceShutdown_()
};
webdriver.promise.Application.prototype.abortFrame_ = function(a) {
  goog.isObject(a) && (goog.isString(a.message) && goog.isString(a.stack)) && this.annotateError(a);
  this.numAbortedFrames_++;
  if(this.activeFrame_) {
    var b = this.activeFrame_.getParent();
    b && b.removeChild(this.activeFrame_);
    var c = this.activeFrame_;
    this.activeFrame_ = b;
    c.reject(a)
  }else {
    this.abortNow_(a)
  }
};
webdriver.promise.Application.prototype.runInNewFrame_ = function(a, b) {
  function c() {
    var a = d.getParent();
    a && a.removeChild(d);
    e.activeFrame_ = f
  }
  var d = new webdriver.promise.Application.Frame_, e = this, f = this.activeFrame_;
  try {
    this.activeFrame_ ? this.activeFrame_.addChild(d) : this.activeFrame_ = d;
    b && (this.activeFrame_ = d);
    try {
      this.schedulingFrame_ = d;
      var g = a()
    }finally {
      this.schedulingFrame_ = null
    }
    d.lockFrame();
    return!d.children_.length ? (c(), g) : d.then(function() {
      return g
    }, function(a) {
      if(g instanceof webdriver.promise.Promise && g.isPending()) {
        g.cancel(a);
        return g
      }
      throw a;
    })
  }catch(h) {
    return c(), webdriver.promise.rejected(h)
  }
};
webdriver.promise.Application.prototype.commenceShutdown_ = function() {
  if(!this.shutdownId_) {
    this.cancelEventLoop_();
    var a = this;
    a.shutdownId_ = setTimeout(function() {
      a.shutdownId_ = null;
      a.emit(webdriver.promise.Application.EventType.IDLE)
    }, 0)
  }
};
webdriver.promise.Application.prototype.cancelShutdown_ = function() {
  this.shutdownId_ && (clearTimeout(this.shutdownId_), this.shutdownId_ = null)
};
webdriver.promise.Application.prototype.abortNow_ = function(a) {
  this.activeFrame_ = null;
  this.cancelShutdown_();
  this.cancelEventLoop_();
  this.listeners(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION).length ? this.emit(webdriver.promise.Application.EventType.UNCAUGHT_EXCEPTION, a) : setTimeout(function() {
    throw a;
  }, 0)
};
webdriver.promise.Application.Node_ = function() {
  webdriver.promise.Deferred.call(this)
};
goog.inherits(webdriver.promise.Application.Node_, webdriver.promise.Deferred);
webdriver.promise.Application.Node_.prototype.parent_ = null;
webdriver.promise.Application.Node_.prototype.getParent = function() {
  return this.parent_
};
webdriver.promise.Application.Node_.prototype.setParent = function(a) {
  this.parent_ = a
};
webdriver.promise.Application.Node_.prototype.getRoot = function() {
  for(var a = this;a.parent_;) {
    a = a.parent_
  }
  return a
};
webdriver.promise.Application.Frame_ = function() {
  webdriver.promise.Application.Node_.call(this);
  this.children_ = []
};
goog.inherits(webdriver.promise.Application.Frame_, webdriver.promise.Application.Node_);
webdriver.promise.Application.Frame_.prototype.pendingTask_ = null;
webdriver.promise.Application.Frame_.prototype.isActive_ = !1;
webdriver.promise.Application.Frame_.prototype.isLocked_ = !1;
webdriver.promise.Application.Frame_.prototype.lastInsertedChild_ = null;
webdriver.promise.Application.Frame_.prototype.getPendingTask = function() {
  return this.pendingTask_
};
webdriver.promise.Application.Frame_.prototype.setPendingTask = function(a) {
  this.pendingTask_ = a
};
webdriver.promise.Application.Frame_.prototype.lockFrame = function() {
  this.isLocked_ = !0
};
webdriver.promise.Application.Frame_.prototype.addChild = function(a) {
  if(this.lastInsertedChild_ && this.lastInsertedChild_ instanceof webdriver.promise.Application.Frame_ && !this.lastInsertedChild_.isLocked_) {
    this.lastInsertedChild_.addChild(a)
  }else {
    if(a.setParent(this), this.isActive_ && a instanceof webdriver.promise.Application.Frame_) {
      var b = 0;
      this.lastInsertedChild_ instanceof webdriver.promise.Application.Frame_ && (b = goog.array.indexOf(this.children_, this.lastInsertedChild_) + 1);
      goog.array.insertAt(this.children_, a, b);
      this.lastInsertedChild_ = a
    }else {
      this.lastInsertedChild_ = a, this.children_.push(a)
    }
  }
};
webdriver.promise.Application.Frame_.prototype.getFirstChild = function() {
  this.isActive_ = !0;
  return this.children_[0]
};
webdriver.promise.Application.Frame_.prototype.removeChild = function(a) {
  var b = goog.array.indexOf(this.children_, a);
  a.setParent(null);
  goog.array.removeAt(this.children_, b);
  this.lastInsertedChild_ === a && (this.lastInsertedChild_ = null)
};
webdriver.promise.Application.Frame_.prototype.toString = function() {
  return"[" + goog.array.map(this.children_, function(a) {
    return a.toString()
  }).join(",") + "]"
};
webdriver.promise.Application.Task_ = function(a, b, c) {
  webdriver.promise.Application.Node_.call(this);
  this.execute = a;
  this.description_ = b;
  this.snapshot_ = c
};
goog.inherits(webdriver.promise.Application.Task_, webdriver.promise.Application.Node_);
webdriver.promise.Application.Task_.prototype.getDescription = function() {
  return this.description_
};
webdriver.promise.Application.Task_.prototype.toString = function() {
  var a = this.snapshot_.getStacktrace(), b = this.description_;
  a && (b += "\n" + a);
  return b
};
safaridriver.extension.commands = {};
safaridriver.extension.commands.LOG_ = goog.debug.Logger.getLogger("safaridriver.extension.commands");
safaridriver.extension.commands.describeSession = function(a) {
  return a.getCapabilities()
};
safaridriver.extension.commands.closeTab = function(a) {
  a.getCommandTab().getBrowserTab().close()
};
safaridriver.extension.commands.getWindowHandle = function(a) {
  return a.getCommandTab().getId()
};
safaridriver.extension.commands.getWindowHandles = function(a) {
  return a.getTabIds()
};
safaridriver.extension.commands.takeScreenshot = function(a) {
  var b = new webdriver.promise.Deferred;
  a.getCommandTab().visibleContentsAsDataURL(function(a) {
    b.resolve(a.substring(22))
  });
  return b.promise
};
safaridriver.extension.commands.loadUrl = function(a, b) {
  var c = b.getParameter("url");
  if(!c) {
    throw Error('Invalid command: missing "url" parameter');
  }
  var d = new goog.Uri(c);
  if("file" === d.getScheme()) {
    throw Error("Unsupported URL protocol: " + c + "; for more information, see http://code.google.com/p/selenium/issues/detail?id=3773");
  }
  var e = new webdriver.promise.Deferred, f = a.getCommandTab();
  f.whenReady(function() {
    function c() {
      e.isPending() && (safaridriver.extension.commands.LOG_.info("Page load finished; returning"), e.resolve())
    }
    var h = f.loadsNewPage(d);
    if(h) {
      f.once(safaridriver.message.Load.TYPE, c)
    }
    safaridriver.extension.commands.sendCommand(a, b).then(function() {
      !h && e.isPending() && (safaridriver.extension.commands.LOG_.info("Not expecting a new page load; returning"), e.resolve())
    }, function(a) {
      e.isPending() && (safaridriver.extension.commands.LOG_.severe("Error while loading page; failing", a), f.removeListener(safaridriver.message.Load.TYPE, c), e.reject(a))
    })
  });
  return e.promise
};
safaridriver.extension.commands.refresh = function(a, b) {
  var c = new webdriver.promise.Deferred, d = a.getCommandTab();
  d.whenReady(function() {
    function e() {
      c.isPending() && c.resolve()
    }
    d.once(safaridriver.message.Load.TYPE, e);
    safaridriver.extension.commands.sendCommand(a, b).addErrback(function(a) {
      c.isPending() && (d.removeListener(safaridriver.message.Load.TYPE, e), c.reject(a))
    })
  });
  return c.promise
};
safaridriver.extension.commands.implicitlyWait = function(a, b) {
  a.setImplicitWait(b.getParameter("ms") || 0)
};
safaridriver.extension.commands.setScriptTimeout = function(a, b) {
  a.setScriptTimeout(b.getParameter("ms") || 0)
};
safaridriver.extension.commands.findElement = function(a, b) {
  function c() {
    goog.isDef(e) || (e = goog.now());
    return safaridriver.extension.commands.sendCommand(a, b).then(d)
  }
  function d(d) {
    if(d.status !== bot.ErrorCode.SUCCESS) {
      f.resolve(d)
    }else {
      var h = d.value;
      (!goog.isDefAndNotNull(h) || goog.isArray(h) && !h.length) && 0 < a.getImplicitWait() && goog.now() - e < a.getImplicitWait() ? setTimeout(c, 100) : h ? f.resolve(d) : (d = new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT, "Could not find element: " + JSON.stringify(b.getParameters())), f.reject(d))
    }
  }
  var e, f = new webdriver.promise.Deferred;
  a.getCommandTab().whenReady(c);
  return f.promise
};
safaridriver.extension.commands.DEFAULT_COMMAND_TIMEOUT_ = 3E4;
safaridriver.extension.commands.sendCommand = function(a, b, c) {
  c = (c || 0) + safaridriver.extension.commands.DEFAULT_COMMAND_TIMEOUT_;
  return(a instanceof safaridriver.extension.Tab ? a : a.getCommandTab()).send(b, c)
};
safaridriver.extension.commands.switchToWindow = function(a, b) {
  function c(b) {
    try {
      var c = a.getCommandTab();
      c.whenReady(function() {
        var e = new safaridriver.Command(goog.string.getRandomString(), webdriver.CommandName.SWITCH_TO_FRAME, {id:null});
        c.send(e);
        a.setCommandTab(b);
        d.resolve()
      })
    }catch(e) {
      if(e.code !== bot.ErrorCode.NO_SUCH_WINDOW) {
        throw e;
      }
      a.setCommandTab(b);
      d.resolve()
    }
  }
  var d = new webdriver.promise.Deferred, e = b.getParameter("name"), f = a.getTab(e);
  if(f) {
    return c(f), d.promise
  }
  var g = a.getTabIds();
  safaridriver.extension.commands.LOG_.info("Window handle not found; collecting open window names");
  f = goog.array.map(g, function(c) {
    c = a.getTab(c);
    return!c ? null : safaridriver.extension.commands.sendCommand(c, b).then(bot.response.checkResponse).then(function(a) {
      return a.value
    })
  });
  webdriver.promise.fullyResolved(f).then(function(b) {
    safaridriver.extension.commands.LOG_.info("Open window names: " + JSON.stringify(b));
    b = goog.array.findIndex(b, function(a) {
      return a === e
    });
    0 > b ? d.reject(new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, "No such window: " + e)) : (b = a.getTab(g[b]), c(b))
  }, d.reject);
  return d.promise
};
safaridriver.extension.commands.sendWindowCommand = function(a, b) {
  var c = b.getParameter("windowHandle"), d;
  if("current" === c) {
    d = a.getCommandTab()
  }else {
    if(!(d = a.getTab(c))) {
      throw new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, "No such window: " + c);
    }
  }
  return safaridriver.extension.commands.sendCommand(d, b)
};
safaridriver.extension.commands.executeAsyncScript = function(a, b) {
  var c = a.getScriptTimeout();
  b.setParameter("timeout", c);
  return safaridriver.extension.commands.sendCommand(a, b, c)
};
safaridriver.extension.commands.handleNoAlertsPresent = function() {
  throw new bot.Error(bot.ErrorCode.NO_MODAL_DIALOG_OPEN, "The SafariDriver does not support alert handling. To prevent tests from handing when an alert is opened, they are always immediately dismissed. For more information, see http://code.google.com/p/selenium/issues/detail?id=3862");
};
goog.debug.RelativeTimeProvider = function() {
  this.relativeTimeStart_ = goog.now()
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function(a) {
  this.relativeTimeStart_ = a
};
goog.debug.RelativeTimeProvider.prototype.reset = function() {
  this.set(goog.now())
};
goog.debug.RelativeTimeProvider.prototype.get = function() {
  return this.relativeTimeStart_
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function() {
  return goog.debug.RelativeTimeProvider.defaultInstance_
};
goog.debug.Formatter = function(a) {
  this.prefix_ = a || "";
  this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance()
};
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.setStartTimeProvider = function(a) {
  this.startTimeProvider_ = a
};
goog.debug.Formatter.prototype.getStartTimeProvider = function() {
  return this.startTimeProvider_
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function() {
  this.startTimeProvider_.reset()
};
goog.debug.Formatter.getDateTimeStamp_ = function(a) {
  a = new Date(a.getMillis());
  return goog.debug.Formatter.getTwoDigitString_(a.getFullYear() - 2E3) + goog.debug.Formatter.getTwoDigitString_(a.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_(a.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_(a.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor(a.getMilliseconds() / 10))
};
goog.debug.Formatter.getTwoDigitString_ = function(a) {
  return 10 > a ? "0" + a : String(a)
};
goog.debug.Formatter.getRelativeTime_ = function(a, b) {
  var c = (a.getMillis() - b) / 1E3, d = c.toFixed(3), e = 0;
  if(1 > c) {
    e = 2
  }else {
    for(;100 > c;) {
      e++, c *= 10
    }
  }
  for(;0 < e--;) {
    d = " " + d
  }
  return d
};
goog.debug.HtmlFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function(a) {
  var b;
  switch(a.getLevel().value) {
    case goog.debug.Logger.Level.SHOUT.value:
      b = "dbg-sh";
      break;
    case goog.debug.Logger.Level.SEVERE.value:
      b = "dbg-sev";
      break;
    case goog.debug.Logger.Level.WARNING.value:
      b = "dbg-w";
      break;
    case goog.debug.Logger.Level.INFO.value:
      b = "dbg-i";
      break;
    default:
      b = "dbg-f"
  }
  var c = [];
  c.push(this.prefix_, " ");
  this.showAbsoluteTime && c.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && c.push("[", goog.string.whitespaceEscape(goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get())), "s] ");
  this.showLoggerName && c.push("[", goog.string.htmlEscape(a.getLoggerName()), "] ");
  c.push('<span class="', b, '">', goog.string.newLineToBr(goog.string.whitespaceEscape(goog.string.htmlEscape(a.getMessage()))));
  this.showExceptionText && a.getException() && c.push("<br>", goog.string.newLineToBr(goog.string.whitespaceEscape(a.getExceptionText() || "")));
  c.push("</span><br>");
  return c.join("")
};
goog.debug.TextFormatter = function(a) {
  goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function(a) {
  var b = [];
  b.push(this.prefix_, " ");
  this.showAbsoluteTime && b.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && b.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && b.push("[", a.getLoggerName(), "] ");
  this.showSeverityLevel && b.push("[", a.getLevel().name, "] ");
  b.push(a.getMessage(), "\n");
  this.showExceptionText && a.getException() && b.push(a.getExceptionText(), "\n");
  return b.join("")
};
safaridriver.console = {};
safaridriver.console.init = function() {
  var a = new goog.debug.TextFormatter;
  a.showAbsoluteTime = !1;
  a.showExceptionText = !0;
  goog.debug.LogManager.getRoot().addHandler(function(b) {
    var c = a.formatRecord(b);
    switch(b.getLevel()) {
      case goog.debug.Logger.Level.SHOUT:
        console.group(c);
        console.groupEnd();
        break;
      case goog.debug.Logger.Level.SEVERE:
        console.error(c);
        break;
      case goog.debug.Logger.Level.WARNING:
        console.warn(c);
        break;
      case goog.debug.Logger.Level.INFO:
        console.info(c);
        break;
      default:
        console.debug(c)
    }
  })
};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.Disposable = function() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (this.creationStack = Error().stack, goog.Disposable.instances_[goog.getUid(this)] = this)
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for(b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)])
  }
  return a
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if(!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var a = goog.getUid(this);
    if(goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a]
  }
};
goog.Disposable.prototype.registerDisposable = function(a) {
  this.dependentDisposables_ || (this.dependentDisposables_ = []);
  this.dependentDisposables_.push(a)
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
  this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []);
  this.onDisposeCallbacks_.push(goog.bind(a, b))
};
goog.Disposable.prototype.disposeInternal = function() {
  this.dependentDisposables_ && goog.disposeAll.apply(null, this.dependentDisposables_);
  if(this.onDisposeCallbacks_) {
    for(;this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()()
    }
  }
};
goog.Disposable.isDisposed = function(a) {
  return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
};
goog.dispose = function(a) {
  a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
  }
};
safaridriver.alert = {};
safaridriver.alert.createResponse = function(a) {
  return{status:bot.ErrorCode.MODAL_DIALOG_OPENED, value:{message:"A modal dialog was opened. The SafariDriver does not support interacting with modal dialogs. To avoid hanging your test, the alert has been dismissed. For more information, see http://code.google.com/p/selenium/issues/detail?id=3862", alert:{text:a}}}
};
safaridriver.extension.Server = function(a) {
  goog.Disposable.call(this);
  this.log_ = goog.debug.Logger.getLogger("safaridriver.extension.Server");
  this.session_ = a;
  this.ready_ = new webdriver.promise.Deferred;
  this.disposeCallbacks_ = []
};
goog.inherits(safaridriver.extension.Server, goog.Disposable);
safaridriver.extension.Server.COMMAND_MAP_ = {};
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.NEW_SESSION] = safaridriver.extension.commands.describeSession;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DESCRIBE_SESSION] = safaridriver.extension.commands.describeSession;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.QUIT] = goog.nullFunction;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLOSE] = safaridriver.extension.commands.closeTab;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_CURRENT_WINDOW_HANDLE] = safaridriver.extension.commands.getWindowHandle;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_HANDLES] = safaridriver.extension.commands.getWindowHandles;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_CURRENT_URL] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_TITLE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_PAGE_SOURCE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET] = safaridriver.extension.commands.loadUrl;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.REFRESH] = safaridriver.extension.commands.refresh;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_BACK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_FORWARD] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GO_BACK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.ADD_COOKIE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ALL_COOKIES] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DELETE_ALL_COOKIES] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DELETE_COOKIE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IMPLICITLY_WAIT] = safaridriver.extension.commands.implicitlyWait;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_ELEMENT] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_ELEMENTS] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_CHILD_ELEMENT] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.FIND_CHILD_ELEMENTS] = safaridriver.extension.commands.findElement;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ACTIVE_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLEAR_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLICK_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SUBMIT_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_TEXT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_TAG_NAME] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_SELECTED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_ENABLED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.IS_ELEMENT_DISPLAYED] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_LOCATION] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_LOCATION_IN_VIEW] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_SIZE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_ATTRIBUTE] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ELEMENT_VALUE_OF_CSS_PROPERTY] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.ELEMENT_EQUALS] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SEND_KEYS_TO_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.CLICK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DOUBLE_CLICK] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOUSE_DOWN] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOUSE_UP] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MOVE_TO] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SEND_KEYS_TO_ACTIVE_ELEMENT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SWITCH_TO_FRAME] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SWITCH_TO_WINDOW] = safaridriver.extension.commands.switchToWindow;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_WINDOW_SIZE] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_WINDOW_POSITION] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_SIZE] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_WINDOW_POSITION] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.MAXIMIZE_WINDOW] = safaridriver.extension.commands.sendWindowCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.EXECUTE_SCRIPT] = safaridriver.extension.commands.sendCommand;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.EXECUTE_ASYNC_SCRIPT] = safaridriver.extension.commands.executeAsyncScript;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_SCRIPT_TIMEOUT] = safaridriver.extension.commands.setScriptTimeout;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SCREENSHOT] = safaridriver.extension.commands.takeScreenshot;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ALERT] = safaridriver.extension.commands.handleNoAlertsPresent;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.ACCEPT_ALERT] = safaridriver.extension.commands.handleNoAlertsPresent;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.DISMISS_ALERT] = safaridriver.extension.commands.handleNoAlertsPresent;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.GET_ALERT_TEXT] = safaridriver.extension.commands.handleNoAlertsPresent;
safaridriver.extension.Server.COMMAND_MAP_[webdriver.CommandName.SET_ALERT_VALUE] = safaridriver.extension.commands.handleNoAlertsPresent;
safaridriver.extension.Server.prototype.webSocket_ = null;
safaridriver.extension.Server.prototype.disposeInternal = function() {
  this.logMessage_("Disposing of server", goog.debug.Logger.Level.FINE);
  this.webSocket_ && (this.ready_.isPending() && this.ready_.cancel(Error("Server has been disposed")), this.webSocket_.close());
  for(;this.disposeCallbacks_.length;) {
    this.disposeCallbacks_.shift()()
  }
  delete this.disposeCallbacks_;
  delete this.log_;
  delete this.session_;
  delete this.ready_;
  delete this.webSocket_;
  safaridriver.extension.Server.superClass_.disposeInternal.call(this)
};
safaridriver.extension.Server.prototype.getSession = function() {
  return this.session_
};
safaridriver.extension.Server.prototype.onDispose = function(a) {
  this.isDisposed() ? a() : this.disposeCallbacks_.push(a)
};
safaridriver.extension.Server.prototype.connect = function(a) {
  if(this.isDisposed()) {
    throw Error("This server has been disposed!");
  }
  if(this.webSocket_) {
    throw Error("This server has already connected!");
  }
  this.logMessage_("Connecting to " + a);
  this.webSocket_ = new WebSocket(a);
  this.webSocket_.onopen = goog.bind(this.onOpen_, this);
  this.webSocket_.onclose = goog.bind(this.onClose_, this);
  this.webSocket_.onmessage = goog.bind(this.onMessage_, this);
  this.webSocket_.onerror = goog.bind(this.onError_, this);
  return this.ready_.promise
};
safaridriver.extension.Server.prototype.execute = function(a, b) {
  var a = new safaridriver.Command(goog.string.getRandomString(), a.getName(), a.getParameters()), c = safaridriver.extension.Server.COMMAND_MAP_[a.getName()];
  if(!c) {
    return this.logMessage_("Unknown command: " + a.getName(), goog.debug.Logger.Level.SEVERE), webdriver.promise.rejected(bot.response.createErrorResponse(Error("Unknown command: " + a.getName())))
  }
  this.logMessage_("Scheduling command: " + a.getName(), goog.debug.Logger.Level.FINER);
  var d = this.session_.getId() + "::" + a.getName(), c = goog.bind(this.executeCommand_, this, a, c), d = webdriver.promise.Application.getInstance().schedule(d, c).then(bot.response.createResponse, bot.response.createErrorResponse).addBoth(function(a) {
    this.session_.setCurrentCommand(null);
    return a
  }, this);
  b && d.then(bot.response.checkResponse).then(goog.partial(b, null), b);
  return d
};
safaridriver.extension.Server.prototype.executeCommand_ = function(a, b) {
  this.logMessage_("Executing command: " + a.getName());
  var c = this.session_.getUnhandledAlertText();
  if(!goog.isNull(c)) {
    return this.session_.setUnhandledAlertText(null), safaridriver.alert.createResponse(c)
  }
  this.session_.setCurrentCommand(a);
  return b(this.session_, a)
};
safaridriver.extension.Server.prototype.logMessage_ = function(a, b) {
  this.log_.log(b || goog.debug.Logger.Level.INFO, "[" + this.session_.getId() + "] " + a)
};
safaridriver.extension.Server.prototype.onOpen_ = function() {
  this.logMessage_("WebSocket connection established.");
  !this.isDisposed() && this.ready_.isPending() && this.ready_.resolve()
};
safaridriver.extension.Server.prototype.onClose_ = function() {
  this.logMessage_("WebSocket connection was closed.", goog.debug.Logger.Level.WARNING);
  this.isDisposed() || (this.ready_.isPending() && this.ready_.reject(Error("Failed to connect")), this.dispose())
};
safaridriver.extension.Server.prototype.onError_ = function(a) {
  this.logMessage_("There was an error in the WebSocket: " + a.data, goog.debug.Logger.Level.SEVERE)
};
safaridriver.extension.Server.prototype.onMessage_ = function(a) {
  this.logMessage_("Received a message: " + a.data);
  try {
    var b = safaridriver.message.fromEvent(a);
    if(!b.isType(safaridriver.message.Command.TYPE)) {
      throw Error("Not a command message: " + b);
    }
  }catch(c) {
    this.send_(null, bot.response.createErrorResponse(c));
    return
  }
  var d = b.getCommand();
  this.execute(d).addErrback(bot.response.createErrorResponse).addCallback(function(a) {
    this.send_(d, a)
  }, this)
};
safaridriver.extension.Server.prototype.send_ = function(a, b) {
  var c = (new safaridriver.message.Response(a ? a.id : "", b)).toString();
  this.logMessage_("Sending response: " + c);
  !a && b.status === bot.ErrorCode.SUCCESS && this.logMessage_("Sending success response with a null command: " + c, goog.debug.Logger.Level.WARNING);
  this.webSocket_.send(c)
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_CAMINO = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !0;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function() {
  goog.userAgent.product.detectedFirefox_ = !1;
  goog.userAgent.product.detectedCamino_ = !1;
  goog.userAgent.product.detectedIphone_ = !1;
  goog.userAgent.product.detectedIpad_ = !1;
  goog.userAgent.product.detectedAndroid_ = !1;
  goog.userAgent.product.detectedChrome_ = !1;
  goog.userAgent.product.detectedSafari_ = !1;
  var a = goog.userAgent.getUserAgentString();
  a && (-1 != a.indexOf("Firefox") ? goog.userAgent.product.detectedFirefox_ = !0 : -1 != a.indexOf("Camino") ? goog.userAgent.product.detectedCamino_ = !0 : -1 != a.indexOf("iPhone") || -1 != a.indexOf("iPod") ? goog.userAgent.product.detectedIphone_ = !0 : -1 != a.indexOf("iPad") ? goog.userAgent.product.detectedIpad_ = !0 : -1 != a.indexOf("Android") ? goog.userAgent.product.detectedAndroid_ = !0 : -1 != a.indexOf("Chrome") ? goog.userAgent.product.detectedChrome_ = !0 : -1 != a.indexOf("Safari") && 
  (goog.userAgent.product.detectedSafari_ = !0))
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.userAgent.product.detectedIpad_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;
goog.userAgent.product.determineVersion_ = function() {
  if(goog.userAgent.product.FIREFOX) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Firefox\/([0-9.]+)/)
  }
  if(goog.userAgent.product.IE || goog.userAgent.product.OPERA) {
    return goog.userAgent.VERSION
  }
  if(goog.userAgent.product.CHROME) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Chrome\/([0-9.]+)/)
  }
  if(goog.userAgent.product.SAFARI) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/)
  }
  if(goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD) {
    var a = goog.userAgent.product.execRegExp_(/Version\/(\S+).*Mobile\/(\S+)/);
    if(a) {
      return a[1] + "." + a[2]
    }
  }else {
    if(goog.userAgent.product.ANDROID) {
      return(a = goog.userAgent.product.getFirstRegExpGroup_(/Android\s+([0-9.]+)/)) ? a : goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/)
    }
    if(goog.userAgent.product.CAMINO) {
      return goog.userAgent.product.getFirstRegExpGroup_(/Camino\/([0-9.]+)/)
    }
  }
  return""
};
goog.userAgent.product.getFirstRegExpGroup_ = function(a) {
  return(a = goog.userAgent.product.execRegExp_(a)) ? a[1] : ""
};
goog.userAgent.product.execRegExp_ = function(a) {
  return a.exec(goog.userAgent.getUserAgentString())
};
goog.userAgent.product.VERSION = goog.userAgent.product.determineVersion_();
goog.userAgent.product.isVersion = function(a) {
  return 0 <= goog.string.compareVersions(goog.userAgent.product.VERSION, a)
};
webdriver.Session = function(a, b) {
  this.id = a;
  this.capabilities = b
};
webdriver.Session.prototype.getId = function() {
  return this.id
};
webdriver.Session.prototype.getCapabilities = function() {
  return this.capabilities
};
webdriver.Session.prototype.getCapability = function(a) {
  return this.capabilities[a]
};
webdriver.Session.prototype.toJSON = function() {
  return this.id
};
safaridriver.extension.Session = function(a) {
  webdriver.Session.call(this, goog.string.getRandomString(), safaridriver.extension.Session.CAPABILITIES);
  this.tabManager_ = a
};
goog.inherits(safaridriver.extension.Session, webdriver.Session);
safaridriver.extension.Session.CAPABILITIES = {browserName:"safari", version:goog.userAgent.product.VERSION, platform:goog.userAgent.MAC ? "MAC" : "WINDOWS", javascriptEnabled:!0, takesScreenshot:!0, cssSelectorsEnabled:!0, secureSsl:!0};
safaridriver.extension.Session.prototype.currentCommand_ = null;
safaridriver.extension.Session.prototype.unhandledAlertText_ = null;
safaridriver.extension.Session.prototype.implicitWait_ = 0;
safaridriver.extension.Session.prototype.scriptTimeout_ = 0;
safaridriver.extension.Session.prototype.setCurrentCommand = function(a) {
  if(a && this.currentCommand_) {
    throw Error("Session is executing: " + this.currentCommand_.getName() + "; cannot set current to: " + a.getName());
  }
  this.currentCommand_ = a
};
safaridriver.extension.Session.prototype.isExecutingCommand = function() {
  return!!this.currentCommand_
};
safaridriver.extension.Session.prototype.setUnhandledAlertText = function(a) {
  this.unhandledAlertText_ = a
};
safaridriver.extension.Session.prototype.getUnhandledAlertText = function() {
  return this.unhandledAlertText_
};
safaridriver.extension.Session.prototype.getCommandTab = function() {
  return this.tabManager_.getCommandTab()
};
safaridriver.extension.Session.prototype.setCommandTab = function(a) {
  this.tabManager_.setCommandTab(a)
};
safaridriver.extension.Session.prototype.getTab = function(a) {
  return this.tabManager_.getTab(a)
};
safaridriver.extension.Session.prototype.getTabIds = function() {
  return this.tabManager_.getIds()
};
safaridriver.extension.Session.prototype.getImplicitWait = function() {
  return this.implicitWait_
};
safaridriver.extension.Session.prototype.setImplicitWait = function(a) {
  this.implicitWait_ = a
};
safaridriver.extension.Session.prototype.getScriptTimeout = function() {
  return this.scriptTimeout_
};
safaridriver.extension.Session.prototype.setScriptTimeout = function(a) {
  this.scriptTimeout_ = a
};
safaridriver.extension.TabManager = function() {
  this.tabs_ = [];
  this.log_ = goog.debug.Logger.getLogger("safaridriver.extension.TabManager");
  safari.application.addEventListener("open", goog.bind(this.onOpen_, this), !0);
  safari.application.addEventListener("close", goog.bind(this.onClose_, this), !0);
  this.init_()
};
safaridriver.extension.TabManager.prototype.commandTab_ = null;
safaridriver.extension.TabManager.prototype.init_ = function() {
  var a = null;
  safari.application.browserWindows.forEach(function(b) {
    var c = safari.application.activeBrowserWindow === b;
    b.tabs.forEach(function(b) {
      c && safari.application.activeBrowserWindow.activeTab === b ? a = this.getTab(b) : b.close()
    }, this)
  }, this);
  a && this.setCommandTab(a)
};
safaridriver.extension.TabManager.prototype.setCommandTab = function(a) {
  a === this.commandTab_ ? this.log_.warning("Unnecessarily resetting the focused tab!") : (this.commandTab_ = a, this.log_.info("Set command tab to " + a.getId()), a = a.getBrowserTab(), a.browserWindow !== safari.application.activeBrowserWindow && a.browserWindow.activate(), a !== a.browserWindow.activeTab && a.activate())
};
safaridriver.extension.TabManager.prototype.onOpen_ = function(a) {
  a.target instanceof SafariBrowserWindow ? this.log_.info("Ignoring open window event") : (a = this.getTab(a.target), this.log_.info("Tab opened: " + a.getId()))
};
safaridriver.extension.TabManager.prototype.onClose_ = function(a) {
  a.target instanceof SafariBrowserWindow ? this.log_.info("Ignoring close window event") : (this.commandTab_ && this.commandTab_.getBrowserTab() === a.target && (this.log_.info("The command tab has been closed: " + this.commandTab_.getId()), this.commandTab_ = null), this.log_.info("Tab closed"), this.delete_(a.target))
};
safaridriver.extension.TabManager.prototype.getTab = function(a) {
  var b = goog.isString(a), c = goog.array.find(this.tabs_, function(c) {
    return(b ? c.getId() : c.getBrowserTab()) === a
  });
  !c && !b && (this.log_.info("Registering new tab"), c = new safaridriver.extension.Tab(a), this.tabs_.push(c));
  return c
};
safaridriver.extension.TabManager.prototype.getIds = function() {
  return goog.array.map(this.tabs_, function(a) {
    return a.getId()
  })
};
safaridriver.extension.TabManager.prototype.getTabCount = function() {
  return this.tabs_.length
};
safaridriver.extension.TabManager.prototype.delete_ = function(a) {
  var b = goog.array.findIndex(this.tabs_, function(b) {
    return b.getBrowserTab() === a
  });
  0 > b ? this.log_.warning("Attempting to delete an unknown tab.") : (this.log_.info("Deleting entry for tab " + this.tabs_[b].getId()), goog.array.removeAt(this.tabs_, b))
};
safaridriver.extension.TabManager.prototype.getCommandTab = function() {
  if(this.commandTab_) {
    return this.commandTab_
  }
  var a;
  a = this.getTabCount() ? "The driver is not focused on a window. You must switch to a window before proceeding." : "There are no open windows!";
  throw new bot.Error(bot.ErrorCode.NO_SUCH_WINDOW, a);
};
safaridriver.message.Alert = function(a) {
  safaridriver.message.Message.call(this, safaridriver.message.Alert.TYPE);
  this.setField("message", a)
};
goog.inherits(safaridriver.message.Alert, safaridriver.message.Message);
safaridriver.message.Alert.TYPE = "alert";
safaridriver.message.Alert.fromData_ = function(a) {
  var b = a.message;
  if(!goog.isString(b)) {
    throw Error("Invalid message: " + JSON.stringify(a));
  }
  return new safaridriver.message.Alert(b)
};
safaridriver.message.Alert.prototype.getMessage = function() {
  return this.getField("message")
};
safaridriver.message.registerMessageType(safaridriver.message.Alert.TYPE, safaridriver.message.Alert.fromData_);
safaridriver.message.Connect = function(a) {
  safaridriver.message.Message.call(this, safaridriver.message.Connect.TYPE);
  this.setField(safaridriver.message.Connect.URL_FIELD_, a)
};
goog.inherits(safaridriver.message.Connect, safaridriver.message.Message);
safaridriver.message.Connect.TYPE = "connect";
safaridriver.message.Connect.URL_FIELD_ = "url";
safaridriver.message.Connect.fromData_ = function(a) {
  var b = a[safaridriver.message.Connect.URL_FIELD_];
  if(!goog.isString(b)) {
    throw Error("Invalid connect message: " + JSON.stringify(a));
  }
  return new safaridriver.message.Connect(b)
};
safaridriver.message.Connect.prototype.getUrl = function() {
  return this.getField(safaridriver.message.Connect.URL_FIELD_)
};
safaridriver.message.registerMessageType(safaridriver.message.Connect.TYPE, safaridriver.message.Connect.fromData_);
webdriver.Button = {LEFT:0, MIDDLE:1, RIGHT:2};
webdriver.Key = {NULL:"\ue000", CANCEL:"\ue001", HELP:"\ue002", BACK_SPACE:"\ue003", TAB:"\ue004", CLEAR:"\ue005", RETURN:"\ue006", ENTER:"\ue007", SHIFT:"\ue008", CONTROL:"\ue009", ALT:"\ue00a", PAUSE:"\ue00b", ESCAPE:"\ue00c", SPACE:"\ue00d", PAGE_UP:"\ue00e", PAGE_DOWN:"\ue00f", END:"\ue010", HOME:"\ue011", ARROW_LEFT:"\ue012", LEFT:"\ue012", ARROW_UP:"\ue013", UP:"\ue013", ARROW_RIGHT:"\ue014", RIGHT:"\ue014", ARROW_DOWN:"\ue015", DOWN:"\ue015", INSERT:"\ue016", DELETE:"\ue017", SEMICOLON:"\ue018", 
EQUALS:"\ue019", NUMPAD0:"\ue01a", NUMPAD1:"\ue01b", NUMPAD2:"\ue01c", NUMPAD3:"\ue01d", NUMPAD4:"\ue01e", NUMPAD5:"\ue01f", NUMPAD6:"\ue020", NUMPAD7:"\ue021", NUMPAD8:"\ue022", NUMPAD9:"\ue023", MULTIPLY:"\ue024", ADD:"\ue025", SEPARATOR:"\ue026", SUBTRACT:"\ue027", DECIMAL:"\ue028", DIVIDE:"\ue029", F1:"\ue031", F2:"\ue032", F3:"\ue033", F4:"\ue034", F5:"\ue035", F6:"\ue036", F7:"\ue037", F8:"\ue038", F9:"\ue039", F10:"\ue03a", F11:"\ue03b", F12:"\ue03c", COMMAND:"\ue03d", META:"\ue03d"};
webdriver.ActionSequence = function(a) {
  this.driver_ = a;
  this.actions_ = []
};
webdriver.ActionSequence.prototype.schedule_ = function(a, b) {
  this.actions_.push({description:a, command:b})
};
webdriver.ActionSequence.prototype.perform = function() {
  var a = goog.array.clone(this.actions_), b = this.driver_;
  return webdriver.promise.Application.getInstance().schedule("ActionSequence.perform", function() {
    goog.array.forEach(a, function(a) {
      b.schedule(a.command, a.description)
    })
  })
};
webdriver.ActionSequence.prototype.mouseMove = function(a, b) {
  var c = new webdriver.Command(webdriver.CommandName.MOVE_TO), d = b || {x:0, y:0};
  if(goog.isNumber(a.x)) {
    d.x += a.x, d.y += a.y
  }else {
    var e = a.toWireValue().then(function(a) {
      return a.ELEMENT
    });
    c.setParameter("element", e)
  }
  c.setParameter("xoffset", d.x);
  c.setParameter("yoffset", d.y);
  this.schedule_("mouseMove", c);
  return this
};
webdriver.ActionSequence.prototype.scheduleMouseAction_ = function(a, b, c, d) {
  goog.isNumber(c) || (c && this.mouseMove(c), c = goog.isDef(d) ? d : webdriver.Button.LEFT);
  b = (new webdriver.Command(b)).setParameter("button", c);
  this.schedule_(a, b);
  return this
};
webdriver.ActionSequence.prototype.mouseDown = function(a, b) {
  return this.scheduleMouseAction_("mouseDown", webdriver.CommandName.MOUSE_DOWN, a, b)
};
webdriver.ActionSequence.prototype.mouseUp = function(a, b) {
  return this.scheduleMouseAction_("mouseUp", webdriver.CommandName.MOUSE_UP, a, b)
};
webdriver.ActionSequence.prototype.dragAndDrop = function(a, b) {
  return this.mouseDown(a).mouseMove(b).mouseUp()
};
webdriver.ActionSequence.prototype.click = function(a, b) {
  return this.scheduleMouseAction_("click", webdriver.CommandName.CLICK, a, b)
};
webdriver.ActionSequence.prototype.doubleClick = function(a, b) {
  return this.scheduleMouseAction_("doubleClick", webdriver.CommandName.DOUBLE_CLICK, a, b)
};
webdriver.ActionSequence.prototype.scheduleKeyboardAction_ = function(a, b) {
  var c = (new webdriver.Command(webdriver.CommandName.SEND_KEYS_TO_ACTIVE_ELEMENT)).setParameter("value", b);
  this.schedule_(a, c);
  return this
};
webdriver.ActionSequence.checkModifierKey_ = function(a) {
  if(a !== webdriver.Key.ALT && a !== webdriver.Key.CONTROL && a !== webdriver.Key.SHIFT && a !== webdriver.Key.COMMAND) {
    throw Error("Not a modifier key");
  }
};
webdriver.ActionSequence.prototype.keyDown = function(a) {
  webdriver.ActionSequence.checkModifierKey_(a);
  return this.scheduleKeyboardAction_("keyDown", [a])
};
webdriver.ActionSequence.prototype.keyUp = function(a) {
  webdriver.ActionSequence.checkModifierKey_(a);
  return this.scheduleKeyboardAction_("keyUp", [a])
};
webdriver.ActionSequence.prototype.sendKeys = function(a) {
  var b = goog.array.flatten(goog.array.slice(arguments, 0));
  return this.scheduleKeyboardAction_("sendKeys", b)
};
bot.userAgent = {};
bot.userAgent.isEngineVersion = function(a) {
  return bot.userAgent.FIREFOX_EXTENSION ? bot.userAgent.FIREFOX_EXTENSION_IS_ENGINE_VERSION_(a) : goog.userAgent.IE ? 0 <= goog.string.compareVersions(document.documentMode, a) : goog.userAgent.isVersion(a)
};
bot.userAgent.isProductVersion = function(a) {
  return bot.userAgent.FIREFOX_EXTENSION ? bot.userAgent.FIREFOX_EXTENSION_IS_PRODUCT_VERSION_(a) : goog.userAgent.product.ANDROID ? 0 <= goog.string.compareVersions(bot.userAgent.ANDROID_VERSION_, a) : goog.userAgent.product.isVersion(a)
};
bot.userAgent.FIREFOX_EXTENSION = function() {
  if(!goog.userAgent.GECKO) {
    return!1
  }
  var a = goog.global.Components;
  if(!a) {
    return!1
  }
  try {
    if(!a.classes) {
      return!1
    }
  }catch(b) {
    return!1
  }
  var c = a.classes, a = a.interfaces, d = c["@mozilla.org/xpcom/version-comparator;1"].getService(a.nsIVersionComparator), c = c["@mozilla.org/xre/app-info;1"].getService(a.nsIXULAppInfo), e = c.platformVersion, f = c.version;
  bot.userAgent.FIREFOX_EXTENSION_IS_ENGINE_VERSION_ = function(a) {
    return 0 <= d.compare(e, "" + a)
  };
  bot.userAgent.FIREFOX_EXTENSION_IS_PRODUCT_VERSION_ = function(a) {
    return 0 <= d.compare(f, "" + a)
  };
  return!0
}();
bot.userAgent.IOS = goog.userAgent.product.IPAD || goog.userAgent.product.IPHONE;
bot.userAgent.MOBILE = bot.userAgent.IOS || goog.userAgent.product.ANDROID;
bot.userAgent.ANDROID_VERSION_ = function() {
  if(goog.userAgent.product.ANDROID) {
    var a = goog.userAgent.getUserAgentString();
    return(a = /Android\s+([0-9\.]+)/.exec(a)) ? a[1] : "0"
  }
  return"0"
}();
bot.userAgent.IE_DOC_9 = goog.userAgent.IE && 9 <= document.documentMode;
bot.userAgent.IE_DOC_PRE9 = goog.userAgent.IE && !bot.userAgent.IE_DOC_9;
goog.json = {};
goog.json.isValid_ = function(a) {
  return/^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = function(a) {
  a = String(a);
  if(goog.json.isValid_(a)) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = function(a) {
  return eval("(" + a + ")")
};
goog.json.serialize = function(a, b) {
  return(new goog.json.Serializer(b)).serialize(a)
};
goog.json.Serializer = function(a) {
  this.replacer_ = a
};
goog.json.Serializer.prototype.serialize = function(a) {
  var b = [];
  this.serialize_(a, b);
  return b.join("")
};
goog.json.Serializer.prototype.serialize_ = function(a, b) {
  switch(typeof a) {
    case "string":
      this.serializeString_(a, b);
      break;
    case "number":
      this.serializeNumber_(a, b);
      break;
    case "boolean":
      b.push(a);
      break;
    case "undefined":
      b.push("null");
      break;
    case "object":
      if(null == a) {
        b.push("null");
        break
      }
      if(goog.isArray(a)) {
        this.serializeArray(a, b);
        break
      }
      this.serializeObject_(a, b);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof a);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
  b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(a) {
    if(a in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[a]
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return goog.json.Serializer.charToJsonCharCache_[a] = e + b.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
  b.push(isFinite(a) && !isNaN(a) ? a : "null")
};
goog.json.Serializer.prototype.serializeArray = function(a, b) {
  var c = a.length;
  b.push("[");
  for(var d = "", e = 0;e < c;e++) {
    b.push(d), d = a[e], this.serialize_(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ","
  }
  b.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
  b.push("{");
  var c = "", d;
  for(d in a) {
    if(Object.prototype.hasOwnProperty.call(a, d)) {
      var e = a[d];
      "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serialize_(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",")
    }
  }
  b.push("}")
};
bot.json = {};
bot.json.NATIVE_JSON = !0;
bot.json.SUPPORTS_NATIVE_JSON_ = goog.userAgent.WEBKIT || goog.userAgent.OPERA || goog.userAgent.GECKO && bot.userAgent.isEngineVersion(3.5) || goog.userAgent.IE && bot.userAgent.isEngineVersion(8);
bot.json.stringify = bot.json.NATIVE_JSON && bot.json.SUPPORTS_NATIVE_JSON_ ? JSON.stringify : goog.json.serialize;
bot.json.parse = bot.json.NATIVE_JSON && bot.json.SUPPORTS_NATIVE_JSON_ ? JSON.parse : goog.json.parse;
webdriver.Locator = function(a, b) {
  this.using = a;
  this.value = b
};
webdriver.Locator.factory_ = function(a) {
  return function(b) {
    return new webdriver.Locator(a, b)
  }
};
webdriver.Locator.Strategy = {className:webdriver.Locator.factory_("class name"), "class name":webdriver.Locator.factory_("class name"), css:webdriver.Locator.factory_("css selector"), id:webdriver.Locator.factory_("id"), js:webdriver.Locator.factory_("js"), linkText:webdriver.Locator.factory_("link text"), "link text":webdriver.Locator.factory_("link text"), name:webdriver.Locator.factory_("name"), partialLinkText:webdriver.Locator.factory_("partial link text"), "partial link text":webdriver.Locator.factory_("partial link text"), 
tagName:webdriver.Locator.factory_("tag name"), "tag name":webdriver.Locator.factory_("tag name"), xpath:webdriver.Locator.factory_("xpath")};
goog.exportSymbol("By", webdriver.Locator.Strategy);
webdriver.Locator.createFromObj = function(a) {
  var b = goog.object.getAnyKey(a);
  if(b) {
    if(b in webdriver.Locator.Strategy) {
      return webdriver.Locator.Strategy[b](a[b])
    }
  }else {
    throw Error("No keys found in locator hash object");
  }
  throw Error("Unsupported locator strategy: " + b);
};
webdriver.Locator.checkLocator = function(a) {
  if(!a.using || !a.value) {
    a = webdriver.Locator.createFromObj(a)
  }
  return a
};
webdriver.Locator.prototype.toString = function() {
  return"By." + this.using.replace(/ ([a-z])/g, function(a, b) {
    return b.toUpperCase()
  }) + "(" + bot.json.stringify(this.value) + ")"
};
webdriver.WebDriver = function(a, b) {
  this.session_ = a;
  this.executor_ = b
};
webdriver.WebDriver.attachToSession = function(a, b) {
  return webdriver.WebDriver.acquireSession_(a, (new webdriver.Command(webdriver.CommandName.DESCRIBE_SESSION)).setParameter("sessionId", b), "WebDriver.attachToSession()")
};
webdriver.WebDriver.createSession = function(a, b) {
  return webdriver.WebDriver.acquireSession_(a, (new webdriver.Command(webdriver.CommandName.NEW_SESSION)).setParameter("desiredCapabilities", b), "WebDriver.createSession()")
};
webdriver.WebDriver.acquireSession_ = function(a, b, c) {
  var d = goog.bind(a.execute, a, b), b = webdriver.promise.Application.getInstance().schedule(c, function() {
    return webdriver.promise.checkedNodeCall(d).then(function(a) {
      bot.response.checkResponse(a);
      return new webdriver.Session(a.sessionId, a.value)
    })
  });
  return new webdriver.WebDriver(b, a)
};
webdriver.WebDriver.toWireValue_ = function(a) {
  switch(goog.typeOf(a)) {
    case "array":
      return webdriver.promise.fullyResolved(goog.array.map(a, webdriver.WebDriver.toWireValue_));
    case "object":
      if(goog.isFunction(a.toWireValue)) {
        return webdriver.promise.fullyResolved(a.toWireValue())
      }
      if(goog.isFunction(a.toJSON)) {
        return webdriver.promise.resolved(a.toJSON())
      }
      if(goog.isNumber(a.nodeType) && goog.isString(a.nodeName)) {
        throw Error(["Invalid argument type: ", a.nodeName, "(", a.nodeType, ")"].join(""));
      }
      return webdriver.promise.fullyResolved(goog.object.map(a, webdriver.WebDriver.toWireValue_));
    case "function":
      return webdriver.promise.resolved("" + a);
    case "undefined":
      return webdriver.promise.resolved(null);
    default:
      return webdriver.promise.resolved(a)
  }
};
webdriver.WebDriver.fromWireValue_ = function(a, b) {
  goog.isArray(b) ? b = goog.array.map(b, goog.partial(webdriver.WebDriver.fromWireValue_, a)) : b && goog.isObject(b) && (b = webdriver.WebElement.ELEMENT_KEY in b ? new webdriver.WebElement(a, b[webdriver.WebElement.ELEMENT_KEY]) : goog.object.map(b, goog.partial(webdriver.WebDriver.fromWireValue_, a)));
  return b
};
webdriver.WebDriver.prototype.schedule = function(a, b) {
  function c() {
    if(!d.session_) {
      throw Error("This driver instance does not have a valid session ID (did you call WebDriver.quit()?) and may no longer be used.");
    }
  }
  var d = this;
  c();
  a.setParameter("sessionId", this.session_);
  return webdriver.promise.Application.getInstance().schedule(b, function() {
    c();
    return webdriver.promise.fullyResolved(a.getParameters()).then(webdriver.WebDriver.toWireValue_).then(function(b) {
      a.setParameters(b);
      return webdriver.promise.checkedNodeCall(goog.bind(d.executor_.execute, d.executor_, a))
    })
  }).then(function(a) {
    bot.response.checkResponse(a);
    return webdriver.WebDriver.fromWireValue_(d, a.value)
  })
};
webdriver.WebDriver.prototype.getSession = function() {
  return webdriver.promise.when(this.session_)
};
webdriver.WebDriver.prototype.getCapability = function(a) {
  return webdriver.promise.when(this.session_, function(b) {
    return b.capabilities[a]
  })
};
webdriver.WebDriver.prototype.quit = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.QUIT), "WebDriver.quit()").addBoth(function() {
    delete this.session_
  }, this)
};
webdriver.WebDriver.prototype.actions = function() {
  return new webdriver.ActionSequence(this)
};
webdriver.WebDriver.prototype.executeScript = function(a, b) {
  goog.isFunction(a) && (a = "return (" + a + ").apply(null, arguments);");
  return this.schedule((new webdriver.Command(webdriver.CommandName.EXECUTE_SCRIPT)).setParameter("script", a).setParameter("args", goog.array.slice(arguments, 1)), "WebDriver.executeScript()")
};
webdriver.WebDriver.prototype.executeAsyncScript = function(a, b) {
  goog.isFunction(a) && (a = "return (" + a + ").apply(null, arguments);");
  return this.schedule((new webdriver.Command(webdriver.CommandName.EXECUTE_ASYNC_SCRIPT)).setParameter("script", a).setParameter("args", goog.array.slice(arguments, 1)), "WebDriver.executeScript()")
};
webdriver.WebDriver.prototype.call = function(a, b, c) {
  var d = goog.array.slice(arguments, 2);
  return webdriver.promise.Application.getInstance().schedule("WebDriver.call(" + (a.name || "function") + ")", function() {
    return webdriver.promise.fullyResolved(d).then(function(c) {
      return a.apply(b, c)
    })
  })
};
webdriver.WebDriver.prototype.wait = function(a, b, c) {
  var d = a.name || "<anonymous function>", e = c ? " (" + c + ")" : "";
  return webdriver.promise.Application.getInstance().scheduleWait("WebDriver.wait(" + d + ")" + e, a, b, c)
};
webdriver.WebDriver.prototype.sleep = function(a) {
  return webdriver.promise.Application.getInstance().scheduleTimeout("WebDriver.sleep(" + a + ")", a)
};
webdriver.WebDriver.prototype.getWindowHandle = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_CURRENT_WINDOW_HANDLE), "WebDriver.getWindowHandle()")
};
webdriver.WebDriver.prototype.getAllWindowHandles = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_WINDOW_HANDLES), "WebDriver.getAllWindowHandles()")
};
webdriver.WebDriver.prototype.getPageSource = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_PAGE_SOURCE), "WebDriver.getAllWindowHandles()")
};
webdriver.WebDriver.prototype.close = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.CLOSE), "WebDriver.close()")
};
webdriver.WebDriver.prototype.get = function(a) {
  return this.navigate().to(a)
};
webdriver.WebDriver.prototype.getCurrentUrl = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_CURRENT_URL), "WebDriver.getCurrentUrl()")
};
webdriver.WebDriver.prototype.getTitle = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.GET_TITLE), "WebDriver.getTitle()")
};
webdriver.WebDriver.prototype.findElement = function(a, b) {
  var c;
  if(1 === a.nodeType && a.ownerDocument) {
    c = this.findDomElement_(a).then(function(a) {
      if(!a.length) {
        throw new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT, "Unable to locate element. Is WebDriver focused on its ownerDocument's frame?");
      }
      return a[0]
    })
  }else {
    if(c = webdriver.Locator.checkLocator(a), "js" == c.using) {
      var d = goog.array.slice(arguments, 1);
      goog.array.splice(d, 0, 0, c.value);
      c = this.executeScript.apply(this, d).then(function(a) {
        if(!(a instanceof webdriver.WebElement)) {
          throw Error("JS locator script result was not a WebElement");
        }
        return a
      })
    }else {
      d = (new webdriver.Command(webdriver.CommandName.FIND_ELEMENT)).setParameter("using", c.using).setParameter("value", c.value), c = this.schedule(d, "WebDriver.findElement(" + c + ")")
    }
  }
  return new webdriver.WebElement(this, c)
};
webdriver.WebDriver.prototype.findDomElement_ = function(a) {
  function b() {
    delete d[e]
  }
  var c = a.ownerDocument, d = c.$webdriver$ = c.$webdriver$ || {}, e = Math.floor(Math.random() * goog.now()).toString(36);
  d[e] = a;
  a[e] = e;
  return this.executeScript(function(a) {
    var b = document.$webdriver$;
    if(!b) {
      return null
    }
    b = b[a];
    return!b || b[a] !== a ? [] : [b]
  }, e).then(function(a) {
    b();
    if(a.length && !(a[0] instanceof webdriver.WebElement)) {
      throw Error("JS locator script result was not a WebElement");
    }
    return a
  }, b)
};
webdriver.WebDriver.prototype.isElementPresent = function(a, b) {
  return(1 === a.nodeType && a.ownerDocument ? this.findDomElement_(a) : this.findElements.apply(this, arguments)).then(function(a) {
    return!!a.length
  })
};
webdriver.WebDriver.prototype.findElements = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  if("js" == a.using) {
    var c = goog.array.slice(arguments, 1);
    goog.array.splice(c, 0, 0, a.value);
    return this.executeScript.apply(this, c).then(function(a) {
      return a instanceof webdriver.WebElement ? [a] : !goog.isArray(a) ? [] : goog.array.filter(a, function(a) {
        return a instanceof webdriver.WebElement
      })
    })
  }
  c = (new webdriver.Command(webdriver.CommandName.FIND_ELEMENTS)).setParameter("using", a.using).setParameter("value", a.value);
  return this.schedule(c, "WebDriver.findElements(" + a + ")")
};
webdriver.WebDriver.prototype.takeScreenshot = function() {
  return this.schedule(new webdriver.Command(webdriver.CommandName.SCREENSHOT), "WebDriver.takeScreenshot()")
};
webdriver.WebDriver.prototype.manage = function() {
  return new webdriver.WebDriver.Options(this)
};
webdriver.WebDriver.prototype.navigate = function() {
  return new webdriver.WebDriver.Navigation(this)
};
webdriver.WebDriver.prototype.switchTo = function() {
  return new webdriver.WebDriver.TargetLocator(this)
};
webdriver.WebDriver.Navigation = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Navigation.prototype.to = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.GET)).setParameter("url", a), "WebDriver.navigate().to(" + a + ")")
};
webdriver.WebDriver.Navigation.prototype.back = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GO_BACK), "WebDriver.navigate().back()")
};
webdriver.WebDriver.Navigation.prototype.forward = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GO_FORWARD), "WebDriver.navigate().forward()")
};
webdriver.WebDriver.Navigation.prototype.refresh = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.REFRESH), "WebDriver.navigate().refresh()")
};
webdriver.WebDriver.Options = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Options.prototype.addCookie = function(a, b, c, d, e, f) {
  if(/[;=]/.test(a)) {
    throw Error('Invalid cookie name "' + a + '"');
  }
  if(/;/.test(b)) {
    throw Error('Invalid cookie value "' + b + '"');
  }
  var g = a + "=" + b + (d ? ";domain=" + d : "") + (c ? ";path=" + c : "") + (e ? ";secure" : ""), h;
  goog.isDef(f) && (goog.isNumber(f) ? h = new Date(f) : (h = f, f = h.getTime()), g += ";expires=" + h.toUTCString(), h = f / 1E3);
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.ADD_COOKIE)).setParameter("cookie", {name:a, value:b, path:c, domain:d, secure:!!e, expiry:h}), "WebDriver.manage().addCookie(" + g + ")")
};
webdriver.WebDriver.Options.prototype.deleteAllCookies = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.ADD_COOKIE), "WebDriver.manage().deleteAllCookies()")
};
webdriver.WebDriver.Options.prototype.deleteCookie = function(a) {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.DELETE_COOKIE), "WebDriver.manage().deleteCookie(" + a + ")")
};
webdriver.WebDriver.Options.prototype.getCookies = function() {
  return this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GET_ALL_COOKIES), "WebDriver.manage().getCookies()")
};
webdriver.WebDriver.Options.prototype.getCookie = function(a) {
  return this.getCookies().addCallback(function(b) {
    return goog.array.find(b, function(b) {
      return b && b.name == a
    })
  })
};
webdriver.WebDriver.Options.prototype.timeouts = function() {
  return new webdriver.WebDriver.Timeouts(this.driver_)
};
webdriver.WebDriver.Options.prototype.window = function() {
  return new webdriver.WebDriver.Window(this.driver_)
};
webdriver.WebDriver.Timeouts = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Timeouts.prototype.implicitlyWait = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.IMPLICITLY_WAIT)).setParameter("ms", 0 > a ? 0 : a), "WebDriver.manage().timeouts().implicitlyWait(" + a + ")")
};
webdriver.WebDriver.Timeouts.prototype.setScriptTimeout = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SET_SCRIPT_TIMEOUT)).setParameter("ms", 0 > a ? 0 : a), "WebDriver.manage().timeouts().setScriptTimeout(" + a + ")")
};
webdriver.WebDriver.Window = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.Window.prototype.getPosition = function() {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.GET_WINDOW_POSITION)).setParameter("windowHandle", "current"), "WebDriver.manage().window().getPosition()")
};
webdriver.WebDriver.Window.prototype.setPosition = function(a, b) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SET_WINDOW_POSITION)).setParameter("windowHandle", "current").setParameter("x", a).setParameter("y", b), "WebDriver.manage().window().setPosition(" + a + ", " + b + ")")
};
webdriver.WebDriver.Window.prototype.getSize = function() {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.GET_WINDOW_SIZE)).setParameter("windowHandle", "current"), "WebDriver.manage().window().getSize()")
};
webdriver.WebDriver.Window.prototype.setSize = function(a, b) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SET_WINDOW_SIZE)).setParameter("windowHandle", "current").setParameter("width", a).setParameter("height", b), "WebDriver.manage().window().setSize(" + a + ", " + b + ")")
};
webdriver.WebDriver.TargetLocator = function(a) {
  this.driver_ = a
};
webdriver.WebDriver.TargetLocator.prototype.activeElement = function() {
  var a = this.driver_.schedule(new webdriver.Command(webdriver.CommandName.GET_ACTIVE_ELEMENT), "WebDriver.switchTo().activeElement()");
  return new webdriver.WebElement(this.driver_, a)
};
webdriver.WebDriver.TargetLocator.prototype.defaultContent = function() {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME)).setParameter("id", null), "WebDriver.switchTo().defaultContent()")
};
webdriver.WebDriver.TargetLocator.prototype.frame = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_FRAME)).setParameter("id", a), "WebDriver.switchTo().frame(" + a + ")")
};
webdriver.WebDriver.TargetLocator.prototype.window = function(a) {
  return this.driver_.schedule((new webdriver.Command(webdriver.CommandName.SWITCH_TO_WINDOW)).setParameter("name", a), "WebDriver.switchTo().window(" + a + ")")
};
webdriver.Key.chord = function(a) {
  var b = goog.array.reduce(goog.array.slice(arguments, 0), function(a, b) {
    return a + b
  }, "");
  return b += webdriver.Key.NULL
};
webdriver.WebElement = function(a, b) {
  webdriver.promise.Deferred.call(this);
  this.driver_ = a;
  var c = goog.partial(this.resolve, this), d = this.reject;
  delete this.promise;
  delete this.resolve;
  delete this.reject;
  this.id_ = webdriver.promise.when(b, function(a) {
    if(a instanceof webdriver.WebElement) {
      return a.id_
    }
    if(goog.isDef(a[webdriver.WebElement.ELEMENT_KEY])) {
      return a
    }
    var b = {};
    b[webdriver.WebElement.ELEMENT_KEY] = a;
    return b
  });
  this.id_.then(c, d)
};
goog.inherits(webdriver.WebElement, webdriver.promise.Deferred);
webdriver.WebElement.ELEMENT_KEY = "ELEMENT";
webdriver.WebElement.equals = function(a, b) {
  return a == b ? webdriver.promise.resolved(!0) : webdriver.promise.fullyResolved([a.id_, b.id_]).then(function(c) {
    if(c[0][webdriver.WebElement.ELEMENT_KEY] == c[1][webdriver.WebElement.ELEMENT_KEY]) {
      return!0
    }
    c = new webdriver.Command(webdriver.CommandName.ELEMENT_EQUALS);
    c.setParameter("other", b);
    return a.schedule_(c, "webdriver.WebElement.equals()")
  })
};
webdriver.WebElement.prototype.getDriver = function() {
  return this.driver_
};
webdriver.WebElement.prototype.toWireValue = function() {
  return this.id_
};
webdriver.WebElement.prototype.schedule_ = function(a, b) {
  a.setParameter("id", this.id_);
  return this.driver_.schedule(a, b)
};
webdriver.WebElement.prototype.findElement = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  if("js" == a.using) {
    return this.driver_.findElement.apply(this.driver_, arguments)
  }
  var c = (new webdriver.Command(webdriver.CommandName.FIND_CHILD_ELEMENT)).setParameter("using", a.using).setParameter("value", a.value), c = this.schedule_(c, "WebElement.findElement(" + a + ")");
  return new webdriver.WebElement(this.driver_, c)
};
webdriver.WebElement.prototype.isElementPresent = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  return"js" == a.using ? this.driver_.isElementPresent.apply(this.driver_, arguments) : this.findElements.apply(this, arguments).then(function(a) {
    return!!a.length
  })
};
webdriver.WebElement.prototype.findElements = function(a, b) {
  a = webdriver.Locator.checkLocator(a);
  if("js" == a.using) {
    return this.driver_.findElements.apply(this.driver_, arguments)
  }
  var c = (new webdriver.Command(webdriver.CommandName.FIND_CHILD_ELEMENTS)).setParameter("using", a.using).setParameter("value", a.value);
  return this.schedule_(c, "WebElement.findElements(" + a + ")")
};
webdriver.WebElement.prototype.click = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.CLICK_ELEMENT), "WebElement.click()")
};
webdriver.WebElement.prototype.sendKeys = function(a) {
  var b = webdriver.promise.fullyResolved(goog.array.slice(arguments, 0)).then(function(a) {
    return goog.array.map(goog.array.slice(a, 0), function(a) {
      return a + ""
    })
  });
  return this.schedule_((new webdriver.Command(webdriver.CommandName.SEND_KEYS_TO_ELEMENT)).setParameter("value", b), "WebElement.sendKeys(" + b + ")")
};
webdriver.WebElement.prototype.getTagName = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TAG_NAME), "WebElement.getTagName()")
};
webdriver.WebElement.prototype.getCssValue = function(a) {
  return this.schedule_((new webdriver.Command(webdriver.CommandName.GET_ELEMENT_VALUE_OF_CSS_PROPERTY)).setParameter("propertyName", a), "WebElement.getCssValue(" + a + ")")
};
webdriver.WebElement.prototype.getAttribute = function(a) {
  return this.schedule_((new webdriver.Command(webdriver.CommandName.GET_ELEMENT_ATTRIBUTE)).setParameter("name", a), "WebElement.getAttribute(" + a + ")")
};
webdriver.WebElement.prototype.getText = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_TEXT), "WebElement.getText()")
};
webdriver.WebElement.prototype.getSize = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_SIZE), "WebElement.getSize()")
};
webdriver.WebElement.prototype.getLocation = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.GET_ELEMENT_LOCATION), "WebElement.getLocation()")
};
webdriver.WebElement.prototype.isEnabled = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_ENABLED), "WebElement.isEnabled()")
};
webdriver.WebElement.prototype.isSelected = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_SELECTED), "WebElement.isSelected()")
};
webdriver.WebElement.prototype.submit = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.SUBMIT_ELEMENT), "WebElement.submit()")
};
webdriver.WebElement.prototype.clear = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.CLEAR_ELEMENT), "WebElement.clear()")
};
webdriver.WebElement.prototype.isDisplayed = function() {
  return this.schedule_(new webdriver.Command(webdriver.CommandName.IS_ELEMENT_DISPLAYED), "WebElement.isDisplayed()")
};
webdriver.WebElement.prototype.getOuterHtml = function() {
  return this.driver_.executeScript(function(a) {
    if("outerHTML" in a) {
      return a.outerHTML
    }
    var b = a.ownerDocument.createElement("div");
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
  }, this)
};
webdriver.WebElement.prototype.getInnerHtml = function() {
  return this.driver_.executeScript("return arguments[0].innerHTML", this)
};
safaridriver.extension.init = function() {
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  safaridriver.console.init();
  safaridriver.extension.LOG_.info("Creating global session...");
  safaridriver.extension.tabManager_ = new safaridriver.extension.TabManager;
  safaridriver.extension.session_ = new safaridriver.extension.Session(safaridriver.extension.tabManager_);
  safaridriver.extension.LOG_.info("Creating debug driver...");
  var a = safaridriver.extension.createSessionServer_();
  safaridriver.extension.driver = new webdriver.WebDriver(new webdriver.Session("debug", {}), a);
  goog.exportSymbol("driver", safaridriver.extension.driver);
  safaridriver.extension.LOG_.info("Waiting for connect command...");
  safari.application.addEventListener("message", safaridriver.extension.onMessage_, !1)
};
safaridriver.extension.LOG_ = goog.debug.Logger.getLogger("safaridriver.extension");
safaridriver.extension.numConnections_ = 0;
safaridriver.extension.onMessage_ = function(a) {
  var b = safaridriver.message.fromEvent(a);
  switch(b.getType()) {
    case safaridriver.message.Connect.TYPE:
      var c = b.getUrl(), d = safaridriver.extension.createSessionServer_();
      d.connect(c).then(function() {
        safaridriver.extension.LOG_.info("Connected to client: " + c);
        safaridriver.extension.numConnections_++;
        d.onDispose(function() {
          safaridriver.extension.numConnections_--
        })
      }, function(a) {
        safaridriver.extension.LOG_.severe("Failed to connect to client: " + c, a)
      });
      break;
    case safaridriver.message.Alert.TYPE:
      goog.asserts.assert("canLoad" === a.name, "Received an async alert message"), safaridriver.extension.session_.isExecutingCommand() || safaridriver.extension.session_.setUnhandledAlertText(b.getMessage()), a.message = !!safaridriver.extension.numConnections_, a.stopPropagation()
  }
};
safaridriver.extension.createSessionServer_ = function() {
  return new safaridriver.extension.Server(safaridriver.extension.session_)
};
;safaridriver.extension.init();
