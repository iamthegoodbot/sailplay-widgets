window.sp_share = function(params){
	

  SAILPLAY.send('init', { 
    partner_id: params.partner_id || 232, 
    domain: params.domain || 'http://dev2.sailplay.ru' 
  })

  var referralLink = void 0
  var referralName = void 0

  SAILPLAY.on('init.success', function(){
    SAILPLAY.send('login', params.auth_hash || 'bf06dfe9737b48c11db9aada340f97159ed89703');
  });



  SAILPLAY.on('login.success', function(data){
    referralName = data.name
    SAILPLAY.send('user.referral', {}, function(data){
      referralLink = (params.base_referral_link ? params.base_referral_link : params.domain).replace(/\/$/, '') + data.referral_link
      console.log(referralLink)
    })
  })

  var testform = function(email, tagname, cb){
    SAILPLAY.send('tags.add', {user: {email: email}, tags:[tagname]}, function(){
      SAILPLAY.send('vars.add', {user: {email: email}, custom_vars:{
        referrer_link: referralLink,
        referrer_name: referralName
      }}, function(){
        cb && cb()
      })
    })
  }
  var createByEmail = function(email, cb){
    testform(email, 'Referred via the referral form', cb)
  }
  
  document.addEventListener('DOMContentLoaded', function(){

    document.getElementById(params.form_id).addEventListener('submit', function(ev){
      createByEmail(ev.target[0].value, function(){'callback'})
      ev.target[0].value = ''
      if(params.prevent_form_send){
        ev.preventDefault()
      }
    })

  })
}