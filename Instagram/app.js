class Post {
    constructor(id, title, text) {
        this.id = id;
        this.title = title;
        this.text = text;
    }
}

class App{
    constructor() { 

        this.posts = [];
        console.log(this.posts);
        this.selectedPostId = "";
        this.userId = "";


        this.$app = document.querySelector("#app");
        this.$firebaseAuthContainer = document.querySelector("#firebaseui-auth-container");
        this.$authUserText = document.querySelector(".auth-user");
        this.$logoutButton = document.querySelector(".logout-button");      
        
        
        this.ui= new firebaseui.auth.AuthUI(auth);
        this.handleAuth();
        this.addEventListeners();
        
        
        
       
}
handleAuth () {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid); 
          this.uId = user.uid; 
          this.redirectToApp();
        } else {
          this.redirectToAuth();
        }
    });
}
handleLogout() {
    firebase.auth().signOut().then(() => {
        this.redirectToAuth();
      }).catch((error) => {
        console.log("ERROR OCCURED", error);
      });
}

redirectToApp() {
    this.$firebaseAuthContainer.style.display = "none";
    this.$app.style.display = "block";

}
redirectToAuth() {
    this.$firebaseAuthContainer.style.display = "block";
    this.$app.style.display = "none";

    this.ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                console.log("authResult", authResult.user.uid)
                this.userId = authResult.user.uid;
                this.$authUserText.innerHTML = user.displayName;
                this.redirectToApp();
            }
        },
        
        signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
        });
}

addEventListeners() {
   
    this.$logoutButton.addEventListener("click", (event) => {
        this.handleLogout();
    })
}

}






















const app = new App();