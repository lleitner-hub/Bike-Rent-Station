new Vue({
  created(){
    let loadingCircle = document.getElementById('loadingCircle');
    loadingCircle.hidden = true;
  }
});

jQuery(document).ready(function(){
  jQuery("#btn-alert-success").click(function(){
    jQuery("#alert-success").fadeToggle("slow");
  });
  jQuery("#btn-alert-error").click(function(){
    jQuery("#alert-error").fadeToggle("slow");
  });

});

const form = document.querySelector('#userForm');
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  let loadingCircle = document.getElementById('loadingCircle');
  loadingCircle.hidden = false;

  //get user info
  const email = form.email.value;
  const password = form.password.value;
  if(validateEmail(email) && password.length > 5){
     //sign up user
    auth.createUserWithEmailAndPassword(email,password).then(resp =>{
      jQuery("#alert-success").fadeToggle("slow");
      loadingCircle.hidden = true;
    });
  }else{
    jQuery("#alert-error").fadeToggle("slow");
    loadingCircle.hidden = true;
  }
});

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
