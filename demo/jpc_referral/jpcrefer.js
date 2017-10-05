window.sp_share = function(params){
	

  SAILPLAY.send('init', { 
    partner_id: params.partner_id, 
    domain: params.domain
  })

  var referralLink = void 0
  var referralName = void 0

  SAILPLAY.on('init.success', function(){
    SAILPLAY.send('login', params.auth_hash);
  });



  SAILPLAY.on('login.success', function(data){
    referralName = data.name
    SAILPLAY.send('user.referral', {}, function(data){
      referralLink = (params.base_referral_link ? params.base_referral_link : params.domain).replace(/\/$/, '') + data.referrer
      console.log(referralLink)
    })
  })

  var testform = function(email, tagname, cb){
    SAILPLAY.send('vars.add', {user: {email: email}, custom_vars:{
        referrer_link: referralLink,
        referrer_name: referralName
      }}, function(){
        SAILPLAY.send('tags.add', {user: {email: email}, tags:[tagname]}, function(){
          cb && cb()
          if(!params.prevent_form_send){
            document.getElementById(params.form_id)
              .submit()
          }
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
      ev.preventDefault()
    })

  })
}