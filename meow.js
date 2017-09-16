var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log("TOKEN " + token)
      console.log("USER " + user)
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


function httpGet()
{
	var url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + token;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}