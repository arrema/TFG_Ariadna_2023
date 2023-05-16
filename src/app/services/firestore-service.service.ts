import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { Restaurants } from '../interfaces/restaurants';
import { User } from '../interfaces/user';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);


  constructor(private googlePlus: GooglePlus) { }

  async getAllRestaurants() {
    let restaurantsList: Restaurants | any = [];
    const querySnapshot = await getDocs(collection(this.db, "restaurants"));
    querySnapshot.forEach((doc) => {
    

    restaurantsList.push(doc.data());
  });
  return restaurantsList;
}

async getAllUsers() {
  let usersList: User | any = [];
  const querySnapshot = await getDocs(collection(this.db, "users"));
  querySnapshot.forEach((doc) => {

  usersList.push(doc.data());
});
return usersList;
}


async getAllEvents() {
  let eventsList: Restaurants | any = [];
  const querySnapshot = await getDocs(collection(this.db, "events"));
  querySnapshot.forEach((doc) => {
  
  eventsList.push(doc.data());
});
return eventsList;

}
  async getOneRestaurant() {
    const docRef = doc(this.db, "restaurants", '1RHTW5hcc8PjHlAX90V5');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      'webClientId': '422692884929-ug8m3k72srvquddgi0om4at1gqoki2os.apps.googleusercontent.com',
      'offline': true
    });
  
   console.log(res);
  }

  logOut() {
    this.googlePlus.logout();
  }

  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }
  // AuthLogin(provider: GoogleAuthProvider) {
  //   return this.afAuth
  //       .signInWithPopup(provider)
  //       .then((result) => {

  //         console.log(result.additionalUserInfo);
  //         localStorage.setItem('user', JSON.stringify(result.additionalUserInfo))
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }
  // emailLogin(email: string, password: string){
  //     return this.afAuth.signInWithEmailAndPassword(email, password);
  // }
}
