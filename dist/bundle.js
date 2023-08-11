/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --lime-green: #b4ec34;\n  --dark-lime-green: #1a6d0d;\n  --black: #142122;\n  --gray: #828b94;\n  --dark-gray: #4e535c;\n  --light-gray: #e5e7eb;\n  --white: #ffffff;\n  --blue: #1f80f3;\n  --red: #c5031a;\n  --orange: #ff9c1b;\n  --green: #347d4e;\n  --purple: rgb(85, 48, 156);\n  --pink: #e770be;\n}\n\nbody,\nhtml {\n  font-family: \"Helvetica\", sans-serif;\n  height: 100%;\n  overflow: hidden;\n}\n\n* {\n  margin: 0;\n  box-sizing: border-box;\n}\n\nmain {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  overflow: hidden;\n  position: relative;\n}\n\n.upper-pane {\n  padding-left: 3vw;\n  height: 25%;\n  background-color: var(--lime-green);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-right: 80px;\n}\n\n.upper-left-pane {\n  display: flex;\n  align-items: center;\n}\n\n.user-greeting-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.user-greeting {\n  display: block;\n  font-size: 2em;\n  margin-block-start: 0.67em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  font-weight: bold;\n}\n\nimg {\n  width: 140px;\n  height: 140px;\n  overflow: hidden;\n  margin-right: 2vw;\n}\n\n.user-info-button:hover {\n  transform: scale(1.05) rotate(-1deg);\n}\n\n.user-info-button {\n  width: 40%;\n  border-radius: 32px;\n  font-size: 15px;\n  background-color: var(--black);\n  border-radius: 100px;\n  color: var(--white);\n  cursor: pointer;\n  display: inline-block;\n  padding: 7px 20px;\n  text-align: center;\n  text-decoration: none;\n  transition: all 250ms;\n  border: 0;\n  touch-action: manipulation;\n}\n\n.lower-pane {\n  height: 75%;\n  background-color: var(--black);\n  padding: 3vw;\n  display: flex;\n  flex-direction: column;\n  align-items: space-around;\n  overflow-y: scroll;\n}\n\n.app-name {\n  font-family: \"Jost\", sans-serif;\n  font-size: 100px;\n  font-weight: bold;\n  font-style: italic;\n}\n\n.alt-lower-pane {\n  display: flex;\n  align-items: center;\n  height: 75vh;\n  background-color: var(--black);\n  padding: 20px;\n}\n\n.profile-box {\n  padding-left: 50px;\n  height: 60vh;\n  width: 100%;\n  background-color: var(--white);\n  display: flex;\n  justify-content: flex-start;\n  align-items: space-between;\n  border-radius: 15px;\n}\n\n.list {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n}\n\n.left-element {\n  margin-left: 40px;\n  width: 200px;\n}\n\n.user-info-page {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n\n.data-box {\n  padding: 25px;\n  padding-left: 50px;\n  padding-right: 50px;\n  height: auto;\n  width: 100%;\n  margin-top: 5vh;\n  border-radius: 15px;\n  background-color: var(--white);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.hydro-box-title,\n.box-title {\n  margin-bottom: 2vh;\n  color: var(--gray);\n}\n\n.hydro-box-title {\n  display: flex;\n  justify-content: space-between;\n}\n\n.activity-box-contents-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.box-contents-wrapper {\n  display: flex;\n  margin-bottom: 30px;\n  justify-content: space-between;\n}\n\n.activity-box-contents {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.box-contents-container {\n  display: flex;\n  justify-content: space-evenly;\n  height: 80%;\n}\n\n.sleep-data-wrapper {\n  display: flex;\n}\n\n.box-contents {\n  width: 50%;\n  margin-right: 20px;\n}\n\n.box-contents2 {\n  width: 100%;\n}\n\n.small-box {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.small-box-right {\n  margin-left: 50px;\n}\n\n.data-title {\n  display: block;\n  font-size: 1.17em;\n  margin-block-start: 1em;\n  margin-block-end: 1em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  font-weight: bold;\n}\n\n.units,\n.data-analysis > p {\n  font-weight: bolder;\n  color: var(--dark-gray);\n}\n\n.number-with-units {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n}\n\n.number {\n  font-size: 60px;\n  font-weight: bold;\n}\n\n#box1 > div > h2 {\n  color: var(--dark-lime-green);\n}\n\n#box2 > div > h2 {\n  color: var(--blue);\n}\n\n.sleep-box > div > h2 {\n  color: var(--purple);\n}\n\n.box-title > h2 {\n  color: var(--red);\n}\n\n.hidden {\n  display: none;\n}\n\n.graph-chart {\n  width: 100%;\n  height: 100%;\n}\n\n.sleep-graph-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: 85%;\n}\n\n#hydroChart #sleep-hourly-graph #sleep-quality-graph {\n  width: 60%;\n  height: 75%;\n  padding-bottom: 20px;\n}\n\n.last-night-sleep .average-sleep .sleep-graph-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.activity-trend-graph {\n  height: 35%;\n}\n\n.activity-data {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.user-activity-chart {\n  margin-bottom: 30px;\n}\n\np.red {\n  color: var(--red) !important;\n}\n\np.green {\n  color: var(--green) !important;\n}\n\n.activity-data-boxes {\n  width: 20%;\n  margin-left: 6%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.first-place {\n  color: rgb(193, 33, 33);\n}\n\n.fa-solid {\n  margin-right: 10px;\n}\n\n#box4 {\n  height: 80vh;\n}\n\n.sortGhost {\n  opacity: 0.6;\n  background-color: var(--lime-green);\n  border: none;\n}\n\n.sortable-item-dragging {\n  border: solid 3px var(--black);\n}\n\ni:hover,\n.box-title:hover,\n.hydro-box-title:hover {\n  cursor: pointer;\n}\n\n.visually-hidden {\n  position: absolute;\n  left: -9999px;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n}\n\n.hydro-data-box {\n  height: 40vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.hydration-input-wrapper {\n  width: 40%;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.user-hydration-input-button {\n  width: 20%;\n  border-radius: 15px;\n  font-size: 15px;\n  background-color: rgba(42, 184, 250, 0.6);\n  color: var(--black);\n  cursor: pointer;\n  display: inline-block;\n  padding: 7px 20px;\n  text-align: center;\n}\n\ninput {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n#user-hydration-input {\n  height: 100%;\n}\n\n.error-message {\n  color: black;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,qBAAA;EACA,0BAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;EACA,gBAAA;EACA,0BAAA;EACA,eAAA;AACF;;AAEA;;EAEE,oCAAA;EACA,YAAA;EACA,gBAAA;AACF;;AAEA;EACE,SAAA;EACA,sBAAA;AACF;;AAEA;EACE,WAAA;EACA,aAAA;EACA,YAAA;EACA,sBAAA;EACA,gBAAA;EACA,kBAAA;AACF;;AAEA;EACE,iBAAA;EACA,WAAA;EACA,mCAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;AACF;;AAEA;EACE,cAAA;EACA,cAAA;EACA,0BAAA;EACA,wBAAA;EACA,sBAAA;EACA,iBAAA;AACF;;AAEA;EACE,YAAA;EACA,aAAA;EACA,gBAAA;EACA,iBAAA;AACF;;AAEA;EACE,oCAAA;AACF;;AAEA;EACE,UAAA;EACA,mBAAA;EACA,eAAA;EACA,8BAAA;EACA,oBAAA;EACA,mBAAA;EACA,eAAA;EACA,qBAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,SAAA;EACA,0BAAA;AACF;;AAEA;EACE,WAAA;EACA,8BAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;AACF;;AAEA;EACE,+BAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,YAAA;EACA,8BAAA;EACA,aAAA;AACF;;AAEA;EACE,kBAAA;EACA,YAAA;EACA,WAAA;EACA,8BAAA;EACA,aAAA;EACA,2BAAA;EACA,0BAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,6BAAA;AACF;;AAEA;EACE,iBAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,2BAAA;AACF;;AAEA;EACE,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,mBAAA;EACA,8BAAA;EACA,aAAA;EACA,sBAAA;EACA,8BAAA;AACF;;AAEA;;EAEE,kBAAA;EACA,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,8BAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,6BAAA;EACA,WAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;AACF;;AAEA;EACE,WAAA;AACF;;AAEA;EACE,UAAA;EACA,aAAA;EACA,sBAAA;EACA,6BAAA;EACA,mBAAA;AACF;;AAEA;EACE,iBAAA;AACF;;AAEA;EACE,cAAA;EACA,iBAAA;EACA,uBAAA;EACA,qBAAA;EACA,wBAAA;EACA,sBAAA;EACA,iBAAA;AACF;;AAEA;;EAEE,mBAAA;EACA,uBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,qBAAA;AACF;;AAEA;EACE,eAAA;EACA,iBAAA;AACF;;AAEA;EACE,6BAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,oBAAA;AACF;;AAEA;EACE,iBAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,WAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,UAAA;AACF;;AAEA;EACE,UAAA;EACA,WAAA;EACA,oBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;AACF;;AAEA;EACE,WAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,4BAAA;AACF;;AAEA;EACE,8BAAA;AACF;;AAEA;EACE,UAAA;EACA,eAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AACF;;AAEA;EACE,uBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,YAAA;AACF;;AAEA;EACE,YAAA;EACA,mCAAA;EACA,YAAA;AACF;;AAEA;EACE,8BAAA;AACF;;AAEA;;;EAGE,eAAA;AACF;;AAEA;EACE,kBAAA;EACA,aAAA;EACA,UAAA;EACA,WAAA;EACA,gBAAA;AACF;;AAEA;EACE,YAAA;EACA,aAAA;EACA,sBAAA;EACA,2BAAA;AACF;;AAEA;EACE,UAAA;EACA,aAAA;EACA,mBAAA;EACA,yBAAA;AACF;;AAEA;EACE,UAAA;EACA,mBAAA;EACA,eAAA;EACA,yCAAA;EACA,mBAAA;EACA,eAAA;EACA,qBAAA;EACA,iBAAA;EACA,kBAAA;AACF;;AAEA;EACE,iBAAA;EACA,kBAAA;AACF;;AAEA;EACE,YAAA;AACF;;AAEA;EACE,YAAA;AACF","sourcesContent":[":root {\n  --lime-green: #b4ec34;\n  --dark-lime-green: #1a6d0d;\n  --black: #142122;\n  --gray: #828b94;\n  --dark-gray: #4e535c;\n  --light-gray: #e5e7eb;\n  --white: #ffffff;\n  --blue: #1f80f3;\n  --red: #c5031a;\n  --orange: #ff9c1b;\n  --green: #347d4e;\n  --purple: rgb(85, 48, 156);\n  --pink: #e770be;\n}\n\nbody,\nhtml {\n  font-family: \"Helvetica\", sans-serif;\n  height: 100%;\n  overflow: hidden;\n}\n\n* {\n  margin: 0;\n  box-sizing: border-box;\n}\n\nmain {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  flex-direction: column;\n  overflow: hidden;\n  position: relative;\n}\n\n.upper-pane {\n  padding-left: 3vw;\n  height: 25%;\n  background-color: var(--lime-green);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-right: 80px;\n}\n\n.upper-left-pane {\n  display: flex;\n  align-items: center;\n}\n\n.user-greeting-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.user-greeting {\n  display: block;\n  font-size: 2em;\n  margin-block-start: 0.67em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  font-weight: bold;\n}\n\nimg {\n  width: 140px;\n  height: 140px;\n  overflow: hidden;\n  margin-right: 2vw;\n}\n\n.user-info-button:hover {\n  transform: scale(1.05) rotate(-1deg);\n}\n\n.user-info-button {\n  width: 40%;\n  border-radius: 32px;\n  font-size: 15px;\n  background-color: var(--black);\n  border-radius: 100px;\n  color: var(--white);\n  cursor: pointer;\n  display: inline-block;\n  padding: 7px 20px;\n  text-align: center;\n  text-decoration: none;\n  transition: all 250ms;\n  border: 0;\n  touch-action: manipulation;\n}\n\n.lower-pane {\n  height: 75%;\n  background-color: var(--black);\n  padding: 3vw;\n  display: flex;\n  flex-direction: column;\n  align-items: space-around;\n  overflow-y: scroll;\n}\n\n.app-name {\n  font-family: \"Jost\", sans-serif;\n  font-size: 100px;\n  font-weight: bold;\n  font-style: italic;\n}\n\n.alt-lower-pane {\n  display: flex;\n  align-items: center;\n  height: 75vh;\n  background-color: var(--black);\n  padding: 20px;\n}\n\n.profile-box {\n  padding-left: 50px;\n  height: 60vh;\n  width: 100%;\n  background-color: var(--white);\n  display: flex;\n  justify-content: flex-start;\n  align-items: space-between;\n  border-radius: 15px;\n}\n\n.list {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n}\n\n.left-element {\n  margin-left: 40px;\n  width: 200px;\n}\n\n.user-info-page {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n\n.data-box {\n  padding: 25px;\n  padding-left: 50px;\n  padding-right: 50px;\n  height: auto;\n  width: 100%;\n  margin-top: 5vh;\n  border-radius: 15px;\n  background-color: var(--white);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.hydro-box-title,\n.box-title {\n  margin-bottom: 2vh;\n  color: var(--gray);\n}\n\n.hydro-box-title {\n  display: flex;\n  justify-content: space-between;\n}\n\n.activity-box-contents-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.box-contents-wrapper {\n  display: flex;\n  margin-bottom: 30px;\n  justify-content: space-between;\n}\n\n.activity-box-contents {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.box-contents-container {\n  display: flex;\n  justify-content: space-evenly;\n  height: 80%;\n}\n\n.sleep-data-wrapper {\n  display: flex;\n}\n\n.box-contents {\n  width: 50%;\n  margin-right: 20px;\n}\n\n.box-contents2 {\n  width: 100%;\n}\n\n.small-box {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.small-box-right {\n  margin-left: 50px;\n}\n\n.data-title {\n  display: block;\n  font-size: 1.17em;\n  margin-block-start: 1em;\n  margin-block-end: 1em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  font-weight: bold;\n}\n\n.units,\n.data-analysis > p {\n  font-weight: bolder;\n  color: var(--dark-gray);\n}\n\n.number-with-units {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n}\n\n.number {\n  font-size: 60px;\n  font-weight: bold;\n}\n\n#box1 > div > h2 {\n  color: var(--dark-lime-green);\n}\n\n#box2 > div > h2 {\n  color: var(--blue);\n}\n\n.sleep-box > div > h2 {\n  color: var(--purple);\n}\n\n.box-title > h2 {\n  color: var(--red);\n}\n\n.hidden {\n  display: none;\n}\n\n.graph-chart {\n  width: 100%;\n  height: 100%;\n}\n\n.sleep-graph-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: 85%;\n}\n\n#hydroChart #sleep-hourly-graph #sleep-quality-graph {\n  width: 60%;\n  height: 75%;\n  padding-bottom: 20px;\n}\n\n.last-night-sleep .average-sleep .sleep-graph-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.activity-trend-graph {\n  height: 35%;\n}\n\n.activity-data {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.user-activity-chart {\n  margin-bottom: 30px;\n}\n\np.red {\n  color: var(--red) !important;\n}\n\np.green {\n  color: var(--green) !important;\n}\n\n.activity-data-boxes {\n  width: 20%;\n  margin-left: 6%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.first-place {\n  color: rgb(193, 33, 33);\n}\n\n.fa-solid {\n  margin-right: 10px;\n}\n\n#box4 {\n  height: 80vh;\n}\n\n.sortGhost {\n  opacity: 0.6;\n  background-color: var(--lime-green);\n  border: none;\n}\n\n.sortable-item-dragging {\n  border: solid 3px var(--black);\n}\n\ni:hover,\n.box-title:hover,\n.hydro-box-title:hover {\n  cursor: pointer;\n}\n\n.visually-hidden {\n  position: absolute;\n  left: -9999px;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n}\n\n.hydro-data-box {\n  height: 40vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.hydration-input-wrapper {\n  width: 40%;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.user-hydration-input-button {\n  width: 20%;\n  border-radius: 15px;\n  font-size: 15px;\n  background-color: rgba(42, 184, 250, 0.6);\n  color: var(--black);\n  cursor: pointer;\n  display: inline-block;\n  padding: 7px 20px;\n  text-align: center;\n}\n\ninput {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n\n#user-hydration-input {\n  height: 100%;\n}\n\n.error-message {\n  color: black;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avgQualityGoodBad: () => (/* binding */ avgQualityGoodBad),
/* harmony export */   calcStepComparison: () => (/* binding */ calcStepComparison),
/* harmony export */   createHourlySleepBarGraph: () => (/* binding */ createHourlySleepBarGraph),
/* harmony export */   createHydroBarGraph: () => (/* binding */ createHydroBarGraph),
/* harmony export */   createQualitySleepBarGraph: () => (/* binding */ createQualitySleepBarGraph),
/* harmony export */   createUserActivityGraph: () => (/* binding */ createUserActivityGraph),
/* harmony export */   displayActivityTrendGraph: () => (/* binding */ displayActivityTrendGraph),
/* harmony export */   displayAvgHydro: () => (/* binding */ displayAvgHydro),
/* harmony export */   displayCohortStepAverage: () => (/* binding */ displayCohortStepAverage),
/* harmony export */   displayDailyHydro: () => (/* binding */ displayDailyHydro),
/* harmony export */   displayDistanceWalked: () => (/* binding */ displayDistanceWalked),
/* harmony export */   displayMinutesActive: () => (/* binding */ displayMinutesActive),
/* harmony export */   displaySleepDataToDom: () => (/* binding */ displaySleepDataToDom),
/* harmony export */   displayStepChallengeToDom: () => (/* binding */ displayStepChallengeToDom),
/* harmony export */   displayTodayHydro: () => (/* binding */ displayTodayHydro),
/* harmony export */   displayUserSteps: () => (/* binding */ displayUserSteps),
/* harmony export */   errorMessage: () => (/* binding */ errorMessage),
/* harmony export */   gatherUserInput: () => (/* binding */ gatherUserInput),
/* harmony export */   hydroUserInput: () => (/* binding */ hydroUserInput),
/* harmony export */   hydroUserInputButton: () => (/* binding */ hydroUserInputButton),
/* harmony export */   lastNightQualityGoodBad: () => (/* binding */ lastNightQualityGoodBad),
/* harmony export */   resetDomAfterPost: () => (/* binding */ resetDomAfterPost),
/* harmony export */   toggleInfo: () => (/* binding */ toggleInfo),
/* harmony export */   updateHydroGraph: () => (/* binding */ updateHydroGraph),
/* harmony export */   updateIcon: () => (/* binding */ updateIcon),
/* harmony export */   updateUserDailyStepGoal: () => (/* binding */ updateUserDailyStepGoal),
/* harmony export */   updateUserInfoPage: () => (/* binding */ updateUserInfoPage),
/* harmony export */   updateUserName: () => (/* binding */ updateUserName),
/* harmony export */   userInfoButton: () => (/* binding */ userInfoButton)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _images_svgFiles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);




// query selectors
const userName = document.querySelector('.user-greeting');
const userDailyStepGoal = document.querySelector('.user-daily-step-goal');
const cohortStepGoal = document.querySelector('.average-step');
const userStepComparison = document.querySelector('.avg-user-step-comparison');
const userInfoButton = document.querySelector('.user-info-button');
const altLowerPane = document.querySelector('.alt-lower-pane');
const lowerPane = document.querySelector('.lower-pane');
const userNameField = document.querySelector('.user-name');
const addressField = document.querySelector('.user-address');
const emailField = document.querySelector('.user-email');
const strideLengthField = document.querySelector('.user-stride-length');
const stepGoalField = document.querySelector('.user-step-goal');
const friendsField = document.querySelector('.user-friends');

const todayHydro = document.querySelector('.todays-hydro');
const avgHydro = document.querySelector('.average-water');

// last night:
const todaysHourlySleep = document.querySelector('.todays-hourly-sleep');
const todaysQualitySleep = document.querySelector('.todays-quality-sleep-num');
const lastNightQualityGoodBad = document.querySelector(
  '.sleep-quality-today-descriptive'
);
// weekly:
const averageHourlySleep = document.querySelector('.average-hours-slept');
const averageQualitySleep = document.querySelector(
  '.average-quality-slept-num'
);
const avgQualityGoodBad = document.querySelector(
  '.sleep-quality-avg-descriptive'
);

const userStepsDisplay = document.querySelector('.step-amount');
const minutesActiveDisplay = document.querySelector('.minutes-active');

const userDistanceDisplay = document.querySelector('.miles-walked');

const hydroBarChart = document.getElementById('hydroChart');
const hourlySleepBarChart = document.getElementById('sleep-hourly-graph');
const qualityBarChart = document.getElementById('sleep-quality-graph');
const activityBarChart = document.getElementById('user-activity-graph');

const displayStepChallenge = document.querySelector('.challenge-results');
const activityTrendText = document.querySelector('.activity-trend-title');
const activityTrendGraph = document.getElementById(
  'activity-trend-graph-display'
);

let hydroChart;

const dynamicWaterText = document.querySelector('.water-text');
const hydroUserInput = document.getElementById('user-hydration-input');
const hydroUserInputButton = document.querySelector(
  '.user-hydration-input-button'
);
const errorMessage = document.querySelector('.error-message');

const sortableContainerElem = document.getElementById('sortable-container');

document.addEventListener('DOMContentLoaded', () => {
  const sortableContainer = new Sortable(sortableContainerElem, {
    animation: 300,
    ghostClass: 'sortGhost',
    onChoose(evt) {
      // Add a CSS class to the element being dragged
      evt.item.classList.add('sortable-item-dragging');
    },
    onUnchoose(evt) {
      // Remove the CSS class when dragging ends
      evt.item.classList.remove('sortable-item-dragging');
    },
  });
});

const resetDomAfterPost = (currentUser, today) => {
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyHydroData)(currentUser, 100);
  displayTodayHydro(today, currentUser);
  (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getAllTimeAverageFlOz)(currentUser);
  displayAvgHydro(currentUser);
  updateHydroGraph(100, currentUser);
  hydroUserInputButton.disabled = true;
  dynamicWaterText.innerText = '';
  dynamicWaterText.innerText = 'Today, you drank:';
};

const gatherUserInput = () => {
  let userInput = hydroUserInput.value.trim();
  let numberInput = Number(userInput);
  if (isNaN(userInput)) {
    errorMessage.innerText = '';
    errorMessage.innerText = 'Please enter a number';
    return false;
  } else if (numberInput > 150) {
    errorMessage.innerText = '';
    errorMessage.innerText = 'Please enter a lower number';
    return false;
  } else if (!Number.isInteger(numberInput)) {
    errorMessage.innerText = '';
    errorMessage.innerText = 'Enter a whole number';
    return false;
  } else if (userInput === '') {
    errorMessage.innerText = '';
    errorMessage.innerText = 'Please enter more than a space';
    return false;
  } else {
    errorMessage.innerText = '';
    errorMessage.innerText = 'Today I drank';
  }
  return parseInt(userInput);
};

const updateUserDailyStepGoal = (user) => {
  userDailyStepGoal.innerText = `${user.dailyStepGoal}`;
};

const updateIcon = () => {
  const randomIndex = Math.floor(Math.random() * _images_svgFiles__WEBPACK_IMPORTED_MODULE_1__.imagesArray.length);
  const imageToBeUsed = _images_svgFiles__WEBPACK_IMPORTED_MODULE_1__.imagesArray[randomIndex];
  var iconImage = document.getElementById('icon');
  iconImage.src = imageToBeUsed;
};

const updateUserInfoPage = (user, data) => {
  userNameField.innerText = user.name;
  addressField.innerText = user.address;
  emailField.innerText = user.email;
  strideLengthField.innerText = user.strideLength;
  stepGoalField.innerText = user.dailyStepGoal;
  friendsField.innerText = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.nameFriends)(user, data);
};

const calcStepComparison = (user, data) => {
  const percent = Math.floor(
    (user.dailyStepGoal / (0,_functions__WEBPACK_IMPORTED_MODULE_0__.returnAverageSteps)(data)) * 100
  );
  userStepComparison.innerText = `Your step goal is ${percent}% of the average user's step goal!`;
};

const displayCohortStepAverage = (data) => {
  cohortStepGoal.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.returnAverageSteps)(data)}`;
};

const displayStepChallengeToDom = (challengeData) => {
  displayStepChallenge.innerHTML = '';
  challengeData.forEach((datum, index) => {
    let crown = '👑';
    let firstPlace = 'first-place';
    if (index !== 0) {
      crown = '';
      firstPlace = '';
    }
    displayStepChallenge.innerHTML += `<p class=${firstPlace}>${index + 1}. ${datum} ${crown}</p>`;
  });
};

const updateUserName = (user) => {
  userName.innerText = `Welcome Back, ${user.name}!`;
};

const toggleInfo = () => {
  altLowerPane.classList.toggle('hidden');
  lowerPane.classList.toggle('hidden');
  if (lowerPane.classList.contains('hidden')) {
    userInfoButton.innerText = `Back to Main`;
  } else {
    userInfoButton.innerText = `User Info`;
  }
};

const updateHydroGraph = (day, currentUserH2O) => {
  let hydroGraphData = {
    labels: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyHydroData)(currentUserH2O, day)),
    datasets: [
      {
        label: 'Last Weeks Hydration',
        data: displayDailyHydro(day, currentUserH2O),
        backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
      },
    ],
  };
  hydroChart.data = hydroGraphData;
  hydroChart.update();
};

const displayTodayHydro = (day, data) => {
  todayHydro.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.getDailyFlOz)(day, data)}`;
};

const displayAvgHydro = (userHydroData) => {
  avgHydro.innerText = ``;
  avgHydro.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.getAllTimeAverageFlOz)(userHydroData)}`;
};

const displayDailyHydro = (day, userHydroData) => {
  const weeklyData = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyHydroData)(userHydroData, day);
  const ouncesperDay = weeklyData.map((data) => data.numOunces);
  return ouncesperDay;
};

const createHydroBarGraph = (day, hydroData) => {
  hydroChart = new Chart(hydroBarChart, {
    type: 'bar',
    data: {
      labels: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyHydroData)(hydroData, day)),
      datasets: [
        {
          label: 'Last Weeks Hydration',
          data: displayDailyHydro(day, hydroData),
          backgroundColor: 'rgba(42, 184, 250, 0.6)', // Customize the bar color
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Fluid Ounces',
          },
        },
      },
    },
  });
};

const createHourlySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(hourlySleepBarChart, {
    type: 'bar',
    data: {
      labels: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklySleepData)(sleepData, day)),
      datasets: [
        {
          label: 'Last Weeks Hourly Sleep Data',
          data: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyHourlySleepData)(sleepData, day),
          backgroundColor: 'rgba(58, 13, 143, 0.9)',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours Slept',
          },
        },
      },
    },
  });
};

const createQualitySleepBarGraph = (sleepData, day) => {
  const chart = new Chart(qualityBarChart, {
    type: 'line',
    data: {
      labels: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklySleepData)(sleepData, day)),
      datasets: [
        {
          label: 'Last Weeks Quality',
          data: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyQualitySleepData)(sleepData, day),
          backgroundColor: 'rgba(58, 13, 143, 0.9)',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sleep Quality',
          },
        },
      },
    },
  });
};

const displaySleepDataToDom = (day, sleepData) => {
  todaysHourlySleep.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUserDailyHrSleep)(day, sleepData)}`;
  todaysQualitySleep.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUserDailyQualitySleep)(day, sleepData)}`;
  averageHourlySleep.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateUserAverageSleep)(sleepData)}`;
  averageQualitySleep.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateUserAverageSleepQuality)(
    sleepData
  )}`;
  lastNightQualityGoodBad.innerText = ` / 5 ${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.describeSleepQuality)(
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUserDailyQualitySleep)(day, sleepData)
  )}`;
  avgQualityGoodBad.innerText = ` / 5 ${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.describeSleepQuality)(
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateUserAverageSleepQuality)(sleepData)
  )}`;
  lastNightQualityGoodBad.classList.add(
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.changeGoodBadColor)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUserDailyQualitySleep)(day, sleepData))
  );
  avgQualityGoodBad.classList.add(
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.changeGoodBadColor)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateUserAverageSleepQuality)(sleepData))
  );
};

const displayMinutesActive = (activityData, day) => {
  minutesActiveDisplay.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateMinutesActive)(
    activityData,
    day
  )}`;
};

const displayUserSteps = (activityData, day) => {
  userStepsDisplay.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.getDaySteps)(day, activityData)}`;
};

const displayDistanceWalked = (activityData, day, currentUserData) => {
  userDistanceDisplay.innerText = `${(0,_functions__WEBPACK_IMPORTED_MODULE_0__.calculateDayMileage)(
    (0,_functions__WEBPACK_IMPORTED_MODULE_0__.getDaySteps)(day, activityData),
    currentUserData
  )}`;
};

const createUserActivityGraph = (activityData, day, userData) => {
  const userStepGoal = ['', '', '', '', '', '', ''];

  const chart = new Chart(activityBarChart, {
    type: 'bar',
    data: {
      labels: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.formatDate)((0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyActivityData)(activityData, day)),
      datasets: [
        {
          type: 'bar',
          label: 'Last Weeks Activity',
          data: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyStepData)(activityData, day),
          backgroundColor: (0,_functions__WEBPACK_IMPORTED_MODULE_0__.compareUserStepGoal)(
            (0,_functions__WEBPACK_IMPORTED_MODULE_0__.weeklyStepData)(activityData, day),
            userData
          ),
          yAxisID: 'steps-y-axis', // Assign this dataset to the left y-axis
        },
        {
          type: 'line',
          label: 'Step Goal',
          data: userStepGoal.fill(userData.dailyStepGoal),
          borderColor: 'red', // Change the color of the line as needed
          borderWidth: 3, // Adjust the width of the line as needed
          fill: false, // Disable filling the area under the line
          yAxisID: 'steps-y-axis', // Assign this dataset to the left y-axis
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        'steps-y-axis': {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Steps',
          },
        },
      },
    },
  });
};

const displayActivityTrendGraph = (trendData, today) => {
  let lastObject = trendData[trendData.length - 1];
  let mostRecentSteps = lastObject.map((datum) => datum.numSteps);
  let reformattedMostRecentDates = (0,_functions__WEBPACK_IMPORTED_MODULE_0__.dateToMonth)(trendData);

  if (lastObject[2].date !== today) {
    activityTrendText.innerText = `Your most recent consecutive days of increased activity:`;
  }

  const chart = new Chart(activityTrendGraph, {
    type: 'bar',
    data: {
      labels: reformattedMostRecentDates,
      datasets: [
        {
          label: 'Latest Trend',
          data: mostRecentSteps,
          backgroundColor: 'rgba(242, 15, 15, 1)',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Steps',
          },
        },
      },
    },
  });
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateDayMileage: () => (/* binding */ calculateDayMileage),
/* harmony export */   calculateMinutesActive: () => (/* binding */ calculateMinutesActive),
/* harmony export */   calculateUserAverageSleep: () => (/* binding */ calculateUserAverageSleep),
/* harmony export */   calculateUserAverageSleepQuality: () => (/* binding */ calculateUserAverageSleepQuality),
/* harmony export */   changeGoodBadColor: () => (/* binding */ changeGoodBadColor),
/* harmony export */   compareUserStepGoal: () => (/* binding */ compareUserStepGoal),
/* harmony export */   createRandomUser: () => (/* binding */ createRandomUser),
/* harmony export */   createUserHydroData: () => (/* binding */ createUserHydroData),
/* harmony export */   createUserStepData: () => (/* binding */ createUserStepData),
/* harmony export */   dateToMonth: () => (/* binding */ dateToMonth),
/* harmony export */   describeSleepQuality: () => (/* binding */ describeSleepQuality),
/* harmony export */   displayStepChallenge: () => (/* binding */ displayStepChallenge),
/* harmony export */   findStartingIndex: () => (/* binding */ findStartingIndex),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   friendsStepChallenge: () => (/* binding */ friendsStepChallenge),
/* harmony export */   getAllTimeAverageFlOz: () => (/* binding */ getAllTimeAverageFlOz),
/* harmony export */   getDailyFlOz: () => (/* binding */ getDailyFlOz),
/* harmony export */   getDaySteps: () => (/* binding */ getDaySteps),
/* harmony export */   getUserDailyHrSleep: () => (/* binding */ getUserDailyHrSleep),
/* harmony export */   getUserDailyQualitySleep: () => (/* binding */ getUserDailyQualitySleep),
/* harmony export */   getUserData: () => (/* binding */ getUserData),
/* harmony export */   getUserSleepData: () => (/* binding */ getUserSleepData),
/* harmony export */   increasingStepDays: () => (/* binding */ increasingStepDays),
/* harmony export */   nameFriends: () => (/* binding */ nameFriends),
/* harmony export */   retrieveUserData: () => (/* binding */ retrieveUserData),
/* harmony export */   returnAverageSteps: () => (/* binding */ returnAverageSteps),
/* harmony export */   totalSteps: () => (/* binding */ totalSteps),
/* harmony export */   weeklyActivityData: () => (/* binding */ weeklyActivityData),
/* harmony export */   weeklyHourlySleepData: () => (/* binding */ weeklyHourlySleepData),
/* harmony export */   weeklyHydroData: () => (/* binding */ weeklyHydroData),
/* harmony export */   weeklyQualitySleepData: () => (/* binding */ weeklyQualitySleepData),
/* harmony export */   weeklySleepData: () => (/* binding */ weeklySleepData),
/* harmony export */   weeklyStepData: () => (/* binding */ weeklyStepData)
/* harmony export */ });
// User Data Functions:

const createRandomUser = (usersArray) => {
  const randomIndex = Math.floor(Math.random() * usersArray.length);
  let currentUser = usersArray[randomIndex];
  return currentUser;
};

const retrieveUserData = (userID, data) => {
  var user = data.users.find((user) => user.id === userID);
  return user;
};

const returnAverageSteps = (userData) => {
  const sumTotalSteps = userData.reduce((acc, user) => {
    acc += user.dailyStepGoal;
    return acc;
  }, 0);
  const average = parseInt(sumTotalSteps) / userData.length;
  return average;
};

const nameFriends = (currentUser, usersArray) => {
  let foundFriends = currentUser.friends.map((friend) => {
    return usersArray.find((user) => user.id === friend).name;
  });
  let formattedArray = foundFriends.map((friend) => ` ` + friend);
  return formattedArray;
};

// Hydro Data Functions:
const createUserHydroData = (user, hydroData) => {
  const userHydroData = hydroData.filter((datum) => datum.userID === user.id);
  return userHydroData;
};

const getAllTimeAverageFlOz = (userHydroData) => {
  const flOzSum = userHydroData.reduce((sum, { numOunces }) => {
    sum += numOunces;
    return sum;
  }, 0);
  const flOzAverage = Math.floor(flOzSum / userHydroData.length);
  return flOzAverage;
};

const getDailyFlOz = (day, hydroData) => {
  const todaysData = hydroData.find((datum) => datum.date === day);
  return todaysData.numOunces;
};

function findStartingIndex(userHydroData, endDate) {
  for (let i = 0; i < userHydroData.length; i++) {
    if (userHydroData[i].date === endDate) {
      return i;
    }
  }
}

const weeklyHydroData = (userHydroData, endDateIndex) => {
  const weeklyData = [];
  let startingIndex = userHydroData.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklyData.push(userHydroData[i]);
  }
  return weeklyData;
};

// Sleep Data Functions:
const getUserSleepData = (user, sleepData) => {
  const userSleep = sleepData.filter((data) => data.userID === user.id);
  return userSleep;
};

const calculateUserAverageSleep = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.hoursSlept;
  }, 0);
  const averageUserSleep = sum / sleepData.length;
  return Number(averageUserSleep.toFixed(2));
};

const calculateUserAverageSleepQuality = (sleepData) => {
  const sum = sleepData.reduce((sum, user) => {
    return sum + user.sleepQuality;
  }, 0);
  const averageUserSleepQuality = sum / sleepData.length;
  return Number(averageUserSleepQuality.toFixed(2));
};

const getUserDailyHrSleep = (day, sleepData) => {
  const dailySleep = sleepData.find((data) => data.date === day);
  return dailySleep.hoursSlept;
};

const getUserDailyQualitySleep = (day, sleepData) => {
  const dailySleep = sleepData.find((data) => data.date === day);
  return dailySleep.sleepQuality;
};

const describeSleepQuality = (userSleepQuality) => {
  return userSleepQuality >= 3 ? 'good' : 'poor';
};

const changeGoodBadColor = (userSleepQuality) => {
  return userSleepQuality >= 3 ? 'green' : 'red';
};

const weeklyHourlySleepData = (userSleep, endDateIndex) => {
  const weeklyHourSleepData = [];
  let startingIndex =
    userSleep.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklyHourSleepData.push(userSleep[i].hoursSlept);
  }
  return weeklyHourSleepData;
};

const weeklyQualitySleepData = (userSleep, endDateIndex) => {
  const weeklySleepQuality = [];
  let startingIndex =
    userSleep.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklySleepQuality.push(userSleep[i].sleepQuality);
  }
  return weeklySleepQuality;
};

const weeklySleepData = (userSleep, endDateIndex) => {
  const weeklySleepData = [];
  let startingIndex =
    userSleep.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklySleepData.push(userSleep[i]);
  }
  return weeklySleepData;
};

// Activity Data Functions:
const createUserStepData = (user, stepData) => {
  const userSteps = stepData.filter((data) => data.userID === user.id);
  return userSteps;
};

const getDaySteps = (day, userStepData) => {
  const dailySteps = userStepData.find((datum) => datum.date === day);
  return dailySteps.numSteps;
};

const calculateDayMileage = (userStepData, userData) => {
  const miles = (userStepData * userData.strideLength) / 5280;
  return Number(miles.toFixed(2));
};

const calculateMinutesActive = (userStepData, day) => {
  const dayActivity = userStepData.find((data) => data.date === day);
  return dayActivity.minutesActive;
};

const weeklyStepData = (userActivityData, endDateIndex) => {
  const weeklyStepData = [];
  let startingIndex =
    userActivityData.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklyStepData.push(userActivityData[i].numSteps);
  }
  return weeklyStepData;
};

const weeklyActivityData = (userActivityData, endDateIndex) => {
  const weeklyActivityData = [];
  let startingIndex =
    userActivityData.length < 6 || endDateIndex < 6 ? 0 : endDateIndex - 6;
  for (let i = startingIndex; i <= endDateIndex; i++) {
    weeklyActivityData.push(userActivityData[i]);
  }
  return weeklyActivityData;
};

const formatDate = (weeklyData) => {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const justDates = weeklyData.map((datum) => datum.date);
  const daysArray = justDates.map((date) => new Date(date));
  const previous7Days = daysArray.map(
    (previousDay) => weekDays[previousDay.getDay()]
  );
  return previous7Days;
};

const dateToMonth = (trendData) => {
  let lastObject = trendData[trendData.length - 1];
  let mostRecentSteps = lastObject.map((datum) => datum.numSteps);
  let mostRecentDates = lastObject.map((datum) => datum.date);
  let reformattedMostRecentDates = [];
  mostRecentDates.forEach((date) => {
    let splitDate = date.split('/');
    splitDate.shift();
    let joinDate = splitDate.join('/');
    reformattedMostRecentDates.push(joinDate);
  });
  const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthNames = [];
  reformattedMostRecentDates.forEach((date) => {
    const splitDate = date.split('/');
    monthNames.push(months[parseInt(splitDate[0]) - 1] + ' ' + splitDate[1]);
  });
  return monthNames;
};

const compareUserStepGoal = (weeklyStepData, userData) => {
  const colorArray = [];
  const colorChecks = ['rgba(247, 113, 2, 1)', 'rgba(180, 236, 52, .8)'];
  weeklyStepData.forEach((datum) => {
    if (datum >= userData.dailyStepGoal) {
      colorArray.push(colorChecks[1]);
    } else {
      colorArray.push(colorChecks[0]);
    }
  });
  return colorArray;
};

const getUserData = (userID, usersData) => {
  return usersData.find((user) => user.id === userID);
};

const friendsStepChallenge = (userData, allUsersData, activityData) => {
  const friends = userData.friends;
  const friendsData = [];
  friends.forEach((friend) => {
    friendsData.push(getUserData(friend, allUsersData));
  });
  const friendsSteps = [];
  friendsData.forEach((friend) => {
    friendsSteps.push({
      friendName: friend.name,
      friendSteps: totalSteps(
        weeklyStepData(createUserStepData(friend, activityData), 99)
      ),
    });
  });

  if (
    friendsSteps.find((friend) => friend.friendName === userData.name) ===
    undefined
  ) {
    friendsSteps.push({
      friendName: userData.name,
      friendSteps: totalSteps(
        weeklyStepData(createUserStepData(userData, activityData), 99)
      ),
    });
  }
  const sortedFriends = friendsSteps.sort(
    (a, b) => b.friendSteps - a.friendSteps
  );
  return sortedFriends;
};

const displayStepChallenge = (totalSteps) => {
  const sortedWithNames = [];
  totalSteps.forEach((friend) => {
    sortedWithNames.push(
      `${friend.friendName} has ${friend.friendSteps} steps.`
    );
  });
  return sortedWithNames;
};

const totalSteps = (stepData) => {
  return stepData.reduce((acc, cv) => {
    acc += cv;
    return acc;
  }, 0);
};

const increasingStepDays = (stepData) => {
  const increasedDays = [];
  for (var i = 0; i < stepData.length - 2; i++) {
    if (
      stepData[i].numSteps < stepData[i + 1].numSteps &&
      stepData[i + 1].numSteps < stepData[i + 2].numSteps
    ) {
      increasedDays.push([
        {
          date: stepData[i].date,
          numSteps: stepData[i].numSteps,
        },
        {
          date: stepData[i + 1].date,
          numSteps: stepData[i + 1].numSteps,
        },
        {
          date: stepData[i + 2].date,
          numSteps: stepData[i + 2].numSteps,
        },
      ]);
    }
  }
  return increasedDays;
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   imagesArray: () => (/* binding */ imagesArray)
/* harmony export */ });
const imagesArray = [
  'https://freesvg.org/storage/img/thumb/johnny_automatic_NPS_map_pictographs_part_9.png',
  'https://freesvg.org/storage/img/thumb/johnny_automatic_NPS_map_pictographs_part_15.png',
  'https://freesvg.org/storage/img/thumb/johnny_automatic_NPS_map_pictographs_part_17.png',
  'https://freesvg.org/storage/img/thumb/johnny_automatic_NPS_map_pictographs_part_19.png',
  'https://freesvg.org/storage/img/thumb/johnny_automatic_NPS_map_pictographs_part_35.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-Land-recreation-symbols-21.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-Land-recreation-symbols-23.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-Land-recreation-symbols-25.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-NPS-map-pictographs-part-73.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-NPS-map-pictographs-part-81.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-NPS-map-pictographs-part-89.png',
  'https://freesvg.org/storage/img/thumb/johnny-automatic-NPS-map-pictographs-part-95.png',
];

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFetchRequest: () => (/* binding */ createFetchRequest),
/* harmony export */   postUserInput: () => (/* binding */ postUserInput)
/* harmony export */ });
const userURL = 'https://fitlit-api-green.vercel.app/api/v1/users';
const hydroURL = 'https://fitlit-api-green.vercel.app/api/v1/hydration';
const sleepURL = 'https://fitlit-api-green.vercel.app/api/v1/sleep';
const activityURL = 'https://fitlit-api-green.vercel.app/api/v1/activity';

const urlArray = [userURL, hydroURL, sleepURL, activityURL];

// GET requests
const createFetchRequest = () => {
  return urlArray.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
};

// POST request
const postUserInput = (currentUser, input) => {
  let data = {
    userID: currentUser.id,
    date: '2023/07/02',
    numOunces: input,
  };

  return fetch(hydroURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error);
    throw error;
  });
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// imports








// master data object
const mainData = {
  today: '2023/07/01',
};

const generateWebPage = () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.updateIcon)();

  // user data
  mainData.currentUser = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.createRandomUser)(mainData.users);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.updateUserDailyStepGoal)(mainData.currentUser);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.updateUserName)(mainData.currentUser);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayCohortStepAverage)(mainData.users);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayStepChallengeToDom)(
    (0,_functions__WEBPACK_IMPORTED_MODULE_3__.displayStepChallenge)(
      (0,_functions__WEBPACK_IMPORTED_MODULE_3__.friendsStepChallenge)(
        mainData.currentUser,
        mainData.users,
        mainData.activity
      )
    )
  );

  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.updateUserInfoPage)(mainData.currentUser, mainData.users);

  // hydration data
  const currentUserH2O = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.createUserHydroData)(
    mainData.currentUser,
    mainData.hydration
  );

  (0,_functions__WEBPACK_IMPORTED_MODULE_3__.weeklyHydroData)(currentUserH2O, 99);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayTodayHydro)(mainData.today, currentUserH2O);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayAvgHydro)(currentUserH2O);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.createHydroBarGraph)(99, currentUserH2O);

  // sleep data
  const currentUserSleep = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.getUserSleepData)(
    mainData.currentUser,
    mainData.sleep
  );
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.createHourlySleepBarGraph)(currentUserSleep, 99);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.createQualitySleepBarGraph)(currentUserSleep, 99);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displaySleepDataToDom)(mainData.today, currentUserSleep);

  // activity data
  const currentUserActivity = (0,_functions__WEBPACK_IMPORTED_MODULE_3__.createUserStepData)(
    mainData.currentUser,
    mainData.activity
  );
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayActivityTrendGraph)(
    (0,_functions__WEBPACK_IMPORTED_MODULE_3__.increasingStepDays)(currentUserActivity),
    mainData.today
  );
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.calcStepComparison)(mainData.currentUser, mainData.users);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.createUserActivityGraph)(currentUserActivity, 99, mainData.currentUser);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayMinutesActive)(currentUserActivity, mainData.today);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayUserSteps)(currentUserActivity, mainData.today);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayDistanceWalked)(
    currentUserActivity,
    mainData.today,
    mainData.currentUser
  );
  (0,_functions__WEBPACK_IMPORTED_MODULE_3__.friendsStepChallenge)(mainData.currentUser, mainData.users, mainData.activity);
  (0,_functions__WEBPACK_IMPORTED_MODULE_3__.increasingStepDays)(currentUserActivity);
};

window.addEventListener('load', () => {
  Promise.all((0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.createFetchRequest)()).then((promisesArray) => {
    mainData.users = promisesArray[0].users;
    mainData.hydration = promisesArray[1].hydrationData;
    mainData.sleep = promisesArray[2].sleepData;
    mainData.activity = promisesArray[3].activityData;
    generateWebPage();
  });
});

_domUpdates__WEBPACK_IMPORTED_MODULE_1__.userInfoButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.toggleInfo);

_domUpdates__WEBPACK_IMPORTED_MODULE_1__.hydroUserInputButton.addEventListener('click', () => {
  let input = (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.gatherUserInput)();
  if (input === false) {
    return;
  }
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.postUserInput)(mainData.currentUser, input)
    .then(() => {
      return fetch('https://fitlit-api-green.vercel.app/api/v1/hydration');
    })
    .then((response) => response.json())
    .then((data) => {
      mainData.hydration = data.hydrationData;
      let currentUserH2O = mainData.hydration.filter(
        (data) => mainData.currentUser.id === data.userID
      );
      mainData.today = '2023/07/02';
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.resetDomAfterPost)(currentUserH2O, mainData.today);
    })
    .catch((error) => console.log(error));
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map