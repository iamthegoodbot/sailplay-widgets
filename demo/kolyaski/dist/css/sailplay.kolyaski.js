(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, ".bns_overlay {\n" +
"  position: fixed;\n" +
"  left: 0px;\n" +
"  top: 0px;\n" +
"  width: 100%;\n" +
"  height: 100%;\n" +
"  z-index: 10000;\n" +
"  background-color: rgba(0, 0, 0, 0.3);\n" +
"  display: none;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner {\n" +
"  position: absolute;\n" +
"  left: 50%;\n" +
"  top: 50%;\n" +
"  width: 714px;\n" +
"  height: 314px;\n" +
"  margin-left: -357px;\n" +
"  margin-top: -157px;\n" +
"  font-family: 'Franklin Gothic Book';\n" +
"  -webkit-box-shadow: 0 0 10px 0 #000000;\n" +
"  box-shadow: 0 0 10px 0 #000000;\n" +
"  border-radius: 20px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_left {\n" +
"  float: left;\n" +
"  width: 310px;\n" +
"  height: 100%;\n" +
"  position: absolute;\n" +
"  top: 0px;\n" +
"  left: 0px;\n" +
"  border-radius: 20px 0 0 20px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right {\n" +
"  float: right;\n" +
"  width: 404px;\n" +
"  height: 100%;\n" +
"  background-color: #FFFFFF;\n" +
"  background-repeat: no-repeat;\n" +
"  background-position: 1px 2px;\n" +
"  border-radius: 0 20px 20px 0;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_text {\n" +
"  float: left;\n" +
"  width: 80%;\n" +
"  margin-left: 10%;\n" +
"  line-height: 26px;\n" +
"  font-size: 16px;\n" +
"  color: #484754;\n" +
"  margin-top: 52px;\n" +
"  padding-bottom: 20px;\n" +
"  border-bottom: 1px solid #484754;\n" +
"  text-align: center;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_error {\n" +
"  float: left;\n" +
"  width: 90%;\n" +
"  margin-left: 5%;\n" +
"  line-height: 40px;\n" +
"  border: 1px solid #ECCCD1;\n" +
"  background-color: #F3DEDE;\n" +
"  color: #B04344;\n" +
"  font-size: 17px;\n" +
"  text-align: center;\n" +
"  margin-top: 20px;\n" +
"  font-weight: 500;\n" +
"  opacity: 0;\n" +
"  -webkit-transition: all 300ms ease;\n" +
"  -moz-transition: all 300ms ease;\n" +
"  -ms-transition: all 300ms ease;\n" +
"  -o-transition: all 300ms ease;\n" +
"  transition: all 300ms ease;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_error.act {\n" +
"  opacity: 1;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input {\n" +
"  float: left;\n" +
"  width: 80%;\n" +
"  margin-left: 10%;\n" +
"  position: relative;\n" +
"  border: 1px solid #A3A2A8;\n" +
"  border-radius: 5px;\n" +
"  overflow: hidden;\n" +
"  margin-top: 16px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input .bns_ava {\n" +
"  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUBAMAAABPKxEfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFAAAASEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUO1y0YgAAABB0Uk5TAAoTHSYwQ01WYGlzfIaPmW0HVXIAAABlSURBVAjXY2BgYFBRYAAB6/+/QQzG9///XwTSbP////8GpLmB9C8o/RtIcwHpn0jyIPUPQfrj/v8zANFM3U0gSnIxA/N2AQbm+/8M/P5fZuD9///5+/9/GOz/gwGDPwFaDkz9AwAYPlK/4K7iRAAAAABJRU5ErkJggg==');\n" +
"  background-position: center center;\n" +
"  background-repeat: no-repeat;\n" +
"  border-right: 1px solid #A3A2A8;\n" +
"  position: absolute;\n" +
"  left: 0px;\n" +
"  top: 0px;\n" +
"  width: 39px;\n" +
"  height: 100%;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input input {\n" +
"  float: left;\n" +
"  width: 100%;\n" +
"  height: 32px;\n" +
"  padding-left: 50px;\n" +
"  color: #A3A2A8;\n" +
"  font-size: 15px;\n" +
"  box-sizing: border-box;\n" +
"  border: 0px;\n" +
"  background-color: transparent;\n" +
"  outline: none;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right input[type=\"submit\"] {\n" +
"  float: left;\n" +
"  width: 60%;\n" +
"  margin-left: 20%;\n" +
"  height: 34px;\n" +
"  background-color: #337AB7;\n" +
"  color: #fff;\n" +
"  font-size: 17px;\n" +
"  font-weight: 500;\n" +
"  border: 0px;\n" +
"  margin-top: 20px;\n" +
"  border-radius: 5px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_close {\n" +
"  position: absolute;\n" +
"  right: -15px;\n" +
"  top: -15px;\n" +
"  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAMAAADL21gSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVxQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhIOjo6nZ2dmJiYj4+Ps7OzsLCwsbGxrKysqamppqamoaGhnZ2dnp6emJiYvr6+v7+/lpaWlJSUk5OTtLS0ysrKwMDAvb29u7u7ubm5uLi41NTUtbW10tLS09PT0NDQz8/PzMzM39/f2NjY2dnZ09PT0tLSz8/Pzs7Oy8vLzMzMysrK3Nzc2NjY5eXl39/f7e3t6+vr7Ozs5+fn6Ojo5OTk8fHx8PDw7u7u6urq6urq9fX19/f39vb29fX1f39/r6+vx8fH39/f////znEf1gAAAG90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCYoKSotLi8xMjM2OEdOUFVbXFxfYGJlZ2dra2ttbm9xeH+Bg4SFhoeHh4mKi5KWlpqbnZ6goKGmqrG2vb6+wcHEysvN0NHY5ufoZ2qJBQAAAaRJREFUOMudlGdXwjAUhk2T1i6stFgKiCA4UMS99957770VGfn/50htK6G0yPH90JOTPL25yX1za2r+I6CrIkAhmtGFIOUCAsjwkqL6NX+D18PRTlgBEX3htrGdw4Pd8d6WkMwjqoxBnBJdusOmHpYTjXWMLRiAYmD4AxP6nIrJLAQlcYSmLWzTZbvKERRAYuM1LtNNp8bBX4jitA3soKuEwlihAO3tL0zlcySQyxc+080e64gUH37WpzPZIpPN6L+kU34aWIFGzIVskTGG63HOCEWxgdvSpeLgLSmhHwiKcVsAImSfaqQOpSFcQhEMXgixP/sh7yyZcJZk8HmENyB5H5MUyeCLZqEKKGZC3hn37c7M7apKvKoroLjQvdtlvnfVI2CURRl1K8tmq2BWGIrRF+cCf/UELa8ARhlwtsp8iwQJ0207me6UMJ1u3/Cf9i3kXhfbszMnHQGh9LnQ9ZHBVxJJz7X5BWR7eIxHa118tJCntVRc5iAoe8KspMWTEytHx6uT3Ymo6nHrBrzk04KhoCq7NAyr9dSybG2F1lPsYfYu9g3htxWjfGcaSgAAAABJRU5ErkJggg==');\n" +
"  display: block;\n" +
"  width: 36px;\n" +
"  height: 35px;\n" +
"}"));
