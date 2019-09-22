

new Vue({
  el: '#loginForm',
  data: {
      email: "",
      password: ""
  },
  methods:{
    login(){
      let loadingCircle = document.getElementById('loadingCircle');
      loadingCircle.classList.remove('d-none');
      //auth.createUserWithEmailAndPassword(this.email, this.password);
      auth.signInWithEmailAndPassword(this.email,this.password).then( response =>{
        
        location.href = "/pages/home/home.html";
      }).catch( error => {
        console.log(error);
        document.getElementById('title').innerText = "Login Failed!";
        let errorMsg =  document.getElementById('errorMsg');
        errorMsg.classList.remove('d-none');
        errorMsg.innerText = "Error Message: "+ error.message;
      })
      loadingCircle.classList.add('d-none');
    }
  }
});
