/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var SAILPLAY = __webpack_require__(1);

var PJILeadform = function (options) {

  var _tmpl = '<div class="pji-leadform">\n    <div class="pji-leadform-layout" pji-leadform-close></div>\n    \n    <div class="pji-leadform-content pji-leadform-content__main">\n        <i class="pji-leadform-close" pji-leadform-close></i>\n        <div class="pji-leadform-header"><%this.header%></div>\n        <div class="pji-leadform-description"><%this.description%></div>\n        <form class="pji-leadform-form">\n            <label class="pji-leadform-input">\n                <span class="pji-leadform-input--label">E-mail</span>\n                <input type="email" class="pji-leadform-input--el" name="email" autocomplete="off" required>\n            </label>\n            <label class="pji-leadform-checkbox">\n                <input type="checkbox" class="pji-leadform-checkbox--el" name="marketing">\n                <i class="pji-leadform-checkbox--icon"></i>\n                <span class="pji-leadform-checkbox--label"><%this.marketing_checkbox%></span>\n            </label>\n            <label class="pji-leadform-checkbox">\n                <input type="checkbox" class="pji-leadform-checkbox--el" name="loyalty" disabled="disabled">\n                <i class="pji-leadform-checkbox--icon"></i>\n                <span class="pji-leadform-checkbox--label"><%this.loyalty_checkbox%></span>\n            </label>\n            <input type="submit" disabled="disabled" class="pji-leadform-button" value="<%this.submit_button%>" name="submit_button">\n        </form>\n    </div>\n    \n</div>';
  var _notify_tmpl = '<div class="pji-leadform-content pji-leadform-content__notify">\n    <i class="pji-leadform-close" pji-leadform-close></i>\n    <div class="pji-leadform-header"><%this.header%></div>\n    <% if(this.img) { %>\n        <div class="pji-leadform-image">\n            <img src="<% this.img %>">\n        </div>\n    <% } %>\n    <div class="pji-leadform-description"><%this.message%></div>\n</div>';
  var _styles = '.pji-leadform {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    visibility: hidden;\n    opacity: 0;\n    transform: scale(1.2);\n    transition: 0.3s ease;\n    text-align: center;\n    font-family: \'Roboto\', sans-serif;\n    font-weight: 300;\n    overflow: auto;\n    font-size: 0;\n    background: #0F9675;\n}\n\n.pji-leadform.pji-leadform__show {\n    z-index: 999999;\n    visibility: visible;\n    opacity: 1;\n    transform: scale(1);\n}\n\n.pji-leadform-layout {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0.8;\n    z-index: 1;\n}\n\n.pji-leadform:before {\n    content: \'\';\n    display: inline-block;\n    vertical-align: middle;\n    width: 0;\n    height: 100%;\n}\n\n.pji-leadform-content {\n    position: relative;\n    display: none;\n    vertical-align: middle;\n    z-index: 2;\n    background: white;\n    width: 100%;\n    text-align: left;\n    height: auto;\n    padding: 50px 35px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    visibility: hidden;\n    opacity: 0;\n    transform: scale(1.2);\n    transition: 0.3s ease;\n}\n\n.pji-leadform-content__main {\n    max-width: 700px;\n}\n\n.pji-leadform-content__notify {\n    max-width: 300px;\n    text-align: center;\n}\n\n.pji-leadform-content__active {\n    visibility: visible;\n    opacity: 1;\n    transform: scale(1);\n}\n\n.pji-leadform-content__main:after {\n    content: \'\';\n    position: absolute;\n    width: 240px;\n    height: 100%;\n    right: 55px;\n    /*top: -90px;*/\n    top: 10px;\n    display: block;\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/47e087936b91d3d7714ffe13f47556ae.png\') no-repeat center top/contain;\n}\n\n.pji-leadform-close {\n    display: block;\n    position: absolute;\n    width: 16px;\n    height: 16px;\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/69e9f5792c4d13c0597fb9e7bb8cd843.svg\') no-repeat center center/contain;\n    top: 0;\n    right: -26px;\n    cursor: pointer;\n    transition: 0.3s ease;\n}\n\n.pji-leadform-close:hover {\n    transform: rotate(90deg);\n}\n\n.pji-leadform-header {\n    max-width: 310px;\n    font-size: 35px;\n    line-height: 1;\n    font-family: \'Knockout\';\n    text-transform: uppercase;\n    color: #0F9675;\n    padding-top: 10px;\n}\n\n.pji-leadform-description {\n    max-width: 310px;\n    font-size: 14px;\n    line-height: 18px;\n    padding: 10px 0 15px;\n}\n\n.pji-leadform-image {\n    padding: 40px 0;\n}\n\n.pji-leadform-image img {\n    height: 95px;\n    width: auto;\n}\n\n.pji-leadform-form {\n    max-width: 310px;\n}\n\n.pji-leadform-input {\n    margin-bottom: 25px;\n    display: block;\n}\n\n.pji-leadform-input--label {\n    font-size: 12px;\n    line-height: 14px;\n    margin-bottom: 10px;\n    display: inline-block;\n}\n\n.pji-leadform-input--el {\n    width: 100%;\n    height: 46px;\n    font-size: 16px;\n    display: inline-block;\n    outline: none;\n    line-height: 46px;\n    box-sizing: border-box;\n    padding: 0 10px;\n    border: 2px solid #E0E0E0;\n    border-radius: 5px;\n}\n\n.pji-leadform a, .pji-leadform a:hover, .pji-leadform a:active, .pji-leadform a:focus {\n    color: #0F9675;\n}\n\n.pji-leadform-checkbox {\n    margin-bottom: 25px;\n    position: relative;\n    display: block;\n    white-space: nowrap;\n}\n\n.pji-leadform-checkbox--el {\n    visibility: hidden;\n    opacity: 0;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.pji-leadform-checkbox--icon {\n    display: inline-block;\n    background-color: #0F9675;\n    vertical-align: top;\n    width: 23px;\n    height: 23px;\n    cursor: pointer;\n    border-radius: 5px;\n    position: relative;\n    margin-right: 5px;\n}\n\n.pji-leadform-checkbox--icon:before {\n    content: \'\';\n    display: block;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    transform: scale(0);\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/197c49bfddee300f10067de573c2e7aa.svg\') no-repeat center center/65% auto;\n    transition: 0.3s ease;\n}\n\n.pji-leadform-checkbox--label {\n    display: inline-block;\n    vertical-align: top;\n    white-space: normal;\n    font-size: 14px;\n    line-height: 18px;\n    color: #949494;\n    padding-top: 3px;\n}\n\n.pji-leadform-checkbox--el:checked + i:before {\n    transform: scale(1);\n}\n\n.pji-leadform-checkbox--el:disabled {\n    display: none;\n}\n\n.pji-leadform-checkbox--el:disabled + i {\n    background: #949494;\n    cursor: default;\n}\n\n.pji-leadform-button {\n    width: 100%;\n    height: 46px;\n    font-size: 18px;\n    outline: none;\n    font-weight: 700;\n    line-height: 46px;\n    background: #0F9675;;\n    box-sizing: border-box;\n    border: none;\n    padding: 0;\n    color: white;\n    -webkit-appearance: none;\n    border-radius: 5px;\n    transition: 0.3s ease;\n    cursor: pointer;\n}\n\n.pji-leadform-button:disabled {\n    background: #949494;\n    cursor: default;\n}\n\n.pji-leadform-button:hover {\n    opacity: 0.9;\n}\n\n@media screen and (max-width: 800px) and (min-width: 551px) {\n\n    .pji-leadform-close {\n        right: 0;\n        top: -35px;\n        width: 25px;\n        height: 25px;\n    }\n    \n    .pji-leadform-content {\n        margin: 70px 0 0;\n        max-width: 95%;\n    }\n    \n    .pji-leadform-content:after {\n        width: 90px;\n        height: 170px;\n    }\n\n    .pji-leadform-header {\n        max-width: 100%;\n        padding-right: 130px;\n        box-sizing: border-box;\n    }\n    \n    .pji-leadform-description {\n        max-width: 100%;\n        box-sizing: border-box;\n        padding: 10px 130px 15px 0;\n    }\n\n    .pji-leadform-form {\n        max-width: 100%;\n    }\n    \n}\n\n\n@media screen and (max-width: 550px) {\n    \n    .pji-leadform-close {\n        right: 0;\n        top: -35px;\n        width: 25px;\n        height: 25px;\n    }\n    \n    .pji-leadform-content {\n        margin: 70px 0 0;\n        max-width: 95%;\n    }\n\n    .pji-leadform-content:after {\n        top: -50px;\n        left: 0;\n        right: 0;\n        width: 50px;\n        margin: auto;\n        height: 100px;\n    }\n\n    .pji-leadform-header {\n        max-width: 100%;\n    }\n\n    .pji-leadform-description {\n        max-width: 100%;\n    }\n\n    .pji-leadform-form {\n        max-width: 100%;\n    }\n\n}\n\n';

  this.el = {};
  this.options = options || {};
  this.template = this.options.bindings ? this.TemplateEngine(this.options.template || _tmpl, this.options.bindings) : (this.options.template || _tmpl);
  this.notify_template = this.options.notify_template || _notify_tmpl;
  this.styles = this.options.styles || _styles;
  this.isOpen = false;
  this.onCloseHidePopup = true;

  this.init = this.init.bind(this);
  this.formToObject = this.formToObject.bind(this);
  this.bindings = this.bindings.bind(this);
  this.TemplateEngine = this.TemplateEngine.bind(this);
  this.isValid = this.isValid.bind(this);
  this.reset = this.reset.bind(this);
  this.showContent = this.showContent.bind(this);
  this.makeNotify = this.makeNotify.bind(this);
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.destroy = this.destroy.bind(this);

  SAILPLAY.on('init.success', function () {
    SAILPLAY.send('magic.config', this.options.config_name || 'leadform');
  }.bind(this));

  SAILPLAY.on('magic.config.success', function (response) {
    if (response.config.config.bindings) {
      this.options.bindings = response.config.config.bindings;
      this.template = this.TemplateEngine(this.options.template || _tmpl, this.options.bindings);
    }
    this.init.call(this);
  }.bind(this));

  SAILPLAY.send('init', {
    partner_id: 1737,
    lang: 'en',
    domain: window.location.protocol + '//sailplay.ru'
  });

};

// http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
PJILeadform.prototype.TemplateEngine = function (html, options) {
  var re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0, match;

  var add = function (line, js) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
      (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  };

  while (match = re.exec(html)) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }

  add(html.substr(cursor, html.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
};

PJILeadform.prototype.init = function () {

  var styles = document.createElement('style');
  styles.innerHTML = this.styles;

  var template = document.createElement('template');
  template.innerHTML = this.template;

  this.el.styles = document.body.appendChild(styles);
  this.el.template = document.body.appendChild(template.content.firstChild);

  this.bindings();

  if (this.options.show_on_window_blur) {
    var change_tab = false;
    window.onblur = this.show.bind(this);
    window.addEventListener("pagehide", function () {
      change_tab = true;
    }.bind(this));
    window.addEventListener("pageshow", function () {
      if (change_tab) {
        this.show.call(this)
      }
      change_tab = false;
    }.bind(this));
  }

  if (this.options.show_after) {
    setTimeout(function () {
      this.show();
    }.bind(this), this.options.show_after);
  }

};

PJILeadform.prototype.bindings = function () {

  var form = this.el.template.getElementsByTagName('form')[0];

  var onChange = function (e) {
    var data = this.formToObject(form);
    var button = form.querySelector('input[type=submit]');

    if (form.marketing && form.loyalty) {
      if (form.marketing.checked) {
        form.loyalty.disabled = false;
      } else {
        form.loyalty.checked = false;
        form.loyalty.disabled = true;
      }
    }

    if (button && this.isValid(data)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }.bind(this);

  var onSubmit = function (e) {
    e.preventDefault();
    var data = this.formToObject(form);
    if (this.isValid(data)) {
      var tags = [];
      tags.push(this.options.submit_tag || 'Lead form registration');
      if (data.marketing) {
        tags.push(this.options.marketing_tag || 'Marketing Opt-in')
      }
      if (data.loyalty) {
        tags.push(this.options.loyalty_tag || 'Loyalty Opt-in')
      }
      var params = {user: {email: data.email}, tags: tags};

      SAILPLAY.send('tags.exist', {tags: tags, user: {email: data.email}}, function (response_exist) {
        if (response_exist && response_exist.tags &&
          ( (!data.loyalty && data.marketing && response_exist.tags[1].exist) ||
          (data.loyalty && data.marketing && response_exist.tags[2].exist) )
        ) {

          this.onCloseHidePopup = false;
          this.makeNotify(this.options.bindings.error)

        } else {

          SAILPLAY.send('tags.add', params, function (response) {
            SAILPLAY.cookies.createCookie('PJILeadform_submit', true);
            this.reset();
            this.makeNotify(this.options.bindings.success)
          }.bind(this));

        }
      }.bind(this));
    }
    return false;
  }.bind(this);

  var closeFunction = function () {
    if(this.onCloseHidePopup) {
      this.hide();
    } else {
      this.showContent('main');
    }
    this.onCloseHidePopup = true;
  }.bind(this);

  var inputs = form.querySelectorAll('input');

  if (inputs) {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', onChange);
      inputs[i].addEventListener('keyup', onChange);
    }
  }

  form
    .querySelector('input[type=checkbox]')
    .parentNode
    .addEventListener('click', onChange);

  form
    .addEventListener('submit', onSubmit);

  var closeElements = this.el.template
    .querySelectorAll('[pji-leadform-close]');

  if (closeElements) {
    for (var i = 0; i < closeElements.length; i++) {
      closeElements[i].addEventListener('click', closeFunction);
    }
  }
};

PJILeadform.prototype.isValid = function (data) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(data.email) && data.marketing;
};

PJILeadform.prototype.formToObject = function (form) {
  var form_object = {};
  var inputs = form.getElementsByTagName('input');
  Array.prototype.forEach.call(inputs, function (input) {
    form_object[input.name] = input.type == 'checkbox' ? input.checked : input.value;
  });
  return form_object;
};

PJILeadform.prototype.makeNotify = function (data) {
  if (!data) return;
  if (this.el.notify_template) this.el.notify_template.remove();
  var template = document.createElement('template');
  template.innerHTML = this.TemplateEngine(this.notify_template, data);
  this.el.notify_template = this.el.template.appendChild(template.content.firstChild);

  var closeFunction = function () {
    if(this.onCloseHidePopup) {
      this.hide();
    } else {
      this.showContent('main');
    }
    this.onCloseHidePopup = true;
  }.bind(this);
  // fast fix for notify
  var closeElements = this.el.notify_template.querySelectorAll('[pji-leadform-close]');

  if (closeElements) {
    for (var i = 0; i < closeElements.length; i++) {
      closeElements[i].addEventListener('click', closeFunction);
    }
  }
  this.showContent('notify');
};

PJILeadform.prototype.showContent = function (className) {
  if (!className) return;
  if (this.timeout) clearTimeout(this.timeout);
  var active_content = this.el.template.querySelector('.pji-leadform-content__active');
  var needed_content = this.el.template.querySelector('.pji-leadform-content__' + className);

  if (active_content) {
    active_content.classList.remove('pji-leadform-content__active')
    this.timeout = setTimeout(function () {
      active_content.style.display = 'none';
      if (needed_content) needed_content.style.display = 'inline-block';

      this.timeout = setTimeout(function () {
        if (needed_content) needed_content.classList.add('pji-leadform-content__active');
      }.bind(this), 100);

    }.bind(this), 400);
  } else {
    if (needed_content) needed_content.style.display = 'inline-block';

    this.timeout = setTimeout(function () {
      if (needed_content) needed_content.classList.add('pji-leadform-content__active');
    }.bind(this), 100);
  }

};

PJILeadform.prototype.reset = function () {
  var form = this.el.template.getElementsByTagName('form')[0];
  var button = form.querySelector('input[type="submit"]');
  button.disabled = true;
  form.reset();
};

PJILeadform.prototype.show = function () {
  if (SAILPLAY.cookies.readCookie('PJILeadform_hide')) return;
  if (this.isOpen) return;
  this.showContent('main');
  this.timeout = setTimeout(function () {
    this.isOpen = true;
    this.el.template.classList.add(this.options.showClass || 'pji-leadform__show');
  }.bind(this), 400);
};


PJILeadform.prototype.hide = function () {
  SAILPLAY.cookies.createCookie('PJILeadform_hide', true);
  if (this.timeout) clearTimeout(this.timeout);
  this.isOpen = false;
  this.el.template.classList.remove(this.options.showClass || 'pji-leadform__show');
  this.timeout = setTimeout(function () {
    var active_content = this.el.template.querySelector('.pji-leadform-content__active');
    if (active_content) {
      active_content.classList.remove('pji-leadform-content__active');
      active_content.style.display = 'none';
    }
  }.bind(this), 400);
};

PJILeadform.prototype.destroy = function () {
  this.el.styles.remove();
  this.el.template.remove();
};




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  var last_scroll = 0;
  function disableScroll() {
    last_scroll = document.body.scrollTop;
    window.document.body.style.top = -last_scroll + 'px';
    window.document.body.className += ' noscroll'
  }

  function enableScroll() {
    window.document.body.className = window.document.body.className.replace(' noscroll', '')
    window.document.body.style.top = 0;    
    window.scrollTo(0, last_scroll)
  }  

  var SAILPLAY = (function () {

    //methods that not supported in old browsers
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
          from += len;

        for (; from < len; from++) {
          if (from in this &&
            this[from] === elt)
            return from;
        }
        return -1;
      };
    }

    var cookies = {
      createCookie: function (name, value, days) {
        var expires;
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
      },
      readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
      eraseCookie: function (name) {
        cookies.createCookie(name, "", -1);
      }
    };

    //simple jsonp service
    var JSONP = {
      currentScript: null,
      get: function (url, data, success, error) {
        var src = url + (url.indexOf("?") + 1 ? "&" : "?");
        var head = document.getElementsByTagName("head")[0];
        var newScript = document.createElement("script");
        var params = [];

        data = data || {};

        //auth_hash checking
        if (!_config.auth_hash) {
          delete data.auth_hash;
        }

        window.JSONP_CALLBACK = window.JSONP_CALLBACK || {};

        var callback_name = 'sailplay_' + new Date().getTime() + Math.random().toString().replace('.', '');

        var jsonpTimeout = setTimeout(function () {
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
        }, 10000);

        window.JSONP_CALLBACK[callback_name] = function (data) {
          clearTimeout(jsonpTimeout);
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
          success && success(data);
        };

        data["callback"] = 'JSONP_CALLBACK.' + callback_name;
        if (_config.dep_id) data.dep_id = _config.dep_id;

        for (var param_name in data) {
          params.push(param_name + "=" + encodeURIComponent(data[param_name]));
        }
        src += params.join("&");

        newScript.type = "text/javascript";
        newScript.src = src;
        newScript.onerror = function (ex) {
          try {
            head.removeChild(newScript);
          }
          catch (err) {
          }
          delete window.JSONP_CALLBACK[callback_name];
          error && error(ex);
        };

        head.insertBefore(newScript, head.firstChild);
      },
      success: null
    };

    var sp = {};

    //observer pattern
    var _handlers = {};

    sp.on = function (event, handler) {
      if (typeof (_handlers[event]) == "undefined")
        _handlers[event] = [];
      _handlers[event].push(handler);
    };

    sp.send = function (event, data, callback) {
      if (_handlers[event]) {
        for (var i = 0; i < _handlers[event].length; i++) {
          _handlers[event][i](data, callback);
        }
      }
    };

    //private config
    var _config = {};
    var _remote_login_init = false;

    function initError() {
      alert('Please init SailPlay HUB first!');
    }

    function remoteLogin(opts) {

      var frame;
      disableScroll();
      opts = opts || {};

      if (opts.node && opts.node.nodeType == 1 && opts.node.tagName == 'IFRAME') {
        frame = opts.node;
      }
      else {
        frame = document.createElement('IFRAME');
        frame.style.border = 'none';
        frame.style.position = 'fixed';
        frame.style.top = '0';
        frame.style.left = '0';
        frame.style.bottom = '0';
        frame.style.right = '0';
        frame.style.width = '410px';
        frame.style.height = '510px';
        frame.created = true;
        frame.style.background = 'transparent';
        frame.style.margin = 'auto';
        frame.style.zIndex = '100000';
        document.body.appendChild(frame);

      }

      var frame_id = frame.id || 'sailplay_login_frame_' + new Date().getTime();

      frame.name = frame_id;
      frame.id = frame_id;

      function onMessage(messageEvent) {

        var data = {};

        var _domain = _config.DOMAIN.indexOf('http:') != -1 || _config.DOMAIN.indexOf('https:') != -1 ? _config.DOMAIN : 'http:' + _config.DOMAIN;

        if (messageEvent.origin == _domain) {
          try {
            data = JSON.parse(messageEvent.data);
          }
          catch (e) {

          }
        }
        if (data.name == 'login.success') {
          sp.send('login.do', data.auth_hash);
          return;
        }
        if (data.name == 'login.cancel') {
          sp.send('login.cancel');
          cancelLogin();
          enableScroll();          
          return;
        }
        if (data.name == 'login.check') {
          if (data.auth_hash == 'None') {
            sp.send('logout');
          }
          else {
            cancelLogin();
            enableScroll();            
            sp.send('login.do', data.auth_hash, data)
          }
          return;
        }
        if (data.name == 'logout.success') {
          _config.auth_hash = '';
          sp.send('logout.success');
        }

      }

      function cancelLogin() {
        if (frame.created) {
          document.body.removeChild(frame);
          window.removeEventListener("message", onMessage, false);
          _remote_login_init = false;
        }
      }

      var params = {};
      params.partner_id = _config.partner.id;
      params.dep_id = _config.dep_id || '';
      params.background = opts.background || '';
      params.partner_info = opts.partner_info || 0;
      if(opts.reg_match_email_oid) {
        params.reg_match_email_oid = opts.reg_match_email_oid;
      }
      if(opts.css_link) {
        params.css_link = opts.css_link;
      }
      if (opts.lang) {
        params.lang = opts.lang;
      }
      params.disabled_options = opts.disabled_options || '';
      params.texts = JSON.stringify(opts.texts || '');


      var params_string = [];

      var src = _config.DOMAIN + '/users/auth-page/?';
      for (var param_name in params) {
        params_string.push(param_name + "=" + encodeURIComponent(params[param_name]));
      }
      src += params_string.join("&");

      frame.setAttribute('src', src);

      if (!_remote_login_init) {
        window.addEventListener("message", onMessage, false);
        _remote_login_init = true;
      }

    }

    //init function
    sp.on('init', function (params) {
      if (!params) {
        alert('SailPlay: provide required parameters');
      }
      if (!params.partner_id) {
        alert('SailPlay: provide partner_id');
        return;
      }
      JSONP.get((params.domain || 'http://sailplay.ru') + '/js-api/' + params.partner_id + '/config/', {
        lang: params.lang || 'ru',
        dep_id: (params.dep_id || '')
      }, function (response) {
        if (response && response.status == 'ok') {

          _config = response.config;
          _config.DOMAIN = (params.domain || 'http://sailplay.ru');
          _config.dep_id = params.dep_id || '';
          _config.env.staticUrl = params.static_url || _config.env.staticUrl;
          _config.social_networks = ['fb', 'vk', 'tw', 'gp', 'ok'];
          _config.platform = params.platform || 'desktop';

          //postmessage events init
          //1. bind action events
          function onActionMessage(messageEvent) {
            var data = {};
            if (messageEvent.origin == _config.DOMAIN) {
              try {
                data = JSON.parse(messageEvent.data);
              }
              catch (e) {

              }

              switch (data && data.name) {
                case 'actions.perform.success':
                  sp.send('actions.perform.success', data);
                  break;
                case 'actions.perform.error':
                  sp.send('actions.perform.error', data);
                  break;
                case 'actions.social.connect.complete':
                  sp.send('actions.social.connect.complete', data);
                  break;
                case 'actions.social.connect.success':
                  sp.send('actions.social.connect.success', data);
                  break;
                case 'actions.social.connect.error':
                  sp.send('actions.social.connect.error', data);
                  break;
                case 'friend_invite_cookie':
                  break;
                case 'actions.social.gp.like.mouseenter':
                  sp.send('actions.social.gp.like.mouseenter');
                  break;
                case 'actions.social.gp.like.mouseleave':
                  sp.send('actions.social.gp.like.mouseleave');
                  break;
              }

            }
          }

          window.addEventListener("message", onActionMessage, false);

          //2. recieve ref_hash info
          // _config.ref_hash = sp.url_params().ref_hash || '';
          //var cookie_frame = document.createElement('IFRAME');
          //cookie_frame.style.width = 0;
          //cookie_frame.style.height = 0;
          //cookie_frame.style.top = '-10000px';
          //cookie_frame.style.left = '-10000px';
          //cookie_frame.src = _config.DOMAIN + '/js-api/' + _config.partner.id + '/actions/social-widget/v2/';
          //document.body.appendChild(cookie_frame);
          //cookie_frame.onload = function(){
          //  document.body.removeChild(cookie_frame);
          //};

          sp.send('init.success', _config);
          //        console.dir(_config);
        } else {
          sp.send('init.error', response);
          alert('SailPlay: app load failed!');
        }
      });

    });

    sp.on('login.remote', function (options) {
      remoteLogin(options);
    });

    //////////////////
    //bind hub events
    sp.on('language.set', function (lang) {
      if (_config == {}) {
        initError();
        return;
      }
      if (typeof lang == 'string') {
        JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/config/', {lang: lang}, function (response) {
          if (response && response.status == 'ok') {
            _config.lang = response.config.lang;
            sp.send('language.set.success', _config.lang);
            //        console.dir(_config);
          } else {
            sp.send('language.set.error', response);
          }
        });
      }
    });

    //////////////////
    //bind api events

    //LOGIN & LOGOUT
    sp.on('login.do', function (auth_hash) {
      _config.auth_hash = auth_hash;
//    cookies.createCookie('sp_auth_hash', _config.auth_hash);
      var params = {
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('login.success', res.user);
        } else {
          _config.auth_hash = '';
//        cookies.eraseCookie('sp_auth_hash');
          sp.send('login.error', res);
        }
      });
    });

    sp.on('login', function (auth_hash) {

      if (_config == {}) {
        initError();
        return;
      }

      sp.send('login.do', auth_hash);

    });

    sp.on('logout', function () {
      if (_config == {}) {
        initError();
        return;
      }
      var req = document.createElement('iframe');
      req.width = 0;
      req.height = 0;
      req.style.border = 'none';
      req.src = _config.DOMAIN + '/users/logout/';
      document.body.appendChild(req);
      req.onload = function () {
        document.body.removeChild(req);
        _config.auth_hash = '';
        cookies.eraseCookie('sp_auth_hash');
        sp.send('logout.success');
      };


    });

    //USER INFO
    sp.on('load.user.info', function (p, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        user_status: 1,
        badges: 1,
        last_badge: 1
      };
      if (p && p.purchases) {
        params.purchases = p.purchases;
      }
      if (p && p.all) {
        params.all = p.all;
      }
      if (p && p.user) {
        for (var param in p.user) {
          params[param] = p.user[param];
        }
      }
      else {
        params.auth_hash = _config.auth_hash;
      }
      JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
        callback && callback(res);
        if (res.status == 'ok') {
          sp.send('load.user.info.success', res);
        } else {
          sp.send('load.user.info.error', res);
        }
      });
    });

    sp.on('users.update', function (params, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/users/update/', params, function (res) {

        callback && callback(res);

        if (res.status === 'ok') {
          sp.send('users.update.success', res);
        }
        else {
          sp.send('users.update.error', res);
        }
      });

    });

    //user feedback
    sp.on('users.feedback', function (params, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }
      else {
        sp.send('auth.error');
        return;
      }

      JSONP.get(_config.DOMAIN + _config.urls.users.feedback, params, function (res) {

        callback && callback(res);

        if (res.status === 'ok') {
          sp.send('users.feedback.success', res);
        }
        else {
          sp.send('users.feedback.error', res);
        }
      });

    });

    //USER HISTORY
    sp.on('load.user.history', function (params) {
      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      JSONP.get(_config.DOMAIN + _config.urls.users.history, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('load.user.history.success', res.history);
        } else {
          sp.send('load.user.history.error', res);
        }
      });
    });

    //GIFTS GET INFO
    sp.on('gifts.get', function (giftId) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        gift_id: giftId,
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.gifts.get, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('gifts.get.success', res.gift);
        } else {
          sp.send('gifts.get.error', res);
        }
      });
    });

    //GIFTS LIST
    sp.on('load.gifts.list', function (params) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }

      params.lang = params.lang || _config.lang || 'ru';

      JSONP.get(_config.DOMAIN + _config.urls.gifts.list, params, function (res) {
        //      console.dir(res);
        if (res.status == 'ok') {
          sp.send('load.gifts.list.success', res.gifts);
        } else {
          sp.send('load.gifts.list.error', res);
        }
      });
    });

    //GIFT CATEGORIES
    sp.on('load.gifts.categories', function (params) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      JSONP.get(_config.DOMAIN + _config.urls.gifts.categories_list, params, function (res) {
        if (res.status == 'ok') {
          sp.send('load.gifts.categories.success', res.categories);
        } else {
          sp.send('load.gifts.categories.error', res);
        }
      });

    });

    //GET GIFT
    function forceCompleteGiftPurchase(giftPurchase, opts) {
      var params = {
        gift_public_key: giftPurchase.gift_public_key,
        auth_hash: _config.auth_hash
      };
      if (opts && opts.no_user_sms) {
        params.no_user_sms = opts.no_user_sms;
      }
      JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.force_confirm, params, function (res) {
        if (res.status == 'ok') {
          sp.send('gift.purchase.force_complete.success', res);
        } else {
          sp.send('gift.purchase.force_complete.error', res);
        }
        //      console.dir(res);
      });
    }

    //CREATE GIFT PURCHASE V1
    sp.on('gifts.purchase', function (p) {
      if (_config == {}) {
        initError();
        return;
      }
      var gift = p.gift || {};
      if (!_config.auth_hash) {
        sp.send('gifts.purchase.auth.error', gift);
      } else {
        var params = {
          gift_id: gift.id,
          dep_id: _config.dep_id || _config.partner.depId || '',
          auth_hash: _config.auth_hash
        };
        JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.purchase, params, function (res) {
          if (res.status == 'ok') {
            sp.send('gifts.purchase.success', res);
            if (res.is_completed) {
              var requestedPurchase = res;
              if (!requestedPurchase.request_to_partner_url) {
                forceCompleteGiftPurchase(requestedPurchase, p.options);
              } else {
                var reqGiftPurchase = {
                  gift_public_key: requestedPurchase['gift_public_key'],
                  gift_sku: requestedPurchase['gift_sku'],
                  auth_hash: _config.auth_hash
                };
                if (requestedPurchase['user_phone']) {
                  reqGiftPurchase['user_phone'] = requestedPurchase['user_phone'];
                }
                if (requestedPurchase['email']) {
                  reqGiftPurchase['email'] = requestedPurchase['email'];
                }
                JSONP.get(requestedPurchase.request_to_partner_url, reqGiftPurchase, function (res) {
                  sp.send('gifts.purchase.partner_request.success', res);
                }, function (res) {
                  sp.send('gifts.purchase.partner_request.error', res);
                  forceCompleteGiftPurchase(requestedPurchase, p.options);
                });
              }
            }
          } else {
            sp.send('gift.purchase.error', res);
          }
          //        console.dir(res);
        });
      }
    });

    //BADGES LIST
    sp.on('load.badges.list', function (p) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        auth_hash: _config.auth_hash,
        lang: p && p.lang || _config.lang || 'ru'
      };
      if(p){
        if(p.include_rules) {
          params.include_rules = 1;
        }
      }
      JSONP.get(_config.DOMAIN + _config.urls.badges.list, params, function (res) {

        //      console.dir(res);
        if (res.status == 'ok') {

          function create_badge_actions(badge) {
            if (badge && badge.is_received) {

              badge.actions = {};

              for (var sn in _config.social_networks) {

                badge.actions[_config.social_networks[sn]] = {

                  socialType: _config.social_networks[sn],
                  action: 'badge',
                  shortLink: window.location.href,
                  pic: badge.thumbs.url_250x250,
                  badgeId: badge.id,
                  msg: badge.share_msg

                };

              }
            }
          }

          for (var ch in res.multilevel_badges) {

            var multi_line = res.multilevel_badges[ch];

            for (var b in multi_line) {

              create_badge_actions(multi_line[b]);

            }

          }

          for (var olb in res.one_level_badges) {

            create_badge_actions(res.one_level_badges[olb]);

          }

          sp.send('load.badges.list.success', res);
        } else {
          sp.send('load.badges.list.error', res);
        }
      });
    });

    //PROMO-CODES SECTION
    sp.on('promocodes.apply', function (promocode) {
      if (_config == {}) {
        initError();
        return;
      }
      promocode.auth_hash = _config.auth_hash;
      if (_config.auth_hash) {
        JSONP.get(_config.DOMAIN + _config.urls.promocodes.apply, promocode, function (res) {
          if (res.status == 'ok') {
            sp.send('promocodes.apply.success', res);
          } else {
            sp.send('promocodes.apply.error', res);
          }
        });
      } else {
        sp.send('promocodes.apply.auth.error', action);
      }
    });

    // user update
    sp.on("user.update", function (params) {
      if (_config == {}) {
        initError();
        return;
      }
      JSONP.get(_config.DOMAIN + "/js-api/" + _config.partner.id + "/users/update/", params, function (res) {
        if (res.status == 'ok') {
          sp.send('user.update.success', res);
        } else {
          sp.send('user.update.error', res);
        }
      })
    });

    //TAGS SECTIONS
    sp.on('tags.add', function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var tagsObj = {
          tags: data.tags && data.tags.join(',') || []
        };
        if (data.user) {
          for (var p in data.user) {
            tagsObj[p] = data.user[p];
          }
        }
        else {
          tagsObj.auth_hash = _config.auth_hash;
        }
        JSONP.get(_config.DOMAIN + _config.urls.tags.add, tagsObj, function (res) {
          callback && callback(res);
          if (res.status == 'ok') {
            sp.send('tags.add.success', res);
          } else {
            sp.send('tags.add.error', res);
          }
        });
      } else {
        SAILPLAY.send('tags.add.auth.error', data);
      }
    });

    sp.on('tags.delete', function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var tagsObj = {
          tags: data.tags && data.tags.join(',') || []
        };
        if (data.user) {
          for (var p in data.user) {
            tagsObj[p] = data.user[p];
          }
        }
        else {
          tagsObj.auth_hash = _config.auth_hash;
        }
        JSONP.get(_config.DOMAIN + _config.urls.tags.delete, tagsObj, function (res) {
          callback && callback(res);
          if (res.status == 'ok') {
            sp.send('tags.delete.success', res);
          } else {
            sp.send('tags.delete.error', res);
          }
        });
      } else {
        SAILPLAY.send('tags.delete.auth.error', data);
      }
    });

    // tag exist
    sp.on("tags.exist", function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var obj = {
          tags: JSON.stringify(data.tags)
        };
        if (data.user) {
          for (var p in data.user) {
            obj[p] = data.user[p];
          }
        }
        else {
          obj.auth_hash = _config.auth_hash;
        }
        obj.lang = data.lang || _config.lang || 'ru';
        JSONP.get(_config.DOMAIN + _config.urls.tags.exist, obj, function (res) {
          if (res.status == 'ok') {
            sp.send('tags.exist.success', res);
          } else {
            sp.send('tags.exist.error', res);
          }
          callback && callback(res);
        });
      } else {
        sp.send('tags.exist.auth.error', data);
      }

    });

    /**
     * Add variables to user
     * @object data {custom_vars:{}, user: {}}
     * @function callback
     */
    sp.on('vars.add', function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = data.custom_vars;

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.add, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.add.success', res);
          else
            sp.send('vars.add.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.add.auth.error', data);
      }

    });

    /**
     * Get user variables
     * @object data {names: [], user: {}}
     * @function callback
     */
    sp.on("vars.batch", function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = {
          names: JSON.stringify(data.names)
        };

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.batch_get, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.batch.success', res);
          else
            sp.send('vars.batch.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.batch.auth.error', data);
      }

    });

    //LEADERBOARD SECTION
    sp.on('leaderboard.load', function () {
      if (_config == {}) {
        initError();
        return;
      }
      var tagsObj = {
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.leaderboard.data, tagsObj, function (res) {
        if (res.status == 'ok') {
          sp.send('leaderboard.load.success', res.data);
        } else {
          sp.send('leaderboard.load.error', res);
        }
      });
    });

    //REVIEWS SECTION
    sp.on('load.reviews.list', function (data) {
      if (_config == {}) {
        initError();
        return;
      }

      var req_data = {};

      if (data) {
        req_data.page = data.page || 1
      }

      JSONP.get(_config.DOMAIN + _config.urls.reviews.list, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('load.reviews.list.success', {page: res.page, pages: res.pages, reviews: res.reviews});
        } else {
          sp.send('load.reviews.list.error', res);
        }
      });
    });

    sp.on('reviews.add', function (data) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash,
        rating: data.rating || '',
        review: data.review || ''
      };
      JSONP.get(_config.DOMAIN + _config.urls.reviews.add, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('reviews.add.success', res);
        } else {
          sp.send('reviews.add.error', res);
        }
      });
    });

    sp.on('purchases.add', function (data) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash,
        price: data.price || '',
        order_num: data.order_num || ''
      };
      JSONP.get(_config.DOMAIN + _config.urls.purchase, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('purchases.add.success', res);
        } else {
          sp.send('purchases.add.error', res);
        }
      });
    });

    sp.on('magic.config', function (name) {
      if (_config == {}) {
        initError();
        return;
      }
      JSONP.get(_config.DOMAIN + _config.urls.loyalty_page_config_by_name, { name: name || 'default' }, function (res) {
        if (res.status == 'ok') {
          sp.send('magic.config.success', res);
        } else {
          sp.send('magic.config.error', res);
        }
      });
    });

    //utils
    sp.config = function () {
      return _config;
    };

    sp.find_by_properties = function (arr, props) {
      var filtered_arr = [];
      for (var i = 0; i < arr.length; i += 1) {
        var seeked = arr[i];
        var good = true;
        for (var p in props) {
          if (props[p] != seeked[p]) {
            good = false;
          }
        }
        if (good) filtered_arr.push(seeked);
      }
      return filtered_arr;
    };

    sp.jsonp = JSONP;

    sp.cookies = cookies;

    sp.is_dom = function (obj) {
      //Returns true if it is a DOM node

      function isNode(o) {
        return (
          typeof Node === "object" ? o instanceof Node :
          o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
        );
      }

      //Returns true if it is a DOM element
      function isElement(o) {
        return (
          typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
          o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
      }

      return isNode(obj) || isElement(obj);

    };

    sp.url_params = function () {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var uri_component = pair && pair[1] ? pair[1].replace(/%([^\d].)/, "%25$1") : '';
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(uri_component);
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(uri_component)];
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(uri_component));
        }
      }
      return query_string;
    };

    return sp;

  }());

  if(typeof window !== 'undefined') window.SAILPLAY = SAILPLAY;
  if(true) module.exports = SAILPLAY;
  if(true) exports = SAILPLAY;

}());


/***/ })
/******/ ]);