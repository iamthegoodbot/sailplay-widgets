
(function () {

    require('./fonts/Knockout-HTF49-Liteweight/stylesheet.css');
    var SAILPLAY = require('./node_modules/sailplay-hub/sailplay.hub.js');
    
    var PJILeadform = function (options) {
    
      var _tmpl = '<div class="pji-leadform">\n    <div class="pji-leadform-layout" pji-leadform-close></div>\n    \n    <div class="pji-leadform-content pji-leadform-content__main">\n        <i class="pji-leadform-close" pji-leadform-close></i>\n        <div class="pji-leadform-header"><%this.header%></div>\n        <div class="pji-leadform-description"><%this.description%></div>\n        <form class="pji-leadform-form">\n            <label class="pji-leadform-input">\n                <span class="pji-leadform-input--label">E-mail</span>\n                <input type="email" class="pji-leadform-input--el" name="email" autocomplete="off" required>\n            </label>\n            <label class="pji-leadform-checkbox">\n                <input type="checkbox" class="pji-leadform-checkbox--el" name="marketing">\n                <i class="pji-leadform-checkbox--icon"></i>\n                <span class="pji-leadform-checkbox--label"><%this.marketing_checkbox%></span>\n            </label>\n            <label class="pji-leadform-checkbox">\n                <input type="checkbox" class="pji-leadform-checkbox--el" name="loyalty" disabled="disabled">\n                <i class="pji-leadform-checkbox--icon"></i>\n                <span class="pji-leadform-checkbox--label"><%this.loyalty_checkbox%></span>\n            </label>\n            <input type="submit" disabled="disabled" class="pji-leadform-button" value="<%this.submit_button%>" name="submit_button">\n        </form>\n    </div>\n    \n</div>';
      var _notify_tmpl = '<div class="pji-leadform-content pji-leadform-content__notify">\n    <i class="pji-leadform-close" pji-leadform-close></i>\n    <div class="pji-leadform-header"><%this.header%></div>\n    <% if(this.img) { %>\n        <div class="pji-leadform-image">\n            <img src="<% this.img %>">\n        </div>\n    <% } %>\n    <div class="pji-leadform-description"><%this.message%></div>\n</div>';
      var _styles = '.pji-leadform {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    visibility: hidden;\n    opacity: 0;\n    transform: scale(1.2);\n    transition: 0.3s ease;\n    text-align: center;\n    font-family: \'Roboto\', sans-serif;\n    font-weight: 300;\n    overflow: auto;\n    font-size: 0;\n    background: #0F9675;\n}\n\n.pji-leadform.pji-leadform__show {\n    z-index: 999999;\n    visibility: visible;\n    opacity: 1;\n    transform: scale(1);\n}\n\n.pji-leadform-layout {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0.8;\n    z-index: 1;\n}\n\n.pji-leadform:before {\n    content: \'\';\n    display: inline-block;\n    vertical-align: middle;\n    width: 0;\n    height: 100%;\n}\n\n.pji-leadform-content {\n    position: relative;\n    display: none;\n    vertical-align: middle;\n    z-index: 2;\n    background: white;\n    width: 100%;\n    text-align: left;\n    height: auto;\n    padding: 50px 35px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    visibility: hidden;\n    opacity: 0;\n    transform: scale(1.2);\n    transition: 0.3s ease;\n}\n\n.pji-leadform-content__main {\n    max-width: 700px;\n}\n\n.pji-leadform-content__notify {\n    max-width: 300px;\n    text-align: center;\n}\n\n.pji-leadform-content__active {\n    visibility: visible;\n    opacity: 1;\n    transform: scale(1);\n}\n\n.pji-leadform-content__main:after {\n    content: \'\';\n    position: absolute;\n    width: 240px;\n    height: 100%;\n    right: 55px;\n    /*top: -90px;*/\n    top: 10px;\n    display: block;\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/47e087936b91d3d7714ffe13f47556ae.png\') no-repeat center top/contain;\n}\n\n.pji-leadform-close {\n    display: block;\n    position: absolute;\n    width: 16px;\n    height: 16px;\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/69e9f5792c4d13c0597fb9e7bb8cd843.svg\') no-repeat center center/contain;\n    top: 0;\n    right: -26px;\n    cursor: pointer;\n    transition: 0.3s ease;\n}\n\n.pji-leadform-close:hover {\n    transform: rotate(90deg);\n}\n\n.pji-leadform-header {\n    max-width: 310px;\n    font-size: 35px;\n    line-height: 1;\n    font-family: \'Knockout\';\n    text-transform: uppercase;\n    color: #0F9675;\n    padding-top: 10px;\n}\n\n.pji-leadform-description {\n    max-width: 310px;\n    font-size: 14px;\n    line-height: 18px;\n    padding: 10px 0 15px;\n}\n\n.pji-leadform-image {\n    padding: 40px 0;\n}\n\n.pji-leadform-image img {\n    height: 95px;\n    width: auto;\n}\n\n.pji-leadform-form {\n    max-width: 310px;\n}\n\n.pji-leadform-input {\n    margin-bottom: 25px;\n    display: block;\n}\n\n.pji-leadform-input--label {\n    font-size: 12px;\n    line-height: 14px;\n    margin-bottom: 10px;\n    display: inline-block;\n}\n\n.pji-leadform-input--el {\n    width: 100%;\n    height: 46px;\n    font-size: 16px;\n    display: inline-block;\n    outline: none;\n    line-height: 46px;\n    box-sizing: border-box;\n    padding: 0 10px;\n    border: 2px solid #E0E0E0;\n    border-radius: 5px;\n}\n\n.pji-leadform a, .pji-leadform a:hover, .pji-leadform a:active, .pji-leadform a:focus {\n    color: #0F9675;\n}\n\n.pji-leadform-checkbox {\n    margin-bottom: 25px;\n    position: relative;\n    display: block;\n    white-space: nowrap;\n}\n\n.pji-leadform-checkbox--el {\n    visibility: hidden;\n    opacity: 0;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.pji-leadform-checkbox--icon {\n    display: inline-block;\n    background-color: #0F9675;\n    vertical-align: top;\n    width: 23px;\n    height: 23px;\n    cursor: pointer;\n    border-radius: 5px;\n    position: relative;\n    margin-right: 5px;\n}\n\n.pji-leadform-checkbox--icon:before {\n    content: \'\';\n    display: block;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    transform: scale(0);\n    background: url(\'https://sailplays3.cdnvideo.ru/media/assets/assetfile/197c49bfddee300f10067de573c2e7aa.svg\') no-repeat center center/65% auto;\n    transition: 0.3s ease;\n}\n\n.pji-leadform-checkbox--label {\n    display: inline-block;\n    vertical-align: top;\n    white-space: normal;\n    font-size: 14px;\n    line-height: 18px;\n    color: #949494;\n    padding-top: 3px;\n}\n\n.pji-leadform-checkbox--el:checked + i:before {\n    transform: scale(1);\n}\n\n.pji-leadform-checkbox--el:disabled {\n    display: none;\n}\n\n.pji-leadform-checkbox--el:disabled + i {\n    background: #949494;\n    cursor: default;\n}\n\n.pji-leadform-button {\n    width: 100%;\n    height: 46px;\n    font-size: 18px;\n    outline: none;\n    font-weight: 700;\n    line-height: 46px;\n    background: #0F9675;;\n    box-sizing: border-box;\n    border: none;\n    padding: 0;\n    color: white;\n    -webkit-appearance: none;\n    border-radius: 5px;\n    transition: 0.3s ease;\n    cursor: pointer;\n}\n\n.pji-leadform-button:disabled {\n    background: #949494;\n    cursor: default;\n}\n\n.pji-leadform-button:hover {\n    opacity: 0.9;\n}\n\n@media screen and (max-width: 800px) and (min-width: 551px) {\n\n    .pji-leadform-close {\n        right: 0;\n        top: -35px;\n        width: 25px;\n        height: 25px;\n    }\n    \n    .pji-leadform-content {\n        margin: 70px 0 0;\n        max-width: 95%;\n    }\n    \n    .pji-leadform-content:after {\n        width: 90px;\n        height: 170px;\n    }\n\n    .pji-leadform-header {\n        max-width: 100%;\n        padding-right: 130px;\n        box-sizing: border-box;\n    }\n    \n    .pji-leadform-description {\n        max-width: 100%;\n        box-sizing: border-box;\n        padding: 10px 130px 15px 0;\n    }\n\n    .pji-leadform-form {\n        max-width: 100%;\n    }\n    \n}\n\n\n@media screen and (max-width: 550px) {\n    \n    .pji-leadform-close {\n        right: 0;\n        top: -35px;\n        width: 25px;\n        height: 25px;\n    }\n    \n    .pji-leadform-content {\n        margin: 70px 0 0;\n        max-width: 95%;\n    }\n\n    .pji-leadform-content:after {\n        top: -50px;\n        left: 0;\n        right: 0;\n        width: 50px;\n        margin: auto;\n        height: 100px;\n    }\n\n    .pji-leadform-header {\n        max-width: 100%;\n    }\n\n    .pji-leadform-description {\n        max-width: 100%;\n    }\n\n    .pji-leadform-form {\n        max-width: 100%;\n    }\n\n}\n\n';

      this.el = {};
      this.options = options || {};
      this.template = 
        this.options.bindings ? 
          this.TemplateEngine(this.options.template ||  _tmpl, this.options.bindings) : 
          (this.options.template || _tmpl);
    
      this.notify_template = this.options.notify_template || _notify_tmpl;
      
      this.styles = 
        this.options.bindings ? 
          this.TemplateEngine(this.options.styles || _styles, this.options.bindings) :
          (this.options.styles || _styles);
      
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
          this.styles = this.TemplateEngine(this.options.styles || _styles, this.options.bindings);
        }
        this.init.call(this);
      }.bind(this));
    
      SAILPLAY.send('init', {
        partner_id: this.options.partner_id || 1737,
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
          tags.push(this.options.submit_tag || this.options.bindings.submit_tag || 'Lead form registration');
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
        if (this.onCloseHidePopup) {
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
        if (this.onCloseHidePopup) {
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
      SAILPLAY.cookies.createCookie('PJILeadform_hide', true, 1);
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
    
    if (typeof window !== 'undefined') window.PJILeadform = PJILeadform;
    if (typeof module !== 'undefined') module.exports = PJILeadform;
    if (typeof exports !== 'undefined') exports = PJILeadform;
    
    }());