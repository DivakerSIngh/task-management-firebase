import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
  
})
export class AppServiceService {

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

delete(collection,record_id) {
  this.firestore.doc(collection+'/' + record_id).delete();
}
get(collection,id){
  var db=this.firestore.firestore;
 //return db.collection(collection).where("userid", "==", id).get();
 return db.collection(collection).where("userid", "==", id);
    
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

doSignUp(email,password){
  
   return this.authservice.auth.createUserWithEmailAndPassword(email,password); 
 
}
doSignIn(email,password){
  return this.authservice.auth.signInWithEmailAndPassword(email,password); 
}

//#endregion






  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 1200
    });
  }

}
