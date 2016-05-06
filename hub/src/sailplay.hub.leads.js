(function () {

  if(typeof window.SAILPLAY === 'undefined'){
    console.log('Can\'t find main SAILPLAY module');
    return;
  }

  var sp = window.SAILPLAY;

  var Leads = function(){

    var leads = {};

    return function(name, form, params){

      if(!name) {
        return leads;
      }

      if(!form || !sp.is_dom(form) || form.tagName.toUpperCase() !== 'FORM') {
        console.error('Provide DOM form element as second parameter');
        return leads;
      }

      leads[name] = new Lead(name, form, params);

      return leads[name];

    };

  };

  var Lead = function(name, form, params){

    var self = this;

    self.name = name;

    self.form = form;

    self.tags = params && params.tags || (form.getAttribute('data-sp-tags') || '').split(',');

    self.submit = function(callback){

      var params = sp.serialize(self.form);

      sp.send('users.update', params, function(user_res){

        console.dir(user_res);

        if(user_res.status === 'ok' && self.tags.length > 0){

          sp.send('tags.add', { user: params, tags: self.tags }, function(res){
            console.dir(res);
            if(res.status === 'ok') {
              sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
            }
            else {
              sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
            }
          });

        }

        else if (user_res.status === 'ok' && self.tags.length == 0){
          sp.send('leads.submit.success', { lead: self, response: user_res });
          callback && callback(user_res);
        }

        else {
          sp.send('leads.submit.error', { lead: self, response: user_res });
        }

      });

    };

    self.form.addEventListener('submit', function(e){
      e.preventDefault();
      self.submit();
    });

  };

  sp.leads = new Leads();

  sp.on('init.success', function(data){

    var forms = document.querySelectorAll('[data-sp-lead]');

    for(var d = 0; d < forms.length; d+=1) {

      var form = forms[d];

      sp.leads(form.getAttribute('data-sp-lead'), form);

    }

  });

  sp.serialize = function(form) {
    if (!form || form.nodeName !== "FORM") {
      return;
    }
    var i, j, q = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
      if (form.elements[i].name === "") {
        continue;
      }
      switch (form.elements[i].nodeName) {
        case 'INPUT':
          switch (form.elements[i].type) {
            case 'text':
            case 'email':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
              q[form.elements[i].name] = form.elements[i].value;
              break;
            case 'checkbox':
            case 'radio':
              if (form.elements[i].checked) {
                q[form.elements[i].name] = form.elements[i].value;
              }
              break;
            case 'file':
              break;
          }
          break;
        case 'TEXTAREA':
          q[form.elements[i].name] = form.elements[i].value;
          break;
        case 'SELECT':
          switch (form.elements[i].type) {
            case 'select-one':
              q[form.elements[i].name] = form.elements[i].value;
              break;
            case 'select-multiple':
              for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                if (form.elements[i].options[j].selected) {
                  q[form.elements[i].name] = form.elements[i].options[j].value;
                }
              }
              break;
          }
          break;
        case 'BUTTON':
          switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
              q[form.elements[i].name] = form.elements[i].value;
              break;
          }
          break;
      }
    }
    return q;
  }

}());
