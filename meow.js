var provider = new firebase.auth.GoogleAuthProvider();

var user;
var displayName;
var email;
var photoURL;
var gender;


// Sign into goofle
function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
   	//token can be used to get more information about user
      var token = result.credential.accessToken;
      user = result.user;
      // console.log("TOKEN " + token);
      // console.log("USER " + user);
      displayName = (user.displayName);
      email = (user.email);
      photoURL = (user.photoURL);
      gender = (user.gender);
      // print name to html
      document.write("Hello " + displayName);
      
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
   });
}

//Sign out
function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}





