import { Injectable, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject, AngularFireDatabaseModule } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
  
})

export class AppServiceService {
  usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
  constructor(
    private firestore: AngularFirestore,
    private snackbar:MatSnackBar,
    private authservice: AngularFireAuth
  
  ) { }


//#region public crud operation methods


add(collection,record) {
  try {
    this.openSnackBar('Record Added Successfully !');
    return this.firestore.collection(collection).add(record);
    
  } catch (error) {
    this.openSnackBar(error);
  }
  
}

getall(collection) {
  return this.firestore.collection(collection).snapshotChanges();
 //return db.collection(collection).onSnapshot;
}

update(collection,recordID,record){
  return this.firestore.doc(collection+'/' + recordID).update(record);
}


disabledRecord(collection,recordID,json){
  return this.firestore.doc(collection+'/' + recordID).update(json);
}

delete(collection,record_id) {
  this.firestore.doc(collection+'/' + record_id).delete();
}
get(collection,id){
  var db=this.firestore.firestore;
 //return db.collection(collection).where("userid", "==", id).get();
 return db.collection(collection).where("userid", "==", id).where("isdeleted", "==", 0);
    
    // .then(function(querySnapshot) {
    //   debugger
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
}

//#endregion 

//#region login and sign up method

updatevalueInAllCollection(collection,json){
debugger
  this.firestore.collection(collection).doc().update({isdeleted:0})
 

}

doSignUp(email,password){
  
   return this.authservice.auth.createUserWithEmailAndPassword(email,password); 
 
}
doSignIn(email,password){
  return this.authservice.auth.signInWithEmailAndPassword(email,password); 
}

//#endregion


googleLogin(provider){
  return this.authservice.auth.signInWithPopup(provider)
  .then((credential) => {
    //this.updateUserData(credential.user)
  })
}




  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 1200
    });
  }





// Read User
// GetByIdNew(id: string) {
//   this.userRef = this.db.object('users-list/' + id);
//   return this.userRef;
// }

// Read Users List
async GetAllNew(collection) {
  const snapshot = await this.firestore.collection('events').get()
    return snapshot;
}  

// Update User
// UpdateUser(user: User) {
//   this.userRef.update({
//     name: user.name,
//     email: user.email,
//     contact: user.contact
//   })
// }  

// Delete User
// DeleteUser(id: string) { 
//   this.userRef = this.db.object('users-list/'+id);
//   this.userRef.remove();
// }











}
