var provider = new firebase.auth.GoogleAuthProvider();
var user;

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      user = result.user;
		
      console.log("TOKEN " + token)
      console.log("USER " + user)
      console.log(user.displayName)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
   });
}


function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}




